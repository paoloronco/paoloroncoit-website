---
title: "Ho eseguito Kimi K3 da 2,78 trilioni di parametri su una VM CPU con 16 GB di RAM"
description: "Dal checkpoint da 1,56 TB al primo token: esperimento, benchmark e tutorial per eseguire Kimi K3 CPU-only su Google Cloud con kimi-k3-in-c."
pubDate: 2026-09-01
tags:
  - AI
  - LLM
  - Google Cloud
  - Cloud
  - Infrastructure as Code
  - Homelab
draft: false
---

Quando ho letto che era possibile eseguire un modello da **2,78 trilioni di parametri** su una singola CPU e con pochi gigabyte di RAM, la mia prima reazione è stata un misto tra curiosità e scetticismo.

Non perché pensassi che il progetto fosse falso. La domanda che mi interessava era un'altra: **che cosa significa davvero “eseguire” un modello di queste dimensioni?** Significa poterci parlare come con Ollama? Significa che 1,56 TB di pesi entrano magicamente in 8 o 16 GB di memoria? E soprattutto: quale risorsa paga il prezzo di questa apparente impossibilità?

Il modo più rapido per capirlo non era continuare a leggere benchmark. Era provare.

Ho quindi creato una VM su Google Cloud, scaricato il checkpoint completo di Kimi K3, compilato il motore C99 [`kimi-k3-in-c`](https://github.com/FareedKhan-dev/kimi-k3-in-c) e aspettato il primo token. Molto più di quanto immaginassi.

Il risultato è stato tecnicamente riuscito e, proprio per questo, istruttivo: **Kimi K3 ha prodotto il token corretto su una VM con 4 vCPU e 16 GB di RAM, ma il primo token ha richiesto circa 15 minuti e il secondo oltre 9 minuti.**

Questo progetto mi ha fatto capire in modo molto più concreto la differenza tra fattibilità, performance e usabilità.

## Il progetto che ha acceso la curiosità

`kimi-k3-in-c` è un motore di inference portabile scritto in C99. Non richiede PyTorch, BLAS o GPU e permette di eseguire il checkpoint rilasciato di Kimi K3 con memory budget molto ridotti.

Kimi K3 è un modello Mixture-of-Experts. In modo semplificato, non attiva tutti gli expert per ogni token. Il motore sfrutta questa proprietà, mantiene in memoria soltanto ciò che rientra nel budget e legge da storage il resto dei dati necessari.

È qui che si nasconde la parte più interessante della frase “gira in pochi GB di RAM”: **i pesi non diventano piccoli e non spariscono. Vengono trasferiti nel tempo anziché essere tutti residenti nello spazio della RAM.**

La memoria richiesta si riduce, ma il lavoro si sposta su storage e CPU.

## Prima di arrivare alla VM definitiva

Il primo tentativo è partito su Vast.ai, con AMD EPYC, circa 251 GB di RAM e NVMe locale misurato intorno a 8,5 GB/s. La macchina sembrava ideale, ma il container disponeva di circa 1,5 TB utilizzabili: meno del necessario per contenere checkpoint e trunk. La capacità fisica dell'host non serviva se non era assegnata al workload.

Su Google Cloud ho incontrato il problema opposto. La quota SSD del nuovo progetto non bastava per un disco da 2 TB, mentre `pd-standard` era disponibile. Ho ottenuto lo spazio necessario, accettando però uno storage molto più lento.

Anche la prima VM Spot si è rivelata una falsa economia: è stata preemptata durante il packing, un passaggio non riprendibile. Il checkpoint è rimasto sul Persistent Disk, ma ho dovuto ricominciare il trunk e spostare l'ambiente da `us-central1-c` a `us-central1-a` tramite snapshot per trovare capacità Standard.

Questi tentativi hanno chiarito presto che il test non riguardava soltanto il modello: allocazione reale dello storage, quote, persistenza e failure mode facevano parte dell'esperimento.

## L'ambiente utilizzato

Per il test conclusivo ho volutamente utilizzato una configurazione contenuta:

| Componente | Configurazione |
|---|---|
| Cloud | Google Cloud Compute Engine |
| VM | `e2-standard-4` |
| Risorse | 4 vCPU, 16 GB RAM |
| Sistema operativo del test | Debian 12 |
| Boot disk del test | 250 GB `pd-balanced` |
| Disco dati | 2 TB `pd-standard` |
| Checkpoint | circa 1,56 TB, 96 shard |
| Motore | `kimi-k3-in-c` |
| Trunk memory budget | 5 GB |
| Expert cache | 1 GB |

Il boot disk e il disco dati erano separati. Questa scelta mi ha permesso di spegnere o cambiare la VM senza dover riscaricare immediatamente oltre un terabyte e mezzo di dati.

Il Terraform pubblicato insieme al progetto non è una fotografia byte per byte della VM originale: usa Ubuntu 24.04 e un boot disk da 50 GB, sufficiente perché modello e trunk risiedono sul disco dati. I risultati riportati qui provengono invece dall'ambiente Debian descritto nella tabella.

## Come ho preparato Kimi K3

### 1. Creazione dell'infrastruttura

Ho creato una VM Debian e collegato un data disk da 2 TB montato su:

```text
/mnt/k3data
```

Nel pacchetto allegato al progetto ho trasformato questa configurazione in Terraform. Dopo aver impostato il progetto GCP, il flusso essenziale è:

```bash
gcloud auth application-default login
gcloud config set project IL_TUO_PROJECT_ID

cp terraform/terraform.tfvars.example terraform/terraform.tfvars
terraform -chdir=terraform init
terraform -chdir=terraform validate
terraform -chdir=terraform plan
terraform -chdir=terraform apply
```

Il bootstrap continua dopo la creazione della VM. Prima del download ho atteso il messaggio `Bootstrap complete` nel log dello startup script.

Per ragioni di sicurezza, il template non apre automaticamente SSH a Internet. Preferisco l'accesso tramite IAP o una policy già controllata, evitando una regola `0.0.0.0/0` sulla porta 22.

### 2. Compilazione del motore

Nel laboratorio originale, o per una replica manuale senza il bootstrap Terraform:

```bash
git clone https://github.com/FareedKhan-dev/kimi-k3-in-c.git
cd kimi-k3-in-c
git checkout ff11dce858a2eb8a781224facdffd33a1fa48d25 # v1.0.0
make -j"$(nproc)"
make test

python3 -m venv ~/.venvs/hf
~/.venvs/hf/bin/pip install huggingface_hub==1.29.0
export PATH="$HOME/.venvs/hf/bin:$PATH"
```

Il motore è leggero; il problema non è compilare il codice. Il problema sono i dati.

### 3. Download del checkpoint

Il checkpoint è pubblico. La CLI Hugging Face funziona senza credenziali; un token resta opzionale per eventuali limiti di traffico. Sulla VM da 16 GB ho disabilitato Xet high-performance e limitato il download a quattro worker:

```bash
export HF_XET_HIGH_PERFORMANCE=0
export HF_XET_FIXED_DOWNLOAD_CONCURRENCY=4

hf download moonshotai/Kimi-K3 \
  --revision a590ce090cb049c93a33dfe8c208ec652aa20503 \
  --local-dir /mnt/k3data/k3model \
  --max-workers 4

hf cache verify moonshotai/Kimi-K3 \
  --revision a590ce090cb049c93a33dfe8c208ec652aa20503 \
  --local-dir /mnt/k3data/k3model \
  --fail-on-missing-files
```

Il download completo è di circa **1,56 TB distribuiti su 96 shard**. La verifica finale confronta i file con i metadati dello snapshot Hugging Face e rilegge l'intero checkpoint: un download incompleto può non fallire in modo evidente e portare a token sbagliati.

Durante i primi tentativi ho anche incontrato un problema di memoria con una concorrenza troppo elevata nel download. Ridurre il numero di worker ha reso il processo stabile su 16 GB di RAM. È un dettaglio apparentemente secondario, ma in un progetto di queste dimensioni anche il downloader diventa parte dell'architettura.

### 4. Packing del trunk

Il passaggio successivo prepara il trunk in una forma adatta allo streaming:

```bash
./scripts/pack-trunk.sh \
  /mnt/k3data/k3model \
  /mnt/k3data/k3trunk
```

Nel mio caso il trunk impacchettato risultava di circa **108,81 GB**. Questo passaggio rende regolabile il memory budget: alcune parti possono essere mantenute in memoria, mentre le altre vengono lette dal disco.

## Il comando di inference

Ho usato il prompt di verifica previsto dal progetto:

```bash
./bin/k3 /mnt/k3data/k3model \
  --trunk /mnt/k3data/k3trunk \
  --trunk-gb 5 \
  --cache-gb 1 \
  --tok /mnt/k3data/k3model \
  --prompt "The capital of France is" \
  --gen 8 \
  --incremental
```

È importante capire che questa versione non è ancora una vera interfaccia chat. L'output è una **continuazione testuale**. Il prompt non chiede al modello di rispondere: gli fornisce l'inizio di una frase da completare.

## Poi la schermata è rimasta ferma

Il motore aveva caricato correttamente configurazione, tokenizer e tensori. Aveva stampato:

```text
STEP   TOKEN      SECONDS      CACHE HIT  READ GB    TOK/S
--------------------------------------------------------------------
```

Poi, apparentemente, nulla.

È stato il momento più interessante dell'esperimento. Il processo era bloccato o stava davvero calcolando il primo token?

Da una seconda sessione SSH ho controllato:

```bash
ps -C k3 -o pid,%cpu,%mem,rss,etime,stat,cmd
```

Il processo usava CPU, la memoria residente cresceva e lo stato era `Dl+`. In Linux, `D` indica un'attesa non interrompibile, tipicamente legata all'I/O. Non era la prova di un deadlock: era il segnale di un processo che trascorreva molto tempo aspettando il disco.

Per verificarlo in modo più diretto si possono usare:

```bash
iostat -xz 2
pidstat -d -p "$(pgrep -n k3)" 2
```

Il processo stava lavorando. Semplicemente, il concetto di “lavorare” aveva una scala temporale molto diversa da quella di una chat.

## Finalmente: il primo token

Dopo circa 15 minuti è comparsa la prima riga:

```text
0      17374      902.53       90.1       99.70      0.001
```

Il token `17374` corrisponde a:

```text
 Paris
```

Era corretto.

Un modello da 2,78 trilioni di parametri stava realmente completando la frase su una VM CPU con 16 GB di RAM. Non una versione ridotta, non un mock: il checkpoint completo, indicizzato in **497.220 tensori** nei suoi 96 shard.

Il secondo token ha fornito il dato più utile:

```text
1      20829      547.60       100.0      25.83      0.002
```

Oltre nove minuti per generare il punto dopo `Paris`.

## Cosa raccontano davvero quei numeri

### Il primo token costa più dei successivi

Lo step 0 deve elaborare il prompt e pagare il cold start. Nel mio run ha letto 99,70 GB di expert data. Il secondo step è sceso a 25,83 GB e da 902,53 a 547,60 secondi.

La riduzione è importante, ma non sufficiente a rendere l'ambiente interattivo.

### Il 100% di cache hit può ingannare

Leggendo soltanto `CACHE HIT 100.0`, si potrebbe concludere che il secondo token non abbia quasi più bisogno del disco. Ma la stessa riga riporta `READ GB 25.83`.

Il contatore può considerare “hit” una richiesta soddisfatta dall'arena dopo che il dato è stato appena precaricato dal disco. La metrica da osservare è quindi la quantità di I/O realmente evitata tra uno step e l'altro, non la percentuale isolata.

### La RAM non era il collo di bottiglia principale

Il piano di memoria era:

```text
trunk streamed       5.00 GB
embedding + lm_head  4.70 GB
expert cache         1.00 GB
recurrent state      626.25 MB
KV cache             33.12 MB
totale previsto      11.37 GB
```

Il motore rispettava l'ordine di grandezza previsto. Il vero limite era il costo di muovere continuamente enormi quantità di dati dal disco e processarle sulla CPU.

Questa è stata la lezione principale: **ridurre la memoria residente non elimina il costo del modello, lo trasforma.**

## Perché non ho costruito subito una Web UI

All'inizio l'idea naturale era aggiungere una piccola interfaccia web e trasformare la CLI in qualcosa di simile a Ollama o Open WebUI.

Dopo il benchmark, sarebbe stato il livello sbagliato su cui lavorare. Una UI non può correggere nove minuti per token. Prima servono storage locale molto più veloce, molti più core e una quantità di RAM che permetta di mantenere in memoria una porzione maggiore del trunk.

Inoltre, il progetto upstream non applica ancora il chat template di Kimi. Anche con una API e una UI, il comportamento attuale rimarrebbe quello di un completamento, non di un assistente conversazionale completo.

## Come replicare l'esperimento in modo più sicuro

Ho raccolto Terraform, script e documentazione in un pacchetto riproducibile. Le scelte più importanti sono:

1. **Disco dati separato:** evita di legare 1,56 TB di download al ciclo di vita della VM.
2. **SSH via IAP:** nessuna apertura pubblica automatica della porta 22.
3. **Credenziali opzionali solo in memoria:** se uso `HF_TOKEN`, non viene scritto nei metadata o nello state Terraform.
4. **Benchmark da due token:** sufficiente per validare la pipeline e misurare il decode senza sprecare un'ora.
5. **Label GCP:** utili per separare i costi del progetto nei report di billing.
6. **Destroy esplicito:** lo spegnimento della VM non interrompe la fatturazione dei dischi.

Per il test:

```bash
sudo GEN_TOKENS=2 TRUNK_GB=5 CACHE_GB=1 \
  /opt/k3-project/scripts/run-benchmark.sh
```

I token attesi all'inizio sono:

```text
17374, 20829
```

Se differiscono, non bisogna attribuire subito il problema alla “casualità” del modello: il decoding è greedy e l'output di verifica deve essere deterministico. Vanno controllati download, byte total, packing e build.

Il pacchetto blocca inoltre il motore alla release `v1.0.0`, la CLI `huggingface_hub` alla versione `1.29.0` e il checkpoint allo snapshot usato nel test. In questo modo una modifica futura dell'upstream non cambia silenziosamente l'esperimento.

## Costi: attenzione alla falsa sensazione dello “spento”

Google Cloud Billing non è in tempo reale. Durante l'esperimento il report mostrava inizialmente quasi zero, mentre VM e dischi erano già stati utilizzati.

Inoltre:

- fermare la VM arresta il costo compute;
- boot disk e data disk continuano a essere fatturati;
- snapshot e classi di storage possono avere costi minimi o di recupero;
- un budget alert non è un hard cap e condivide parte della latenza dei dati di billing.

Il template protegge il data disk con `prevent_destroy = true` in `terraform/main.tf`. Terraform rifiuta quindi il piano di distruzione finché la protezione rimane attiva. Per un teardown completo bisogna cambiare consapevolmente quel valore in `false`, quindi eseguire:

```bash
terraform -chdir=terraform plan -destroy
terraform -chdir=terraform destroy
```

Prima di confermare, bisogna controllare che non ci siano dati da conservare.

## Cosa mi ha fatto capire questo progetto

La cosa più importante non è stata vedere la parola “Paris”. È stato seguire il percorso che ha reso possibile quel token.

Questo esperimento mi ha fatto capire che le specifiche di un sistema AI possono essere vere e allo stesso tempo facilmente fraintese. “Funziona con 8 GB di RAM” descrive una proprietà notevole del motore, ma non descrive da sola l'esperienza d'uso, il throughput dello storage, la latenza del primo token o il costo complessivo.

Mi ha anche ricordato perché preferisco i progetti pratici: una tabella può dirti che l'I/O conta, ma aspettare quindici minuti davanti a una riga vuota, verificare che il processo non sia morto e vedere finalmente comparire il token corretto rende il concetto impossibile da dimenticare.

Infine, ho capito meglio una regola che vale ben oltre Kimi K3: **quando un vincolo apparentemente impossibile viene superato, il costo non scompare; cambia forma e si sposta in un'altra parte dell'architettura.** In questo caso, dalla capacità della RAM al movimento continuo dei dati.

## Conclusioni

L'esperimento è riuscito:

- checkpoint completo caricato;
- 96 shard indicizzati;
- tokenizer, trunk e stato ricorrente inizializzati;
- primo e secondo token corretti;
- inference CPU-only dimostrata su 16 GB di RAM.

Ma il risultato operativo è altrettanto chiaro:

- circa 15 minuti per il primo token;
- circa 9 minuti per il secondo;
- nessuna reale interattività;
- storage e compute come colli di bottiglia;
- Web UI prematura.

Il prossimo passo sensato, se riprenderò il progetto, sarà un test controllato su NVMe ad alto throughput e più RAM, misurando almeno tre run e separando con precisione cold start, prefill e decode sostenuto.

Non so ancora se Kimi K3 diventerà qualcosa con cui parlerò nel mio homelab. So però che questo esperimento ha già raggiunto il suo obiettivo: trasformare una dichiarazione sorprendente in una comprensione concreta dell'architettura che la rende possibile.

## Riferimenti

- [kimi-k3-in-c — repository ufficiale](https://github.com/FareedKhan-dev/kimi-k3-in-c)
- [Quickstart ufficiale](https://github.com/FareedKhan-dev/kimi-k3-in-c/blob/main/docs/QUICKSTART.md)
- [Performance e memory ladder](https://github.com/FareedKhan-dev/kimi-k3-in-c/blob/main/docs/PERFORMANCE.md)
- [Roadmap del progetto](https://github.com/FareedKhan-dev/kimi-k3-in-c/blob/main/docs/ROADMAP.md)
- [Google Cloud Compute Engine pricing](https://cloud.google.com/compute/all-pricing)
- [Google Cloud disk performance](https://cloud.google.com/compute/docs/disks/performance)

> Nota: prezzi, quote, performance e funzionalità cambiano nel tempo. Verificare sempre documentazione e licenze aggiornate prima di replicare il progetto.
