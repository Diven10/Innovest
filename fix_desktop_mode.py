import re

with open('src/index.css', 'r') as f:
    content = f.read()

# Fix the clamp that was causing overflow on 980px "desktop mode"
content = re.sub(r'clamp\(\s*64px,\s*12vw,\s*118px\s*\)', 'clamp(42px, 8.5vw, 118px)', content)
content = re.sub(r'clamp\(\s*56px,\s*11vw,\s*168px\s*\)', 'clamp(42px, 8.5vw, 168px)', content)

# Remove the 'hero-head.row2' negative margins if they exist to prevent overlapping
content = content.replace('lineHeight: 0.8', 'lineHeight: 1')

with open('src/index.css', 'w') as f:
    f.write(content)

with open('src/pages/Index.tsx', 'r') as f:
    tsx_content = f.read()

tsx_content = tsx_content.replace('lineHeight: 0.8', 'lineHeight: 1')
with open('src/pages/Index.tsx', 'w') as f:
    f.write(tsx_content)

