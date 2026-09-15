import json
import os
from datetime import datetime, timezone

import requests


GOOGLE_SCHOLAR_ID = os.environ.get("GOOGLE_SCHOLAR_ID")
SERPAPI_API_KEY = os.environ.get("SERPAPI_API_KEY")


if not GOOGLE_SCHOLAR_ID:
    raise RuntimeError("GOOGLE_SCHOLAR_ID is not set.")

if not SERPAPI_API_KEY:
    raise RuntimeError("SERPAPI_API_KEY is not set.")


url = "https://serpapi.com/search.json"

params = {
    "engine": "google_scholar_author",
    "author_id": GOOGLE_SCHOLAR_ID,
    "hl": "en",
    "sort": "pubdate",
    "api_key": SERPAPI_API_KEY,
}


print("Fetching Google Scholar data via SerpApi...")

response = requests.get(
    url,
    params=params,
    timeout=60
)

print(f"HTTP status: {response.status_code}")

response.raise_for_status()

data = response.json()


if "error" in data:
    raise RuntimeError(
        f"SerpApi error: {data['error']}"
    )


# -------------------------------------------------
# Total citation count
# -------------------------------------------------

total_citations = None

cited_by_table = data.get(
    "cited_by",
    {}
).get(
    "table",
    []
)

for item in cited_by_table:
    citations = item.get("citations")

    if isinstance(citations, dict):
        if "all" in citations:
            total_citations = citations["all"]
            break


if total_citations is None:
    raise RuntimeError(
        "Could not find total citation count "
        "in SerpApi response."
    )


# -------------------------------------------------
# Publications
# -------------------------------------------------

publications = {}

articles = data.get(
    "articles",
    []
)


for article in articles:

    citation_id = article.get(
        "citation_id"
    )

    if not citation_id:
        continue

    cited_by = article.get(
        "cited_by",
        {}
    )

    num_citations = cited_by.get(
        "value",
        0
    )

    publications[citation_id] = {
        "author_pub_id": citation_id,
        "num_citations": num_citations,
        "bib": {
            "title": article.get(
                "title",
                ""
            ),
            "author": article.get(
                "authors",
                ""
            ),
            "pub_year": article.get(
                "year",
                ""
            ),
            "venue": article.get(
                "publication",
                ""
            ),
        }
    }


# -------------------------------------------------
# AcadHomepage-compatible gs_data.json
# -------------------------------------------------

author_data = {
    "name": data.get(
        "author",
        {}
    ).get(
        "name",
        ""
    ),
    "scholar_id": GOOGLE_SCHOLAR_ID,
    "citedby": total_citations,
    "updated": datetime.now(
        timezone.utc
    ).isoformat(),
    "publications": publications
}


os.makedirs(
    "results",
    exist_ok=True
)


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


# -------------------------------------------------
# Shields.io citation badge
# -------------------------------------------------

shieldio_data = {
    "schemaVersion": 1,
    "label": "citations",
    "message": str(
        total_citations
    )
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


print(
    f"Google Scholar ID: "
    f"{GOOGLE_SCHOLAR_ID}"
)

print(
    f"Total citations: "
    f"{total_citations}"
)

print(
    f"Articles fetched: "
    f"{len(articles)}"
)

print(
    "Successfully generated "
    "gs_data.json and "
    "gs_data_shieldsio.json"
)