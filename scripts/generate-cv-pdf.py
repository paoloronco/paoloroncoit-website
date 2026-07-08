from __future__ import annotations

from pathlib import Path
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

W, H = A4
M = 34

INK = colors.HexColor("#0a0c12")
INK_2 = colors.HexColor("#11151f")
INK_3 = colors.HexColor("#1b2230")
TEXT = colors.HexColor("#f3f6fc")
DIM = colors.HexColor("#c4cdda")
MUTED = colors.HexColor("#647084")
PAPER = colors.HexColor("#f7f6f3")
PAPER_2 = colors.HexColor("#ebeef4")
ACCENT = colors.HexColor("#4f8dff")
SECURITY = colors.HexColor("#fb7185")
CLOUD = colors.HexColor("#38bdf8")
AI = colors.HexColor("#a78bfa")
AUTO = colors.HexColor("#fbbf24")
TOOL = colors.HexColor("#34d399")


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
    draw.rounded_rectangle((0, 0, src.width, src.height), radius=52, fill=255)

    bg = Image.new("RGBA", src.size, (247, 246, 243, 255))
    bg.alpha_composite(src)
    bg.putalpha(mask)
    bg.save(target)
    return target


def wrap_lines(text: str, width_chars: int) -> list[str]:
    return textwrap.wrap(text, width=width_chars, break_long_words=False, replace_whitespace=False)


def draw_wrapped(c: canvas.Canvas, text: str, x: float, y: float, width: float, font: str, size: int, leading: int, color, max_lines: int | None = None) -> float:
    c.setFont(font, size)
    c.setFillColor(color)
    avg = size * 0.49
    chars = max(18, int(width / avg))
    lines = wrap_lines(text, chars)
    if max_lines is not None:
        lines = lines[:max_lines]
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def pill(c: canvas.Canvas, x: float, y: float, text: str, fill, stroke=None, text_color=INK, font="Helvetica-Bold", size=8, pad_x=7, pad_y=4) -> float:
    c.setFont(font, size)
    tw = c.stringWidth(text, font, size)
    h = size + pad_y * 2
    w = tw + pad_x * 2
    c.setFillColor(fill)
    c.setStrokeColor(stroke or fill)
    c.roundRect(x, y - h + 2, w, h, 5, stroke=1 if stroke else 0, fill=1)
    c.setFillColor(text_color)
    c.drawString(x + pad_x, y - size - pad_y + 4, text)
    return w


def section_title(c: canvas.Canvas, x: float, y: float, title: str, color=ACCENT):
    c.setFillColor(color)
    c.roundRect(x, y - 9, 18, 3, 1.5, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x + 25, y - 14, title.upper())


def card(c: canvas.Canvas, x: float, y: float, w: float, h: float, fill=PAPER, stroke=PAPER_2, radius=10):
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.roundRect(x, y - h, w, h, radius, stroke=1, fill=1)


def small_footer(c: canvas.Canvas, page: int):
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(M, 20, "paoloronco.it - info@paoloronco.it - linkedin.com/in/paolo-ronco-685a5722a")
    c.drawRightString(W - M, 20, f"CV - pagina {page}")


