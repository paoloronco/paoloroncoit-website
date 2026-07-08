from __future__ import annotations

from pathlib import Path
from shutil import copyfile
from urllib.parse import quote
import textwrap

from PIL import Image, ImageDraw
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


def mini_tag(c: canvas.Canvas, value: str, x: float, y: float, fill=colors.HexColor("#f2f5f9"), fg=MUTED) -> float:
    c.setFont("Helvetica-Bold", 5.5)
    w = c.stringWidth(value, "Helvetica-Bold", 5.5) + 9
    c.setFillColor(fill)
    c.setStrokeColor(colors.HexColor("#e2e8f0"))
    c.setLineWidth(0.35)
    c.roundRect(x, y, w, 10.5, 3.5, stroke=1, fill=1)
    text(c, value, x + 4.5, y + 3.1, 5.5, fg, "Helvetica-Bold")
    return w


def section_title(c: canvas.Canvas, title: str, x: float, y: float, w: float, accent=ACCENT) -> float:
    text(c, title.upper(), x, y - 2, 8.8, INK_500, "Helvetica-Bold")
    c.setStrokeColor(colors.HexColor("#d9dee8"))
    c.setLineWidth(0.45)
    c.line(x, y - 8, x + w, y - 8)
    return y - 22


def section_box(c: canvas.Canvas, title: str, x: float, y: float, w: float, h: float) -> float:
    rounded_card(c, x, y, w, h, fill=colors.HexColor("#fbfcff"), stroke=colors.HexColor("#dce3ee"))
    text(c, title.upper(), x + 12, y - 17, 8.8, INK_500, "Helvetica-Bold")
    c.setStrokeColor(colors.HexColor("#d9dee8"))
    c.setLineWidth(0.45)
    c.line(x + 12, y - 27, x + w - 12, y - 27)
    return y - 43


def date_label(c: canvas.Canvas, value: str, x: float, y: float) -> None:
    upper = value.upper()
    if " - " in upper:
        start, end = upper.split(" - ", 1)
        text(c, f"{start} -", x, y, 6.25, ACCENT, "Helvetica-Bold")
        text(c, end, x, y - 7.1, 6.25, ACCENT, "Helvetica-Bold")
        return
    wrapped(c, upper, x, y, 48, 6.25, 7.0, ACCENT, "Helvetica-Bold")


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
    alpha = img.getchannel("A")
    rgb = img.convert("RGB")
    src = rgb.load()
    if alpha.getextrema() == (255, 255):
        alpha = Image.new("L", img.size, 0)
        dst = alpha.load()
        for yy in range(img.height):
            for xx in range(img.width):
                r, g, b = src[xx, yy]
                distance_from_white = max(0, 255 - min(r, g, b))
                dst[xx, yy] = 0 if distance_from_white < 18 else min(150, int(distance_from_white * 0.62))
    else:
        src_alpha = alpha.load()
        alpha = Image.new("L", img.size, 0)
        dst = alpha.load()
        for yy in range(img.height):
            for xx in range(img.width):
                r, g, b = src[xx, yy]
                if r > 238 and g > 238 and b > 238:
                    dst[xx, yy] = 0
                else:
                    dst[xx, yy] = int(src_alpha[xx, yy] * 0.5)

    out = Image.new("RGBA", img.size, (74, 84, 104, 0))
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
    c.rect(0, H - 166, W, 166, stroke=0, fill=1)
    c.setFillColor(INK_800)
    c.roundRect(M, H - 148, W - (M * 2), 118, 10, stroke=0, fill=1)
    c.setFillColor(ACCENT)
    c.roundRect(M, H - 34, 184, 5, 2.5, stroke=0, fill=1)

    c.drawImage(ImageReader(str(photo)), W - M - 126, H - 148, width=112, height=112, mask="auto")

    text(c, "Paolo Ronco", M + 20, H - 65, 28, WHITE, "Helvetica-Bold")
    text(c, tr(lang, "Cyber Security Analyst - Deloitte", "Cyber Security Analyst - Deloitte"), M + 22, H - 84, 10.5, colors.HexColor("#c4cdda"), "Helvetica-Bold")

    summary = tr(
        lang,
        "Cyber Security Analyst in Deloitte, nell'Enterprise Cloud & AI Security Team. Mi occupo di sicurezza cloud, infrastrutture e AI. Nel mio homelab progetto, sperimento e documento soluzioni di automazione, LLM e infrastrutture self-hosted.",
        "Cyber Security Analyst at Deloitte, in the Enterprise Cloud & AI Security Team. I work on cloud security, infrastructure and AI applied to defense. In my homelab I build, test and document automation, LLM and self-hosted infrastructure solutions.",
    )
    wrapped(c, summary, M + 22, H - 104, W - (M * 2) - 178, 8.8, 10.5, colors.HexColor("#e4e9f4"), "Helvetica")

    pill(c, "paoloronco.it", M + 20, H - 143, 76, INK_700, INK_500, colors.HexColor("#dce7ff"), 7.0)
    pill(c, "info@paoloronco.it", M + 102, H - 143, 96, INK_700, INK_500, colors.HexColor("#dce7ff"), 7.0)
    pill(c, "linkedin.com/in/paolo-ronco", M + 204, H - 143, 134, INK_700, INK_500, colors.HexColor("#dce7ff"), 7.0)
    pill(c, tr(lang, "Torino, Italia", "Turin, Italy"), M + 344, H - 143, 72, INK_700, INK_500, colors.HexColor("#dce7ff"), 7.0)

    c.linkURL(SITE, (M + 20, H - 143, M + 96, H - 128), relative=0, thickness=0)
    c.linkURL(f"mailto:info@paoloronco.it", (M + 102, H - 143, M + 198, H - 128), relative=0, thickness=0)
    c.linkURL(LINKEDIN, (M + 204, H - 143, M + 338, H - 128), relative=0, thickness=0)


