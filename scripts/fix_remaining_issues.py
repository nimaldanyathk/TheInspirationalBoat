import os
import re

PAGES_DIR = 'pages'

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Fix href="assets/..." -> href="../assets/..."
    # This specifically targets links to assets that missing the ../ prefix in pages/
    content = re.sub(r'href=["\']assets/', 'href="../assets/', content)
    
    # 2. Fix src="assets/..." -> src="../assets/..." (just in case)
    content = re.sub(r'src=["\']assets/', 'src="../assets/', content)
    
    # 3. Fix interstellar1.mp3 -> ../assets/audio/interstellar.mp3
    # If it was just "interstellar1.mp3"
    content = re.sub(r'["\']interstellar1\.mp3["\']', '"../assets/audio/interstellar.mp3"', content)
    # If it was "assets/audio/interstellar1.mp3" (already fixed prefix but wrong name)
    content = re.sub(r'interstellar1\.mp3', 'interstellar.mp3', content)

    # 4. Fix bgvideo2.mp4 -> ../assets/video/black.mp4 (assuming black.mp4 is the background)
    # If it was "bgvideo2.mp4"
    content = re.sub(r'["\']bgvideo2\.mp4["\']', '"../assets/video/black.mp4"', content)
    
    # 5. Fix font-family: 'assets/fonts/...' which is invalid CSS usually, but if it's a file path it needs ../
    content = re.sub(r'["\']assets/fonts/', '"../assets/fonts/', content)

    if content != original_content:
        print(f"Fixed {filepath}")
        with open(filepath, 'w') as f:
            f.write(content)

def main():
    if not os.path.exists(PAGES_DIR):
        return
        
    for f in os.listdir(PAGES_DIR):
        if f.endswith('.html'):
            update_file(os.path.join(PAGES_DIR, f))

if __name__ == "__main__":
    main()
