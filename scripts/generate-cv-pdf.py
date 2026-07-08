from __future__ import annotations

from pathlib import Path
from shutil import copyfile
from urllib.parse import quote
import textwrap

from PIL import Image, ImageDraw, ImageEnhance
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
TMP = ROOT / "tmp" / "pdfs"
PHOTO = PUBLIC / "paolo.png"
LOGOS = PUBLIC / "logos"
SITE = "https://paoloronco.it"
LINKEDIN = "http://linkedin.com/in/paolo-ronco"

W, H = A4
M = 26
GAP = 14
COL_W = (W - (M * 2) - GAP) / 2

INK_900 = colors.HexColor("#0a0c12")
INK_800 = colors.HexColor("#11151f")
INK_700 = colors.HexColor("#171c28")
INK_600 = colors.HexColor("#222a3a")
INK_500 = colors.HexColor("#323c52")
TEXT = colors.HexColor("#182335")
MUTED = colors.HexColor("#667085")
PAPER = colors.HexColor("#f7f6f3")
PAPER_DIM = colors.HexColor("#ecebe6")
WHITE = colors.white
ACCENT = colors.HexColor("#4f8dff")
ACCENT_2 = colors.HexColor("#a78bfa")
SECURITY = colors.HexColor("#fb7185")
AI = colors.HexColor("#a78bfa")
AUTOMATION = colors.HexColor("#fbbf24")
CLOUD = colors.HexColor("#38bdf8")
TOOL = colors.HexColor("#34d399")


def tr(lang: str, it: str, en: str) -> str:
    return en if lang == "en" else it


def wrap(value: str, chars: int) -> list[str]:
    return textwrap.wrap(value, width=chars, break_long_words=False, replace_whitespace=False)


def text(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=TEXT, font="Helvetica") -> None:
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def right_text(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=TEXT, font="Helvetica") -> None:
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawRightString(x, y, value)


def wrapped(c: canvas.Canvas, value: str, x: float, y: float, width: float, size: float, leading: float, color=TEXT, font="Helvetica") -> float:
    chars = max(18, int(width / (size * 0.43)))
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap(value, chars):
        c.drawString(x, y, line)
        y -= leading
    return y


def pill(c: canvas.Canvas, value: str, x: float, y: float, w: float, fill, stroke, fg=TEXT, size: float = 7.5) -> None:
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(0.5)
    c.roundRect(x, y, w, 15, 4, stroke=1, fill=1)
    text(c, value, x + 6, y + 4.2, size, fg, "Helvetica-Bold")


def section_title(c: canvas.Canvas, title: str, x: float, y: float, w: float, accent=ACCENT) -> float:
    c.setFillColor(accent)
    c.roundRect(x, y - 1, 18, 4, 2, stroke=0, fill=1)
    text(c, title.upper(), x + 24, y - 2, 8.2, INK_500, "Helvetica-Bold")
    c.setStrokeColor(colors.HexColor("#d9dee8"))
    c.setLineWidth(0.45)
    c.line(x, y - 8, x + w, y - 8)
    return y - 22


def rounded_card(c: canvas.Canvas, x: float, y: float, w: float, h: float, fill=PAPER, stroke=colors.HexColor("#dde3ee")) -> None:
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(0.5)
    c.roundRect(x, y - h, w, h, 6, stroke=1, fill=1)


def make_photo() -> Path:
    TMP.mkdir(parents=True, exist_ok=True)
    target = TMP / "paolo-cv-photo.png"
    src = Image.open(PHOTO).convert("RGBA")
    side = min(src.size)
    left = (src.width - side) // 2
    top = (src.height - side) // 2
    src = src.crop((left, top, left + side, top + side)).resize((520, 520), Image.LANCZOS)

    mask = Image.new("L", src.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, src.width, src.height), fill=255)

    bg = Image.new("RGBA", src.size, (17, 21, 31, 255))
    bg.alpha_composite(src)
    bg.putalpha(mask)
    target.parent.mkdir(parents=True, exist_ok=True)
    bg.save(target)
    return target


