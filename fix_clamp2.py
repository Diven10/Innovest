with open('src/index.css', 'r') as f:
    content = f.read()

import re
content = re.sub(r'clamp\(\s*64px,\s*12vw,\s*118px\s*\)', 'clamp(42px, 8.5vw, 110px)', content)
content = re.sub(r'clamp\(\s*38px,\s*14vw,\s*82px\s*\)', 'clamp(38px, 8.5vw, 82px)', content)

with open('src/index.css', 'w') as f:
    f.write(content)
