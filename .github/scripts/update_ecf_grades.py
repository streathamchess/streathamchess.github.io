"""Copy the club's published ECF ratings into _data/ecf_grades.json, for the Members' grades page.

Reads the ECF rating list for our club (club code 7152) and keeps only each player's name and their
over-the-board Standard, Rapid and Blitz ratings, the title if they have one (FM, CM and so on), and the ECF code
that the page uses to link to the player's own ECF page, sorted by Standard (highest first). Nothing else on the ECF page (member numbers, expiry dates, sex,
nationality) is copied. The file is only rewritten when a rating or a
name changed, so an unchanged list makes no commit. Usage: python update_ecf_grades.py [site_root]
"""
import html
import json
import os
import re
import sys
import urllib.request

CLUB_CODE = "7152"
SOURCE = f"https://rating.englishchess.org.uk/players/list?club_code={CLUB_CODE}"
USER_AGENT = "streathamchess.org grades page (weekly copy of the club's own ECF list)"
MIN_PLAYERS = 30  # the list has well over 100 names; far fewer means the page changed shape, so keep the old file


def clean(cell):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", cell))).strip()


def rating(cell):
    """'1556K' -> 1556 (the letter after the number is the ECF's rating category); '' -> None."""
    m = re.match(r"(\d+)", clean(cell))
    return int(m.group(1)) if m else None


def parse(page):
    month = re.search(r"<th[^>]*>\s*Std<br>\s*<small>([^<]+)</small>", page)
    body = page[page.find("<tbody"):]
    players = []
    for row in re.findall(r"<tr[^>]*>(.*?)</tr>", body, re.S):
        cells = re.findall(r"<td[^>]*>(.*?)</td>", row, re.S)
        if len(cells) < 15:
            continue
        name = f"{clean(cells[8])} {clean(cells[9])}".strip()
        code = clean(cells[1])
        title = clean(cells[7])
        std, rapid, blitz = rating(cells[12]), rating(cells[13]), rating(cells[14])
        if name and re.fullmatch(r"[0-9A-Z]+", code) and (std or rapid or blitz):
            players.append({"name": name, "title": title, "code": code, "std": std, "rapid": rapid, "blitz": blitz})
    # Standard first (highest first); players with no Standard rating follow, by Rapid then Blitz
    players.sort(key=lambda p: (p["std"] is None, -(p["std"] or 0), -(p["rapid"] or 0), -(p["blitz"] or 0), p["name"]))
    return (month.group(1).strip() if month else None), players


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "."
    out = os.path.join(root, "_data", "ecf_grades.json")
    request = urllib.request.Request(SOURCE, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:
        page = response.read().decode("utf-8")
    month, players = parse(page)
    if not month or len(players) < MIN_PLAYERS:
        sys.exit(f"Unexpected ECF page: list month {month!r}, {len(players)} players - leaving {out} unchanged")
    data = {"rating_list": month, "source": SOURCE, "players": players}
    text = json.dumps(data, ensure_ascii=False, indent=1) + "\n"
    if os.path.exists(out) and open(out, encoding="utf-8").read() == text:
        print("No change")
        return
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    print(f"Saved {len(players)} players, {month} list")


if __name__ == "__main__":
    main()
