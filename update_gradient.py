with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace(
    'background: linear-gradient(to bottom, var(--stone) 0%, rgba(238, 240, 235, 0.4) 30%, transparent 60%, var(--stone) 95%);',
    'background: linear-gradient(to bottom, var(--stone) 0%, var(--stone) 45%, rgba(238, 240, 235, 0.7) 65%, var(--stone) 100%);'
)

with open('src/index.css', 'w') as f:
    f.write(content)
