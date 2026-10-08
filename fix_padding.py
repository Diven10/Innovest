with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace("72px 20px !important;", "72px 20px 0 !important;")
with open('src/index.css', 'w') as f:
    f.write(content)
