import os
import re

# Configuration
ASSET_DIRS = [
    'assets/images',
    'assets/video',
    'assets/audio',
    'assets/fonts',
    'css',
    'js'
]
PAGES_DIR = 'pages'
ROOT_FILE = 'index.html'

def get_asset_map():
    """Maps filename -> relative path from root"""
    asset_map = {}
    for d in ASSET_DIRS:
        if not os.path.exists(d):
            continue
        for f in os.listdir(d):
            if f.startswith('.'): continue
            asset_map[f] = f"{d}/{f}"
    return asset_map

def update_file(filepath, asset_map, is_page=True):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original_content = content
    
    # Iterate through all assets and replace references
    for filename, root_path in asset_map.items():
        # Determine replacement path
        if is_page:
            new_path = f"../{root_path}"
        else:
            new_path = root_path
            
        # Regex to match filename in quotes or url()
        # We look for filename preceded by / or " or ' or (
        # And NOT already preceded by the correctly formed path
        
        # Simple string replacement for now, being careful not to double-replace
        # We search for "filename" or 'filename' or (filename)
        # And check if it's already "new_path"
        
        # Strategy: 
        # 1. Find all occurrences of filename.
        # 2. Check context.
        
        # Matches: src="filename", href="filename", url('filename'), url(filename)
        # We want to avoid matching if it's already "assets/images/filename"
        
        # Regex patterns to match "loose" references
        # 1. src="filename" or src='filename'
        pattern_src = r'(src|href)=["\']' + re.escape(filename) + r'["\']'
        content = re.sub(pattern_src, lambda m: f'{m.group(1)}="{new_path}"', content)
        
        # 2. url('filename') or url("filename") or url(filename)
        pattern_url = r'url\((["\']?)' + re.escape(filename) + r'\1\)'
        content = re.sub(pattern_url, lambda m: f'url({new_path})', content)
        
        # 3. Handle cases where it might be `images/filename` if that existed previously
        # pattern_old_dir = r'["\']images/' + re.escape(filename) + r'["\']'
        # content = re.sub(pattern_old_dir, f'"{new_path}"', content)
        
        # 4. Handle specific case seen in aboutus: style="background-image: url('filename')"
        # Covered by pattern_url

    if content != original_content:
        print(f"Updated {filepath}")
        with open(filepath, 'w') as f:
            f.write(content)

def main():
    asset_map = get_asset_map()
    print(f"Found {len(asset_map)} assets.")
    
    # Update index.html
    if os.path.exists(ROOT_FILE):
        update_file(ROOT_FILE, asset_map, is_page=False)
        
    # Update pages
    if os.path.exists(PAGES_DIR):
        for f in os.listdir(PAGES_DIR):
            if f.endswith('.html'):
                update_file(os.path.join(PAGES_DIR, f), asset_map, is_page=True)

if __name__ == "__main__":
    main()
