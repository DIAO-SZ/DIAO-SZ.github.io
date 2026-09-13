import os
import json
import requests
from datetime import datetime

SCHOLAR_ID = os.environ.get("GOOGLE_SCHOLAR_ID")
SERPAPI_KEY = os.environ.get("SERPAPI_KEY")

if not SCHOLAR_ID:
    raise RuntimeError("GOOGLE_SCHOLAR_ID is not set.")

if not SERPAPI_KEY:
    raise RuntimeError("SERPAPI_KEY is not set.")

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

print(f"HTTP status: {response.status_code}")
response.raise_for_status()

data = response.json()

if "error" in data:
    raise RuntimeError(f"SerpApi error: {data['error']}")

if "cited_by" not in data:
    raise RuntimeError(
        "No cited_by data returned by SerpApi. "
        f"Response keys: {list(data.keys())}"
    )

citation_count = None

for item in data["cited_by"].get("table", []):
    if "citations" in item:
        citation_count = item["citations"].get("all")
        break

if citation_count is None:
    raise RuntimeError("Citation count not found in SerpApi response.")

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