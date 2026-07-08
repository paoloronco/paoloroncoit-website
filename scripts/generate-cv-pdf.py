from __future__ import annotations

from pathlib import Path
from urllib.parse import quote
import textwrap

from PIL import Image, ImageDraw
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "cv.pdf"
TMP = ROOT / "tmp" / "pdfs"
PHOTO = ROOT / "public" / "paolo.png"
LOGOS = ROOT / "public" / "logos"
SITE = "https://paoloronco.it"

W, H = A4
SIDEBAR_W = 205
RIGHT_X = 226
RIGHT_W = W - RIGHT_X - 24

NAVY = colors.HexColor("#07345a")
NAVY_DARK = colors.HexColor("#052943")
INK = colors.HexColor("#123047")
TEXT = colors.HexColor("#182335")
MUTED = colors.HexColor("#6b7280")
LIGHT = colors.HexColor("#f8fafc")
LINE = colors.HexColor("#d8dee8")
WHITE = colors.white
ACCENT = colors.HexColor("#0b5d9a")


def make_photo() -> Path:
    TMP.mkdir(parents=True, exist_ok=True)
    target = TMP / "paolo-cv-photo.png"
    src = Image.open(PHOTO).convert("RGBA")
    side = min(src.size)
    left = (src.width - side) // 2
    top = (src.height - side) // 2
    src = src.crop((left, top, left + side, top + side)).resize((420, 420), Image.LANCZOS)

    mask = Image.new("L", src.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, src.width, src.height), fill=255)

    bg = Image.new("RGBA", src.size, (7, 52, 90, 255))
    bg.alpha_composite(src)
    bg.putalpha(mask)
    bg.save(target)
    return target


def wrap(text: str, chars: int) -> list[str]:
    return textwrap.wrap(text, width=chars, break_long_words=False, replace_whitespace=False)


def text(c: canvas.Canvas, value: str, x: float, y: float, size: float, color=TEXT, font="Helvetica") -> None:
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def wrapped(c: canvas.Canvas, value: str, x: float, y: float, width: float, size: float, leading: float, color=TEXT, font="Helvetica") -> float:
    chars = max(16, int(width / (size * 0.46)))
    c.setFillColor(color)
    c.setFont(font, size)
    for line in wrap(value, chars):
        c.drawString(x, y, line)
        y -= leading
    return y


def hline(c: canvas.Canvas, x: float, y: float, w: float, color=INK) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(0.6)
    c.line(x, y, x + w, y)


def section(c: canvas.Canvas, title: str, x: float, y: float, w: float, dark: bool = False) -> float:
    color = WHITE if dark else INK
    text(c, title, x, y, 15, color, "Helvetica-Bold")
    hline(c, x, y - 4, w, WHITE if dark else INK)
    return y - 17


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


def draw_logo(c: canvas.Canvas, provider: str, x: float, y: float, max_w: float = 34, max_h: float = 12) -> None:
    path = logo_path(provider)
    if not path:
        text(c, provider[:6], x, y, 5.4, MUTED, "Helvetica-Bold")
        return

    with Image.open(path) as img:
        iw, ih = img.size
    scale = min(max_w / iw, max_h / ih)
    w = iw * scale
    h = ih * scale
    c.drawImage(ImageReader(str(path)), x, y - h + 2, width=w, height=h, preserveAspectRatio=True, mask="auto")


def cert_pdf_url(file_name: str) -> str:
    return f"{SITE}/certificati/{quote(file_name)}"


