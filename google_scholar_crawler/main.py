import os
import json
import time
import requests
from bs4 import BeautifulSoup
from datetime import datetime

SCHOLAR_ID = os.environ["GOOGLE_SCHOLAR_ID"]

url = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"

headers = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}

citation_count = None

for attempt in range(3):
    try:
        print(f"Fetching Google Scholar profile, attempt {attempt + 1}...")

        response = requests.get(
            url,
            headers=headers,
            timeout=20
        )

        print(f"HTTP status: {response.status_code}")

        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")

        rows = soup.select("#gsc_rsb_st tr")

        for row in rows:
            cells = row.find_all(["td", "th"])

            if len(cells) >= 2:
                label = cells[0].get_text(strip=True)

                if label == "Citations":
                    citation_text = cells[1].get_text(strip=True)
                    citation_count = int(citation_text.replace(",", ""))
                    break

        if citation_count is not None:
            break

        print("Citation count was not found on the page.")

    except Exception as e:
        print(f"Attempt {attempt + 1} failed: {e}")

    time.sleep(5)

if citation_count is None:
    raise RuntimeError(
        "Failed to retrieve citation count from Google Scholar."
    )

print(f"Citation count: {citation_count}")

os.makedirs("results", exist_ok=True)

data = {
    "scholar_id": SCHOLAR_ID,
    "citedby": citation_count,
    "updated": str(datetime.now())
}

with open("results/gs_data.json", "w", encoding="utf-8") as outfile:
    json.dump(
        data,
        outfile,
        ensure_ascii=False,
        indent=2
    )

shieldio_data = {
    "schemaVersion": 1,
    "label": "citations",
    "message": str(citation_count),
}

with open(
    "results/gs_data_shieldsio.json",
    "w",
    encoding="utf-8"
) as outfile:
    json.dump(
        shieldio_data,
        outfile,
        ensure_ascii=False,
        indent=2
    )

print("Citation data generated successfully.")