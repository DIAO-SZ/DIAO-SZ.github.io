import os
import json
import requests
from datetime import datetime

SCHOLAR_ID = os.environ["GOOGLE_SCHOLAR_ID"]
SERPAPI_KEY = os.environ["SERPAPI_KEY"]

url = "https://serpapi.com/search.json"

params = {
    "engine": "google_scholar_author",
    "author_id": SCHOLAR_ID,
    "hl": "en",
    "api_key": SERPAPI_KEY,
}

print("Fetching Google Scholar citation data via SerpApi...")

response = requests.get(
    url,
    params=params,
    timeout=30
)

response.raise_for_status()

data = response.json()

citation_count = None

for item in data["cited_by"]["table"]:
    if "citations" in item:
        citation_count = item["citations"]["all"]
        break

if citation_count is None:
    raise RuntimeError("Citation count not found.")

print(f"Citation count: {citation_count}")

os.makedirs("results", exist_ok=True)

author_data = {
    "scholar_id": SCHOLAR_ID,
    "citedby": citation_count,
    "updated": str(datetime.now())
}

with open(
    "results/gs_data.json",
    "w",
    encoding="utf-8"
) as outfile:
    json.dump(
        author_data,
        outfile,
        ensure_ascii=False,
        indent=2
    )

shieldio_data = {
    "schemaVersion": 1,
    "label": "citations",
    "message": str(citation_count)
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