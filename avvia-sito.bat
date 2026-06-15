@echo off
chcp 65001 >nul
title Paolo Ronco - Sito (dev server)
cd /d "%~dp0"

echo ============================================
echo   paoloronco.it  -  avvio sito (sviluppo)
echo ============================================
echo.

REM Controlla che Node.js sia installato
where node >nul 2>nul
if errorlevel 1 (
  echo [ERRORE] Node.js non e' installato.
  echo Scaricalo da https://nodejs.org e riprova.
  echo.
  pause
  exit /b 1
)

REM Installa le dipendenze solo se mancano
if not exist "node_modules" (
  echo Prima esecuzione: installo le dipendenze ^(un minuto^)...
  call npm install
  echo.
)

REM Apre il browser SOLO quando il server risponde davvero (evita pagina vuota)
start "" /min powershell -NoProfile -WindowStyle Hidden -Command "$u='http://localhost:4321/'; for($i=0;$i -lt 90;$i++){ try{ $null = Invoke-WebRequest -UseBasicParsing -Uri $u -TimeoutSec 2; Start-Process $u; break }catch{ Start-Sleep -Milliseconds 800 } }"

echo Server in avvio su http://localhost:4321/
echo Il browser si aprira' NON appena il server e' pronto (puo' volerci qualche secondo).
echo.
echo  ^>^>  Per FERMARE il sito: chiudi questa finestra oppure premi CTRL+C.
echo.

REM Avvia il dev server (con hot-reload)
call npm run dev

REM Se il server si chiude, tieni aperta la finestra per leggere eventuali errori
echo.
echo Server arrestato.
pause
