import re

with open('src/pages/Index.tsx', 'r') as f:
    content = f.read()

# Remove inline styles from hero-top-row
content = content.replace(
    '<div className="hero-top-row" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "6vh" }}>',
    '<div className="hero-top-row">'
)

# Remove inline styles from hero-head inside hero-top-row
content = content.replace(
    '<h1 className="hero-head" style={{ margin: 0, whiteSpace: "nowrap" }}>',
    '<h1 className="hero-head">'
)

# Remove inline styles from hero-bottom-row
content = content.replace(
    '<div className="hero-bottom-row" style={{ position: "relative", zIndex: 10, alignItems: "flex-end" }}>',
    '<div className="hero-bottom-row">'
)

# Fix the gradient overlay to be much stronger on mobile to hide poster text
content = content.replace(
    "<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, var(--stone) 0%, transparent 30%, transparent 60%, var(--stone) 95%)' }} />",
    "<div className=\"hero-gradient-overlay\" />"
)

with open('src/pages/Index.tsx', 'w') as f:
    f.write(content)