def draw_hero(c: canvas.Canvas, photo_path: Path):
    c.setFillColor(INK)
    c.rect(0, H - 250, W, 250, stroke=0, fill=1)
    c.setFillColor(INK_2)
    c.roundRect(M, H - 230, W - (M * 2), 210, 18, stroke=0, fill=1)
    c.setFillColor(ACCENT)
    c.roundRect(M, H - 42, 88, 4, 2, stroke=0, fill=1)

    c.setFillColor(TEXT)
    c.setFont("Helvetica-Bold", 34)
    c.drawString(M + 26, H - 82, "Paolo Ronco")
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(ACCENT)
    c.drawString(M + 28, H - 105, "Cyber Security Analyst")

    intro = (
        "Cyber Security Analyst in Deloitte, nell'Enterprise Cloud & AI Security Team. "
        "Mi occupo di sicurezza cloud, infrastrutture e AI. Nel mio homelab progetto, sperimento "
        "e documento soluzioni di automazione, LLM e infrastrutture self-hosted."
    )
    draw_wrapped(c, intro, M + 28, H - 132, 305, "Helvetica", 9, 13, DIM, max_lines=5)

    x = W - M - 138
    y = H - 196
    c.setFillColor(ACCENT)
    c.roundRect(x - 12, y - 12, 136, 136, 28, stroke=0, fill=1)
    c.setFillColor(CLOUD)
    c.roundRect(x + 10, y + 12, 126, 126, 26, stroke=0, fill=1)
    c.drawImage(ImageReader(str(photo_path)), x, y, width=126, height=126, mask="auto")

    tags = ["Cloud Security", "AI Security", "Automation", "DevSecOps"]
    tx = M + 28
    ty = H - 205
    for t in tags:
        used = pill(c, tx, ty, t, colors.HexColor("#1f2b43"), stroke=colors.HexColor("#33415c"), text_color=TEXT, size=7)
        tx += used + 6


def draw_experience(c: canvas.Canvas):
    section_title(c, M, H - 284, "Esperienza")
    items = [
        ("Nov 2024 - presente", "Cyber Security Analyst", "Deloitte Consulting - Enterprise Cloud & AI Security Team"),
        ("Lug 2024 - Ott 2024", "Junior System Administrator", "Dylog s.p.a. - Torino"),
        ("Gen 2018 - Feb 2018", "Servizi IT / CED", "Comune di Grugliasco"),
        ("Gen 2018 - Feb 2018", "Accounting Services / IT Services", "FIM-CISL Torino e Canavese"),
        ("Mar 2017 - Apr 2017", "IT Services", "PerMicro s.p.a. - Gruppo BNP Paribas"),
    ]
    x = M
    y = H - 318
    for period, role, org in items:
        card(c, x, y, 332, 50, fill=colors.white, stroke=PAPER_2, radius=8)
        c.setFillColor(ACCENT)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 12, y - 17, period)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x + 12, y - 31, role)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        c.drawString(x + 12, y - 43, org[:72])
        y -= 58


def draw_sidebar(c: canvas.Canvas):
    x = 392
    y = H - 284
    section_title(c, x, y, "Lingue", color=AI)
    y -= 32
    for lang, level in [("Italiano", "Madrelingua"), ("Inglese", "Avanzato"), ("Spagnolo", "Base")]:
        card(c, x, y, 168, 39, fill=colors.white, stroke=PAPER_2, radius=8)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(x + 12, y - 17, lang)
        c.setFillColor(AI)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(x + 12, y - 29, level.upper())
        y -= 47

    section_title(c, x, y - 2, "Focus", color=CLOUD)
    y -= 36
    focus = ["Cloud defense", "Zero Trust", "SIEM / Detection", "LLM & RAG", "n8n automation", "Self-hosted infra"]
    for f in focus:
        used = pill(c, x, y, f, colors.white, stroke=PAPER_2, text_color=INK, size=8)
        y -= 22


def draw_skills(c: canvas.Canvas):
    section_title(c, M, 174, "Competenze principali", color=TOOL)
    groups = [
        ("Security", SECURITY, ["Cybersecurity", "Cloud Security", "Zero Trust", "IAM", "CSPM / CNAPP", "Incident Response"]),
        ("Cloud", CLOUD, ["Google Cloud", "AWS", "Azure", "OCI", "Cloud Architecture", "Object Storage"]),
        ("Automation / AI", AI, ["n8n", "Make.com", "OpenAI API", "RAG", "Ollama", "AI Red Teaming"]),
        ("Platform", TOOL, ["Docker", "Linux", "Proxmox", "GitHub Actions", "Monitoring", "WordPress"]),
    ]
    y = 142
    col_w = 258
    for idx, (name, color, skills) in enumerate(groups):
        x = M + (idx % 2) * (col_w + 12)
        if idx == 2:
            y = 84
        card(c, x, y, col_w, 45, fill=colors.white, stroke=PAPER_2, radius=8)
        c.setFillColor(color)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 10, y - 15, name.upper())
        tx = x + 10
        ty = y - 29
        for skill in skills:
            w = pill(c, tx, ty, skill, colors.HexColor("#eef3ff"), text_color=INK, size=6.5, pad_x=5, pad_y=3)
            tx += w + 4
            if tx > x + col_w - 55:
                tx = x + 10
                ty -= 16


