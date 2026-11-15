"""Save a copy of every Lichess game or study used on the site, so old posts keep working.

Finds {% include lichess_pgn.html game="..." %} (or study="..." with an optional chapter="...")
in the site's markdown and html files, and saves the PGN into assets/pgn/lichess/ unless it is
already there. Usage: python archive_lichess.py [site_root]
"""
import os
import re
import sys
import time
import urllib.error
import urllib.request

INCLUDE = re.compile(r"\{%-?\s*include\s+lichess_pgn\.html\s+(.*?)-?%\}", re.S)
ATTRIBUTE = re.compile(r'(\w+)\s*=\s*"([A-Za-z0-9]+)"')
SKIP_DIRS = {".git", "_site", "_includes", "assets", "js", "calendar_libs", "node_modules"}
OUT_DIR = os.path.join("assets", "pgn", "lichess")


def wanted(attributes):
    """Returns (file name, url) for one include's attributes, or None."""
    if "game" in attributes:
        game = attributes["game"]
        return f"game-{game}.pgn", f"https://lichess.org/game/export/{game}?clocks=false&evals=false"
    if "study" in attributes:
        study = attributes["study"]
        if "chapter" in attributes:
            chapter = attributes["chapter"]
            return f"study-{study}-{chapter}.pgn", f"https://lichess.org/api/study/{study}/{chapter}.pgn"
        return f"study-{study}.pgn", f"https://lichess.org/api/study/{study}.pgn"
    return None


def find_wanted(root):
    found = {}
    for folder, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            if not name.endswith((".md", ".markdown", ".html")):
                continue
            with open(os.path.join(folder, name), encoding="utf-8") as f:
                text = f.read()
            for match in INCLUDE.findall(text):
                item = wanted(dict(ATTRIBUTE.findall(match)))
                if item:
                    found[item[0]] = item[1]
    return found


def download(url):
    request = urllib.request.Request(url, headers={"User-Agent": "streathamchess.org archive"})
    for attempt in range(2):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                return response.read().decode("utf-8")
        except urllib.error.HTTPError as error:
            if error.code == 429 and attempt == 0:
                time.sleep(65)  # Lichess asks to wait a minute after a 429
                continue
            raise
    raise RuntimeError("unreachable")


def main(root):
    out_dir = os.path.join(root, OUT_DIR)
    saved = 0
    for name, url in sorted(find_wanted(root).items()):
        path = os.path.join(out_dir, name)
        if os.path.exists(path):
            continue
        try:
            pgn = download(url)
        except (urllib.error.URLError, OSError) as error:
            print(f"::warning::Could not save {url}: {error}")
            continue
        if "[Event " not in pgn:
            print(f"::warning::{url} did not return a PGN")
            continue
        os.makedirs(out_dir, exist_ok=True)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(pgn)
        print(f"saved {name}")
        saved += 1
        time.sleep(1)  # Lichess asks for one request at a time
    print(f"{saved} new game file(s)")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
