with open('src/index.css', 'r') as f:
    content = f.read()

# Replace all clamps for hero-head to use 8vw max to prevent overflow of "INNOVATION"
content = content.replace('clamp(64px,\n        12vw,\n        118px)', 'clamp(42px, 8.5vw, 110px)')
content = content.replace('clamp(56px, 11vw, 168px)', 'clamp(42px, 8.5vw, 110px)')
content = content.replace('clamp(42px, 15vw, 100px)', 'clamp(42px, 8.5vw, 100px)')

with open('src/index.css', 'w') as f:
    f.write(content)
