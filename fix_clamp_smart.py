with open('src/index.css', 'r') as f:
    content = f.read()

import re
# The original clamp was clamp(64px, 12vw, 118px). On a 1920px screen, 12vw > 118, so it clamped to 118px.
# We change it to clamp(42px, 9vw, 118px). On a 1920px screen, 9vw = 172px, so it STILL clamps to 118px!
# No change on real desktop monitors. But on 980px (mobile desktop mode), 9vw = 88px (down from 117px), which fits "INNOVATION"!
content = re.sub(r'clamp\(\s*64px,\s*12vw,\s*118px\s*\)', 'clamp(42px, 8.5vw, 118px)', content)
content = re.sub(r'clamp\(\s*56px,\s*11vw,\s*168px\s*\)', 'clamp(42px, 8.5vw, 168px)', content)

with open('src/index.css', 'w') as f:
    f.write(content)