def draw_focus(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    panel_h = 122
    cy = section_box(c, tr(lang, "Focus", "Focus"), x, y, COL_W, panel_h)
    items = [
        ("Cyber Security", tr(lang, "Zero Trust, IAM, detection, vulnerability management.", "Zero Trust, IAM, detection, vulnerability management.")),
        ("AI / LLM", tr(lang, "RAG, agenti, LLM self-hosted e AI red teaming.", "RAG, agents, self-hosted LLMs and AI red teaming.")),
        ("Automation", tr(lang, "n8n, Make, GitHub Actions, workflow e API.", "n8n, Make, GitHub Actions, workflows and APIs.")),
        ("Cloud & DevSecOps", tr(lang, "GCP, AWS, Azure, OCI, container e CI/CD.", "GCP, AWS, Azure, OCI, containers and CI/CD.")),
    ]
    col_w = (COL_W - 34) / 2
    for i, (title, desc) in enumerate(items):
        cx = x + 12 + (i % 2) * (col_w + 10)
        row_y = cy - (i // 2) * 44
        text(c, title, cx, row_y, 8.8, TEXT, "Helvetica-Bold")
        wrapped(c, desc, cx, row_y - 12, col_w, 7.4, 8.5, MUTED, "Helvetica")
    c.setStrokeColor(colors.HexColor("#e2e7f0"))
    c.setLineWidth(0.4)
    c.line(x + COL_W / 2, cy + 8, x + COL_W / 2, y - panel_h + 12)
    return y - panel_h - 10


def draw_experience(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    panel_h = 270
    cy = section_box(c, tr(lang, "Esperienza", "Experience"), x, y, COL_W, panel_h)
    jobs = [
        (
            "Nov 2024 - " + tr(lang, "presente", "present"),
            "Cyber Security Analyst",
            "Deloitte Consulting - Enterprise Cloud & AI Security Team",
            tr(lang, "Cloud security, threat management, hardening e supporto su GCP, AWS e Azure.", "Cloud security, threat management, hardening and support on GCP, AWS and Azure."),
        ),
        (
            tr(lang, "Lug 2024 - Ott 2024", "Jul 2024 - Oct 2024"),
            "Junior System Administrator",
            tr(lang, "Dylog Italia S.p.A. - Torino", "Dylog Italia S.p.A. - Turin"),
            tr(lang, "Migrazioni, configurazioni, supporto software, Windows Server e Active Directory.", "Migrations, configuration, software support, Windows Server and Active Directory."),
        ),
        (
            tr(lang, "Gen 2018 - Feb 2018", "Jan 2018 - Feb 2018"),
            tr(lang, "Servizi IT / CED", "IT Services / CED"),
            "Comune di Grugliasco",
            tr(lang, "Supporto CED, assistenza utenti e attivita operative IT.", "CED support, user assistance and IT operations."),
        ),
        (
            tr(lang, "Gen 2018 - Feb 2018", "Jan 2018 - Feb 2018"),
            tr(lang, "Servizi amministrativi / IT", "Accounting Services / IT Services"),
            "FIM-CISL Torino e Canavese",
            tr(lang, "Supporto amministrativo e servizi IT.", "Administrative support and IT services."),
        ),
        (
            "Mar 2017 - Apr 2017",
            "IT Services",
            "PerMicro S.p.A. - Gruppo BNP Paribas",
            tr(lang, "Tirocinio curriculare, reti e supporto infrastrutturale.", "Curricular internship, networking and infrastructure support."),
        ),
    ]
    row_heights = [50, 49, 40, 40, 40]
    date_x = x + 12
    content_x = x + 69
    content_w = COL_W - 81
    for i, (period, role, org, desc) in enumerate(jobs):
        row_top = cy
        row_h = row_heights[i]
        date_label(c, period, date_x, row_top - 1)
        wrapped(c, role, content_x, row_top, content_w, 8.25, 8.9, TEXT, "Helvetica-Bold")
        text(c, org, content_x, row_top - 11.5, 6.85, MUTED, "Helvetica-Bold")
        wrapped(c, desc, content_x, row_top - 21.5, content_w, 6.25, 7.0, MUTED, "Helvetica")
        cy -= row_h
        if i < len(jobs) - 1:
            c.setStrokeColor(colors.HexColor("#e2e7f0"))
            c.setLineWidth(0.4)
            c.line(x + 12, cy + 4, x + COL_W - 12, cy + 4)
    return y - panel_h - 10


def draw_skills(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    panel_h = 154
    cy = section_box(c, tr(lang, "Skills", "Skills"), x, y, COL_W, panel_h)
    skills_link_label = tr(lang, "Pagina completa: paoloronco.it/skills", "Full page: paoloronco.it/skills")
    right_text(c, skills_link_label, x + COL_W - 12, y - 17, 6.6, ACCENT, "Helvetica-Bold")
    c.linkURL(f"{SITE}/skills/", (x + COL_W - 122, y - 24, x + COL_W - 12, y - 10), relative=0, thickness=0)
    groups = [
        ("Security", [["CSPM", "CNAPP", "SIEM"], ["SOAR", "EDR/XDR", "GRC"]]),
        ("Cloud", [["GCP", "AWS", "Azure"], ["OCI", "IAM", "Storage"]]),
        ("Platform", [["Docker", "Linux", "Proxmox"], ["GitHub", "CI/CD"]]),
        ("AI Ops", [["OpenAI API", "RAG"], ["Ollama", "MCP", "PromptFoo"]]),
    ]
    group_w = (COL_W - 34) / 2
    group_h = 45
    for idx, (name, rows) in enumerate(groups):
        gx = x + 12 + (idx % 2) * (group_w + 10)
        gy = cy - (idx // 2) * (group_h + 8)
        text(c, name, gx, gy, 8.0, TEXT, "Helvetica-Bold")
        for row_idx, row in enumerate(rows):
            tx = gx
            ty = gy - 24 - row_idx * 13
            for item in row:
                tag_w = mini_tag(c, item, tx, ty)
                tx += tag_w + 3
    return y - panel_h - 10


def draw_languages(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    panel_h = 72
    cy = section_box(c, tr(lang, "Lingue", "Languages"), x, y, COL_W, panel_h)
    langs = [
        (tr(lang, "Italiano", "Italian"), tr(lang, "Madrelingua", "Native")),
        (tr(lang, "Inglese", "English"), tr(lang, "Avanzato", "Advanced")),
        (tr(lang, "Spagnolo", "Spanish"), tr(lang, "Base", "Basic")),
    ]
    chip_w = (COL_W - 34) / 3
    for i, (name, level) in enumerate(langs):
        cx = x + 12 + i * (chip_w + 5)
        rounded_card(c, cx, cy - 1, chip_w, 24, fill=colors.HexColor("#ffffff"))
        text(c, name, cx + 6, cy - 11, 7.6, TEXT, "Helvetica-Bold")
        text(c, level, cx + 6, cy - 22, 6.4, MUTED, "Helvetica-Bold")
    return y - panel_h - 10


def draw_education(c: canvas.Canvas, lang: str, x: float, y: float) -> float:
    panel_h = 88
    cy = section_box(c, tr(lang, "Formazione", "Education"), x, y, COL_W, panel_h)
    cy += 3.2
    education = [
        ("2022 - 2023", "CyberSecurity", tr(lang, "Istituto Volta - Milano", "Istituto Volta - Milan")),
        ("2019 - 2022", tr(lang, "Scienze della Comunicazione", "Communication Sciences"), "Universita eCampus"),
        ("2014 - 2018", tr(lang, "Amministrazione, Finanza e Marketing", "Administration, Finance and Marketing"), "IIS Gobetti Marchesini Casale Arduino"),
    ]
    for period, title, org in education:
        text(c, period, x + 12, cy, 7.0, ACCENT, "Helvetica-Bold")
        text(c, title, x + 70, cy, 8.0, TEXT, "Helvetica-Bold")
        text(c, org, x + 70, cy - 8.4, 6.45, MUTED, "Helvetica")
        cy -= 17.0
    return y - panel_h - 10


def draw_certifications(c: canvas.Canvas, lang: str, x: float, y: float, w: float) -> float:
    data = certs(lang)
    cols = 2
    cell_gap = 8
    row_gap = 2
    cell_w = (w - cell_gap * (cols - 1)) / cols
    cell_h = 21.5
    rows = (len(data) + cols - 1) // cols
    panel_h = 43 + rows * cell_h + (rows - 1) * row_gap + 7
    cy = section_box(c, tr(lang, "Certificazioni", "Certifications"), x, y, w, panel_h)
    for i, cert in enumerate(data):
        col = i % cols
        row = i // cols
        cx = x + 12 + col * (cell_w + cell_gap)
        row_y = cy - row * (cell_h + row_gap)
        inner_w = cell_w - 24
        rounded_card(c, cx, row_y, inner_w, cell_h, fill=colors.HexColor("#ffffff"))
        draw_logo(c, cert["provider"], cx + 8, row_y - cell_h + 4.8, 40, 11)
        tx = cx + 58
        text(c, cert["provider"], tx, row_y - 8, 5.7, MUTED, "Helvetica-Bold")
        name = cert["name"]
        text_w = inner_w - 66
        max_chars = max(24, int(text_w / (6.5 * 0.43)))
        lines = wrap(name, max_chars)[:2]
        ly = row_y - 15.8
        for line in lines:
            text(c, line, tx, ly, 6.25, TEXT, "Helvetica-Bold")
            ly -= 6.2
        c.linkURL(cert_pdf_url(cert["file"]), (cx, row_y - cell_h, cx + inner_w, row_y), relative=0, thickness=0)
    return y - panel_h - 4


def draw_footer(c: canvas.Canvas, lang: str) -> None:
    return None


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
    y_left = draw_languages(c, lang, left_x, y_left)

    y_right = draw_experience(c, lang, right_x, top)
    y_right = draw_education(c, lang, right_x, y_right)

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