def muted_logo(path: Path) -> Path:
    TMP.mkdir(parents=True, exist_ok=True)
    target = TMP / f"muted-{path.stem}.png"
    if target.exists() and target.stat().st_mtime >= path.stat().st_mtime:
        return target

    img = Image.open(path).convert("RGBA")
    rgb = img.convert("RGB")
    rgb = ImageEnhance.Color(rgb).enhance(0.55)
    rgb = ImageEnhance.Brightness(rgb).enhance(0.72)
    rgb = ImageEnhance.Contrast(rgb).enhance(0.9)
    out = rgb.convert("RGBA")
    alpha = img.getchannel("A").point(lambda p: int(p * 0.58))
    out.putalpha(alpha)
    out.save(target)
    return target


def logo_path(provider: str) -> Path | None:
    key = {
        "CompTIA": "comptia",
        "Google Cloud": "googlecloud",
        "Google": "google",
        "AWS": "aws",
        "Splunk": "splunk",
        "Cisco": "cisco",
        "IBM": "ibm",
        "Intel": "intel",
        "EC-Council": "ec-council",
        "Unioncamere + Google": "unioncamere-google",
    }.get(provider)
    if not key:
        return None
    path = LOGOS / f"{key}.png"
    return path if path.exists() else None


def draw_logo(c: canvas.Canvas, provider: str, x: float, y: float, max_w: float, max_h: float) -> None:
    path = logo_path(provider)
    if not path:
        text(c, provider[:5].upper(), x, y + 4, 6.0, INK_500, "Helvetica-Bold")
        return
    logo = muted_logo(path)
    with Image.open(logo) as img:
        iw, ih = img.size
    scale = min(max_w / iw, max_h / ih)
    w = iw * scale
    h = ih * scale
    c.drawImage(ImageReader(str(logo)), x + (max_w - w) / 2, y + (max_h - h) / 2, width=w, height=h, mask="auto")


def cert_pdf_url(file_name: str) -> str:
    return f"{SITE}/certificati/{quote(file_name)}"


def certs(lang: str) -> list[dict[str, str]]:
    return [
        {"provider": "CompTIA", "name": "Security+", "file": "1 CompTIA Security+ ce certificate.pdf"},
        {"provider": "CompTIA", "name": "AI Essentials", "file": "1a CompTIA-AI-Essentials.pdf"},
        {"provider": "EC-Council", "name": "Ethical Hacking Essentials", "file": "2 EcCouncil Ethical Hacking Essentials - EHE.pdf"},
        {"provider": "Google Cloud", "name": "Generative AI Leader", "file": "GenerativeAILeader20251024-30-a9cl88.pdf"},
        {"provider": "Google Cloud", "name": "Digital Leader", "file": "CloudDigitalLeader20260427-32-hy8vki.pdf"},
        {"provider": "Google Cloud", "name": "Associate Cloud Engineer", "file": "AssociateCloudEngineer20260708-7-owa87.pdf"},
        {"provider": "Splunk", "name": "Core Certified User", "file": "10 SplunkCoreCertifiedUser.pdf"},
        {"provider": "Cisco", "name": "NetAcad - Get Connected", "file": "3 Cisco NetCAD - Get Connected 2022.pdf"},
        {"provider": "Cisco", "name": "NetAcad - Introduction to CyberSecurity", "file": "4 Cisco NetCAD - Introduction to CyberSecurity 2022.pdf"},
        {"provider": "Cisco", "name": "NetAcad - NDG Linux Unchained", "file": "5 Cisco NetCAD - NDG Linux Unchained.pdf"},
        {"provider": "Google", "name": "Cybersecurity Professional Certificate", "file": "10 Coursea - Google Cyber Security Professional Certificate.pdf"},
        {"provider": "Intel", "name": "Network Academy - Network Transformation 101", "file": "9 Coursea - Intel® Network Academy - Network Transformation 101.pdf"},
        {"provider": "Google", "name": "IT Support - Technical Support Fundamentals", "file": "7 Coursea - Google IT Support - Technical Support Fundamentals.pdf"},
        {"provider": "IBM", "name": "Introduction to Hardware and Operating Systems", "file": "8 Coursea - IBM - Introduction to Hardware and Operating Systems.pdf"},
        {"provider": "Google", "name": tr(lang, "Fondamenti di Marketing Digitale", "Digital Marketing Fundamentals"), "file": "6 Google Fondamenti di Marketing Digitale.pdf"},
        {"provider": "AWS", "name": "Knowledge: Cloud Essentials", "file": "15 AWS CAWS Knowledge Cloud Essentials.pdf"},
        {"provider": "Unioncamere + Google", "name": tr(lang, "Corso Crescere in Digitale", "Crescere in Digitale Course"), "file": "16 - certificato Corso Crescere in digitale.pdf"},
    ]