def draw_sidebar(c: canvas.Canvas, photo: Path) -> None:
    c.setFillColor(NAVY)
    c.rect(0, 0, SIDEBAR_W, H, stroke=0, fill=1)
    c.setFillColor(NAVY_DARK)
    c.rect(0, 0, SIDEBAR_W, 38, stroke=0, fill=1)

    c.drawImage(ImageReader(str(photo)), 59, 716, width=88, height=88, mask="auto")

    y = section(c, "Contatti", 14, 670, SIDEBAR_W - 28, dark=True)
    contact_items = [
        ("Sito web", "paoloronco.it/cv"),
        ("Email", "info@paoloronco.it"),
        ("LinkedIn", "linkedin.com/in/paolo-ronco-685a5722a"),
        ("Residenza", "Torino"),
    ]
    for label, value in contact_items:
        text(c, label, 18, y, 8.7, WHITE, "Helvetica-Bold")
        text(c, value, 18, y - 10, 7.3, WHITE, "Helvetica")
        y -= 31

    y = section(c, "Esperienze", 14, y - 9, SIDEBAR_W - 28, dark=True)
    jobs = [
        (
            "Cyber Security Analyst",
            "Deloitte Consulting",
            "Nov 2024 - attuale",
            ["Cloud & AI security", "Threat management", "Risk mitigation"],
        ),
        (
            "Junior System Administrator",
            "Dylog Italia S.p.A.",
            "Lug 2024 - Ott 2024",
            ["Migrazioni e configurazioni", "Assistenza software", "Windows Server / AD"],
        ),
        (
            "IT Services / CED",
            "Comune di Grugliasco",
            "Gen 2018 - Feb 2018",
            ["Supporto IT", "Servizi CED"],
        ),
        (
            "IT Support",
            "PerMicro S.p.A.",
            "Mar 2017 - Apr 2017",
            ["Tirocinio curriculare", "Reti e infrastruttura"],
        ),
    ]
    for role, org, period, bullets in jobs:
        text(c, "• " + role, 14, y, 8.6, WHITE, "Helvetica-Bold")
        text(c, org, 25, y - 10, 8.1, WHITE, "Helvetica-Oblique")
        text(c, period, 25, y - 20, 7.0, colors.HexColor("#d8e9ff"), "Helvetica")
        by = y - 31
        for bullet in bullets:
            text(c, "- " + bullet, 30, by, 6.8, WHITE, "Helvetica")
            by -= 8.5
        y = by - 8

    y = section(c, "Lingue", 14, 120, SIDEBAR_W - 28, dark=True)
    for lang in ["Italiano - Madrelingua", "Inglese - Avanzato", "Spagnolo - Base"]:
        text(c, lang, 22, y, 8.5, WHITE, "Helvetica-Bold")
        y -= 18


def draw_header(c: canvas.Canvas) -> float:
    text(c, "Paolo Ronco", RIGHT_X, 806, 23, colors.HexColor("#003963"), "Helvetica-Bold")
    summary = (
        "Cyber Security Analyst in Deloitte, nell'Enterprise Cloud & AI Security Team. "
        "Lavoro su sicurezza cloud, infrastrutture, AI e automazione, con esperienza pratica "
        "su GCP, AWS, Azure, detection, gestione vulnerabilita, hardening e piattaforme self-hosted."
    )
    return wrapped(c, summary, RIGHT_X, 785, RIGHT_W, 8.2, 10.2, colors.HexColor("#535b67"), "Helvetica") - 7


def draw_education(c: canvas.Canvas, y: float) -> float:
    y = section(c, "Istruzione", RIGHT_X, y, RIGHT_W)
    entries = [
        ("2022 - 2023", "Istituto Volta Scuola di Specializzazione informatica - Milano", "Corso di CyberSecurity"),
        ("2019 - 2022", "Universita eCampus", "Laurea triennale in Scienze della Comunicazione"),
        ("2014 - 2018", "IIS Gobetti Marchesini Casale Arduino - Torino", "Diploma Amministrazione, Finanza e Marketing"),
    ]
    line_x = RIGHT_X + 5
    c.setStrokeColor(colors.HexColor("#7a8391"))
    c.setLineWidth(0.5)
    c.line(line_x, y + 6, line_x, y - 104)
    for period, org, title in entries:
        c.setFillColor(WHITE)
        c.circle(line_x, y + 2, 3.4, stroke=1, fill=1)
        c.setStrokeColor(INK)
        c.circle(line_x, y + 2, 3.4, stroke=1, fill=0)
        text(c, period, RIGHT_X + 18, y, 8.2, colors.HexColor("#626b78"), "Helvetica-Bold")
        text(c, org, RIGHT_X + 18, y - 11, 7.8, colors.HexColor("#626b78"), "Helvetica")
        wrapped(c, title, RIGHT_X + 30, y - 22, RIGHT_W - 42, 8.5, 9.2, MUTED, "Helvetica-Bold")
        y -= 39
    return y - 5


