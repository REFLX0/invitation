import re

GENERIC_IDS = [
    'noir-et-or',
    'la-brise-marine',
    'lella-beya',
    'yasmine-jasmin',
    'dar-el-bey',
    'carthage-or',
    'hammamet-sunset',
    'tataouine-desert',
    'djerba-insulaire',
    'palmier-tendre',
]

filepath = '/home/z/invitation-src/src/components/daawa/templates/template-registry.ts'

with open(filepath, 'r') as f:
    lines = f.readlines()

# Find and remove blocks for each generic ID
output = []
skip = False
removed = []

i = 0
while i < len(lines):
    line = lines[i]
    
    # Check if this line starts a comment block that precedes a generic template
    # or if the line contains id: 'generic-id'
    is_generic = False
    for gid in GENERIC_IDS:
        # Check if current line is a section comment and next lines contain the id
        if re.search(r'// ─', line) and i + 10 < len(lines):
            block = ''.join(lines[i:i+30])
            if f"id: '{gid}'" in block:
                is_generic = True
                removed.append(gid)
                skip = True
                break
        # Check if this is the opening { of a template block with generic id
        if line.strip() == '{' and not skip:
            block = ''.join(lines[max(0,i-2):i+30])
            if f"id: '{gid}'" in block and 'layoutComponent' not in block:
                is_generic = True
                removed.append(gid)
                skip = True
                break
    
    if skip:
        # Skip until we find the closing }, at the right nesting level
        if line.strip() == '},':
            skip = False
            output.append('\n')  # keep a blank line
        # else: skip this line
        i += 1
        continue
    
    output.append(line)
    i += 1

# Clean up multiple blank lines
result = ''.join(output)
result = re.sub(r'\n{4,}', '\n\n\n', result)

# Update header
result = result.replace(
    "Daawa Template Registry — 27 Phenomenal Invitation Designs",
    "Daawa Template Registry — 18 Phenomenal Invitation Designs"
)

with open(filepath, 'w') as f:
    f.write(result)

count = len(re.findall(r"id: '", result))
print(f"Remaining templates: {count}")
print(f"Removed: {removed}")