def draw_header(c: canvas.Canvas, lang: str, photo: Path) -> None:
    c.setFillColor(INK_900)
    c.rect(0, H - 158, W, 158, stroke=0, fill=1)
    c.setFillColor(INK_800)
    c.roundRect(M, H - 134, W - (M * 2), 104, 10, stroke=0, fill=1)
    c.setFillColor(ACCENT)
    c.roundRect(M, H - 34, 116, 5, 2.5, stroke=0, fill=1)
    c.setFillColor(ACCENT_2)
    c.roundRect(M + 122, H - 34, 48, 5, 2.5, stroke=0, fill=1)

    c.drawImage(ImageReader(str(photo)), W - M - 96, H - 127, width=78, height=78, mask="auto")

    text(c, "Paolo Ronco", M + 20, H - 65, 28, WHITE, "Helvetica-Bold")
    text(c, tr(lang, "Cyber Security Analyst - Deloitte", "Cyber Security Analyst - Deloitte"), M + 22, H - 84, 10.5, colors.HexColor("#c4cdda"), "Helvetica-Bold")

    summary = tr(
        lang,
        "Cyber Security Analyst in Deloitte, nell'Enterprise Cloud & AI Security Team. Mi occupo di sicurezza cloud, infrastrutture e AI. Nel mio homelab progetto, sperimento e documento soluzioni di automazione, LLM e infrastrutture self-hosted.",
        "Cyber Security Analyst at Deloitte, in the Enterprise Cloud & AI Security Team. I work on cloud security, infrastructure and AI applied to defense. In my homelab I design, experiment with and document automation, LLM and self-hosted infrastructure solutions.",
    )
    wrapped(c, summary, M + 22, H - 104, W - (M * 2) - 134, 9.2, 11.2, colors.HexColor("#e4e9f4"), "Helvetica")

    pill(c, "paoloronco.it", M + 20, H - 147, 76, INK_700, INK_500, colors.HexColor("#dce7ff"), 7.1)
    pill(c, "info@paoloronco.it", M + 102, H - 147, 96, INK_700, INK_500, colors.HexColor("#dce7ff"), 7.1)
    pill(c, "linkedin.com/in/paolo-ronco", M + 204, H - 147, 134, INK_700, INK_500, colors.HexColor("#dce7ff"), 7.1)
    pill(c, tr(lang, "Torino, Italia", "Turin, Italy"), M + 344, H - 147, 72, INK_700, INK_500, colors.HexColor("#dce7ff"), 7.1)

    c.linkURL(SITE, (M + 20, H - 147, M + 96, H - 132), relative=0, thickness=0)
    c.linkURL(f"mailto:info@paoloronco.it", (M + 102, H - 147, M + 198, H - 132), relative=0, thickness=0)
    c.linkURL(LINKEDIN, (M + 204, H - 147, M + 338, H - 132), relative=0, thickness=0)


