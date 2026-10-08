import re

with open('src/pages/Index.tsx', 'r') as f:
    content = f.read()

# Pattern to find the Tracks section
pattern = re.compile(r'\{/\* =================================================\n\s*TRACKS\n\s*================================================= \*/\}\n\s*<section className="tracks corners" id="tracks">.*?</section>', re.DOTALL)
new_content = pattern.sub('', content)

with open('src/pages/Index.tsx', 'w') as f:
    f.write(new_content)
