import re

with open("src/pages/Index.tsx", "r") as f:
    content = f.read()

img_tag = """<img src="/shark-cash.jpg" alt="Shark Fin and Cash" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom', filter: 'contrast(1.15) saturate(1.2) brightness(1.05)', transform: 'translateZ(0)' }} />"""

picture_tag = """<picture>
            <source media="(max-width: 900px)" srcSet="/shark-cash-mobile.jpg" />
            <source media="(orientation: portrait)" srcSet="/shark-cash-mobile.jpg" />
            <img src="/shark-cash.jpg" alt="Shark Fin and Cash" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom', filter: 'contrast(1.15) saturate(1.2) brightness(1.05)', transform: 'translateZ(0)' }} />
          </picture>"""

content = content.replace(img_tag, picture_tag)
content = content.replace('gap: "24px"', 'gap: "6vh"')

with open("src/pages/Index.tsx", "w") as f:
    f.write(content)