def draw_certifications(c: canvas.Canvas, y: float) -> float:
    y = section(c, "Certificati", RIGHT_X, y, RIGHT_W)
    certs = [
        ("CompTIA", "Security+", "1 CompTIA Security+ ce certificate.pdf"),
        ("CompTIA", "AI Essentials", "1a CompTIA-AI-Essentials.pdf"),
        ("EC-Council", "Ethical Hacking Essentials (EHE)", "2 EcCouncil Ethical Hacking Essentials - EHE.pdf"),
        ("Google Cloud", "Generative AI Leader", "GenerativeAILeader20251024-30-a9cl88.pdf"),
        ("Google Cloud", "Digital Leader", "CloudDigitalLeader20260427-32-hy8vki.pdf"),
        ("Google Cloud", "Associate Cloud Engineer", "AssociateCloudEngineer20260708-7-owa87.pdf"),
        ("Splunk", "Core Certified User", "10 SplunkCoreCertifiedUser.pdf"),
        ("Cisco", "NetAcad - Get Connected 2022", "3 Cisco NetCAD - Get Connected 2022.pdf"),
        ("Cisco", "NetAcad - Introduction to CyberSecurity", "4 Cisco NetCAD - Introduction to CyberSecurity 2022.pdf"),
        ("Cisco", "NetAcad - NDG Linux Unhatched", "5 Cisco NetCAD - NDG Linux Unchained.pdf"),
        ("Google", "Cybersecurity Professional Certificate", "10 Coursea - Google Cyber Security Professional Certificate.pdf"),
        ("Intel", "Network Academy - Network Transformation 101", "9 Coursea - Intel® Network Academy - Network Transformation 101.pdf"),
        ("Google", "IT Support - Technical Support Fundamentals", "7 Coursea - Google IT Support - Technical Support Fundamentals.pdf"),
        ("IBM", "Introduction to Hardware and Operating Systems", "8 Coursea - IBM - Introduction to Hardware and Operating Systems.pdf"),
        ("Google", "Fondamenti di Marketing Digitale", "6 Google Fondamenti di Marketing Digitale.pdf"),
        ("AWS", "Knowledge: Cloud Essentials", "15 AWS CAWS Knowledge Cloud Essentials.pdf"),
        ("Unioncamere + Google", "Corso Crescere in Digitale", "16 - certificato Corso Crescere in digitale.pdf"),
    ]
    row_h = 13.3
    for provider, title, file_name in certs:
        row_top = y + 2
        row_bottom = y - row_h + 2
        draw_logo(c, provider, RIGHT_X, y + 1, max_w=32, max_h=10)
        text(c, title, RIGHT_X + 42, y - 1, 7.25, colors.HexColor("#6a717c"), "Helvetica")
        c.linkURL(cert_pdf_url(file_name), (RIGHT_X, row_bottom, RIGHT_X + RIGHT_W, row_top), relative=0, thickness=0)
        y -= row_h
    return y - 6


def draw_skills(c: canvas.Canvas, y: float) -> None:
    y = section(c, "Aree di competenza", RIGHT_X, y, RIGHT_W)
    c.linkURL(f"{SITE}/skills/", (RIGHT_X + RIGHT_W - 74, y + 14, RIGHT_X + RIGHT_W, y + 27), relative=0, thickness=0)
    text(c, "paoloronco.it/skills", RIGHT_X + RIGHT_W - 72, y + 17, 6.2, colors.HexColor("#003963"), "Helvetica")
    skills = [
        "Cybersecurity: CSPM, SIEM, SOAR, EDR/XDR, GRC",
        "Cloud Platforms: GCP, AWS, Azure, OCI",
        "Networking: Firewall, Zero Trust, CDN, API Gateway",
        "DevOps / Automation: Docker, Git, CI/CD, n8n, Make",
        "AI Operations: OpenAI API, RAG, Ollama, AI Red Teaming",
    ]
    for item in skills:
        text(c, "•", RIGHT_X + 2, y, 8.2, MUTED, "Helvetica")
        wrapped(c, item, RIGHT_X + 14, y, RIGHT_W - 18, 8.3, 10.0, MUTED, "Helvetica")
        y -= 12.8


def generate() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    photo = make_photo()
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("Paolo Ronco - CV")
    c.setAuthor("Paolo Ronco")

    c.setFillColor(WHITE)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    draw_sidebar(c, photo)
    y = draw_header(c)
    y = draw_education(c, y)
    y = draw_certifications(c, y)
    draw_skills(c, y)
    c.save()


if __name__ == "__main__":
    generate()
    print(OUT)
