with open('src/pages/Index.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "24px" }}>',
    '<div className="hero-bottom-right">'
)
with open('src/pages/Index.tsx', 'w') as f:
    f.write(content)