def draw_focus(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    y = section_title(c, tr(lang, "Focus", "Focus"), x, y, COL_W, ACCENT)
    items = [
        ("Cyber Security", tr(lang, "Zero Trust, IAM, detection, vulnerability management.", "Zero Trust, IAM, detection, vulnerability management."), SECURITY),
        ("AI / LLM", tr(lang, "RAG, agenti, LLM self-hosted e AI red teaming.", "RAG, agents, self-hosted LLMs and AI red teaming."), AI),
        ("Automation", tr(lang, "n8n, Make, GitHub Actions, workflow e API.", "n8n, Make, GitHub Actions, workflows and APIs."), AUTOMATION),
        ("Cloud & DevSecOps", tr(lang, "GCP, AWS, Azure, OCI, container e CI/CD.", "GCP, AWS, Azure, OCI, containers and CI/CD."), CLOUD),
    ]
    card_w = (COL_W - 8) / 2
    card_h = 52
    for i, (title, desc, accent) in enumerate(items):
        cx = x + (i % 2) * (card_w + 8)
        cy = y - (i // 2) * (card_h + 8)
        rounded_card(c, cx, cy, card_w, card_h)
        c.setFillColor(accent)
        c.roundRect(cx + 8, cy - 12, 24, 4, 2, stroke=0, fill=1)
        text(c, title, cx + 8, cy - 25, 8.6, TEXT, "Helvetica-Bold")
        wrapped(c, desc, cx + 8, cy - 38, card_w - 16, 7.4, 8.8, MUTED, "Helvetica")
    return y - (card_h * 2) - 22


def draw_experience(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    y = section_title(c, tr(lang, "Esperienza", "Experience"), x, y, COL_W, SECURITY)
    jobs = [
        (
            "Nov 2024 - " + tr(lang, "presente", "present"),
            "Cyber Security Analyst",
            "Deloitte Consulting - Enterprise Cloud & AI Security Team",
            tr(lang, "Cloud security, threat management, risk mitigation, hardening e supporto a piattaforme GCP, AWS e Azure.", "Cloud security, threat management, risk mitigation, hardening and support on GCP, AWS and Azure platforms."),
        ),
        (
            tr(lang, "Lug 2024 - Ott 2024", "Jul 2024 - Oct 2024"),
            "Junior System Administrator",
            tr(lang, "Dylog Italia S.p.A. - Torino", "Dylog Italia S.p.A. - Turin"),
            tr(lang, "Migrazioni, configurazioni, assistenza software, Windows Server e Active Directory.", "Migrations, configuration, software support, Windows Server and Active Directory."),
        ),
        (
            "2017 - 2018",
            tr(lang, "Servizi IT / CED", "IT Services / CED"),
            tr(lang, "Comune di Grugliasco, FIM-CISL, PerMicro", "Comune di Grugliasco, FIM-CISL, PerMicro"),
            tr(lang, "Supporto IT, reti, infrastruttura, help desk e attivita operative.", "IT support, networking, infrastructure, help desk and operational activities."),
        ),
    ]
    for period, role, org, desc in jobs:
        rounded_card(c, x, y, COL_W, 56)
        text(c, period.upper(), x + 10, y - 14, 7.2, ACCENT, "Helvetica-Bold")
        text(c, role, x + 10, y - 27, 10.0, TEXT, "Helvetica-Bold")
        text(c, org, x + 10, y - 39, 7.8, MUTED, "Helvetica-Bold")
        wrapped(c, desc, x + 10, y - 50, COL_W - 20, 7.3, 8.6, MUTED, "Helvetica")
        y -= 64
    return y - 2


def draw_skills(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    y = section_title(c, tr(lang, "Skills", "Skills"), x, y, COL_W, TOOL)
    groups = [
        ("Security", ["CSPM", "CNAPP", "SIEM", "SOAR", "EDR/XDR", "GRC"]),
        ("Cloud", ["GCP", "AWS", "Azure", "OCI", "IAM", "Storage"]),
        ("Platform", ["Docker", "Linux", "Proxmox", "GitHub", "CI/CD"]),
        ("AI Ops", ["OpenAI API", "RAG", "Ollama", "MCP", "PromptFoo"]),
    ]
    cy = y
    for name, vals in groups:
        text(c, name, x, cy, 8.2, TEXT, "Helvetica-Bold")
        tx = x + 58
        row_y = cy - 2
        for val in vals:
            width = max(30, c.stringWidth(val, "Helvetica-Bold", 6.8) + 12)
            if tx + width > x + COL_W:
                tx = x + 58
                row_y -= 17
            pill(c, val, tx, row_y - 6, width, PAPER_DIM, colors.HexColor("#d4dbe8"), INK_500, 6.8)
            tx += width + 5
        cy = row_y - 18

    c.linkURL(f"{SITE}/skills/", (x, y - 94, x + COL_W, y + 6), relative=0, thickness=0)
    text(c, tr(lang, "Pagina completa: paoloronco.it/skills", "Full page: paoloronco.it/skills"), x, cy + 2, 7.4, ACCENT, "Helvetica-Bold")
    return cy - 14


def draw_education_languages(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    y = section_title(c, tr(lang, "Formazione", "Education"), x, y, COL_W, ACCENT_2)
    education = [
        ("2022 - 2023", "CyberSecurity", tr(lang, "Istituto Volta - Milano", "Istituto Volta - Milan")),
        ("2019 - 2022", tr(lang, "Scienze della Comunicazione", "Communication Sciences"), "Universita eCampus"),
        ("2014 - 2018", tr(lang, "Amministrazione, Finanza e Marketing", "Administration, Finance and Marketing"), "IIS Gobetti Marchesini Casale Arduino"),
    ]
    for period, title, org in education:
        text(c, period, x, y, 7.5, ACCENT, "Helvetica-Bold")
        text(c, title, x + 58, y, 8.4, TEXT, "Helvetica-Bold")
        text(c, org, x + 58, y - 10, 7.3, MUTED, "Helvetica")
        y -= 26

    y -= 4
    y = section_title(c, tr(lang, "Lingue", "Languages"), x, y, COL_W, AUTOMATION)
    langs = [
        (tr(lang, "Italiano", "Italian"), tr(lang, "Madrelingua", "Native")),
        (tr(lang, "Inglese", "English"), tr(lang, "Avanzato", "Advanced")),
        (tr(lang, "Spagnolo", "Spanish"), tr(lang, "Base", "Basic")),
    ]
    chip_w = (COL_W - 10) / 3
    for i, (name, level) in enumerate(langs):
        cx = x + i * (chip_w + 5)
        rounded_card(c, cx, y, chip_w, 34)
        text(c, name, cx + 7, y - 13, 8.3, TEXT, "Helvetica-Bold")
        text(c, level, cx + 7, y - 25, 6.8, MUTED, "Helvetica-Bold")
    return y - 46


def draw_certifications(c: canvas.Canvas, lang: str, x: float, y: float, w: float) -> float:
    y = section_title(c, tr(lang, "Certificazioni", "Certifications"), x, y, w, CLOUD)
    data = certs(lang)
    cols = 3
    cell_gap = 7
    cell_w = (w - cell_gap * (cols - 1)) / cols
    cell_h = 25
    for i, cert in enumerate(data):
        col = i % cols
        row = i // cols
        cx = x + col * (cell_w + cell_gap)
        cy = y - row * (cell_h + 6)
        rounded_card(c, cx, cy, cell_w, cell_h, fill=colors.HexColor("#fbfcff"))
        draw_logo(c, cert["provider"], cx + 7, cy - cell_h + 6, 29, 14)
        text(c, cert["provider"], cx + 42, cy - 9, 5.6, MUTED, "Helvetica-Bold")
        name = cert["name"]
        max_chars = 25 if len(name) > 30 else 28
        lines = wrap(name, max_chars)[:2]
        ly = cy - 18
        for line in lines:
            text(c, line, cx + 42, ly, 6.9, TEXT, "Helvetica-Bold")
            ly -= 7.6
        c.linkURL(cert_pdf_url(cert["file"]), (cx, cy - cell_h, cx + cell_w, cy), relative=0, thickness=0)
    rows = (len(data) + cols - 1) // cols
    return y - rows * (cell_h + 4) - 4


def draw_footer(c: canvas.Canvas, lang: str) -> None:
    text(c, tr(lang, "CV generato da paoloronco.it - PDF e certificazioni cliccabili", "Generated from paoloronco.it - clickable PDF and certifications"), M, 16, 6.8, MUTED, "Helvetica")
    right_text(c, "paoloronco.it", W - M, 16, 6.8, MUTED, "Helvetica-Bold")


def generate(lang: str, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    photo = make_photo()
    c = canvas.Canvas(str(output), pagesize=A4)
    c.setTitle(f"Paolo Ronco - CV {lang.upper()}")
    c.setAuthor("Paolo Ronco")

    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    draw_header(c, lang, photo)

    top = H - 180
    left_x = M
    right_x = M + COL_W + GAP

    y_left = draw_focus(c, lang, left_x, top)
    y_left = draw_skills(c, lang, left_x, y_left)

    y_right = draw_experience(c, lang, right_x, top)
    y_right = draw_education_languages(c, lang, right_x, y_right)

    cert_y = min(y_left, y_right) - 6
    draw_certifications(c, lang, M, cert_y, W - M * 2)
    draw_footer(c, lang)
    c.save()


def main() -> None:
    it = PUBLIC / "cv-it.pdf"
    en = PUBLIC / "cv-en.pdf"
    generate("it", it)
    generate("en", en)
    copyfile(it, PUBLIC / "cv.pdf")
    print(it)
    print(en)
    print(PUBLIC / "cv.pdf")


if __name__ == "__main__":
    main()