def draw_certifications(c: canvas.Canvas):
    section_title(c, M, H - 58, "Certificazioni", color=ACCENT)
    certs = [
        ("CompTIA", "Security+ ce certificate"),
        ("CompTIA", "AI Essentials"),
        ("Google Cloud", "Associate Cloud Engineer"),
        ("Google Cloud", "Digital Leader"),
        ("Google Cloud", "Generative AI Leader"),
        ("Google", "Cybersecurity Professional Certificate"),
        ("Google", "IT Support - Technical Support Fundamentals"),
        ("AWS", "Knowledge: Cloud Essentials"),
        ("Splunk", "Core Certified User"),
        ("Cisco", "Introduction to CyberSecurity"),
        ("Cisco", "Get Connected"),
        ("Cisco", "NDG Linux Unhatched"),
        ("IBM", "Introduction to Hardware and Operating Systems"),
        ("Intel", "Network Academy - Network Transformation 101"),
        ("EC-Council", "Ethical Hacking Essentials"),
        ("Google", "Fondamenti di Marketing Digitale"),
        ("Unioncamere + Google", "Corso Crescere in digitale"),
    ]
    colors_by_provider = {
        "CompTIA": SECURITY,
        "Google Cloud": CLOUD,
        "Google": ACCENT,
        "AWS": AUTO,
        "Splunk": AI,
        "Cisco": CLOUD,
        "IBM": ACCENT,
        "Intel": ACCENT,
        "EC-Council": AUTO,
        "Unioncamere + Google": TOOL,
    }
    col_w = (W - M * 2 - 12) / 2
    x1 = M
    y = H - 92
    for i, (provider, name) in enumerate(certs):
        x = x1 + (i % 2) * (col_w + 12)
        if i and i % 2 == 0:
            y -= 45
        card(c, x, y, col_w, 38, fill=colors.white, stroke=PAPER_2, radius=8)
        accent = colors_by_provider.get(provider, ACCENT)
        c.setFillColor(accent)
        c.roundRect(x + 10, y - 15, 20, 4, 2, stroke=0, fill=1)
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(x + 38, y - 14, provider)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7.3)
        draw_wrapped(c, name, x + 38, y - 25, col_w - 48, "Helvetica", 7.3, 8.5, MUTED, max_lines=2)


def draw_education(c: canvas.Canvas):
    section_title(c, M, 245, "Formazione", color=AI)
    items = [
        ("Corso", "CyberSecurity", "Istituto Volta - Milano"),
        ("Laurea triennale", "Scienze della Comunicazione, Digital Entertainment and Marketing", "Universita eCampus - Novedrate (CO)"),
        ("Diploma", "Amministrazione, Finanza e Marketing", "IIS Gobetti Marchesini Casale Arduino - Torino"),
    ]
    y = 215
    for kind, title, org in items:
        card(c, M, y, W - M * 2, 34, fill=colors.white, stroke=PAPER_2, radius=8)
        c.setFillColor(AI)
        c.setFont("Helvetica-Bold", 7)
        c.drawString(M + 12, y - 13, kind.upper())
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(M + 92, y - 13, title[:82])
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7.5)
        c.drawString(M + 92, y - 25, org)
        y -= 40


def generate():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    photo = make_photo()
    c = canvas.Canvas(str(OUT), pagesize=A4)
    c.setTitle("Paolo Ronco - CV")
    c.setAuthor("Paolo Ronco")

    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    draw_hero(c, photo)
    draw_experience(c)
    draw_sidebar(c)
    draw_skills(c)
    small_footer(c, 1)

    c.showPage()
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    draw_certifications(c)
    draw_education(c)
    small_footer(c, 2)
    c.save()


if __name__ == "__main__":
    generate()
    print(OUT)
