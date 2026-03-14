import httpx
import csv
import io

async def fetch_openalex_data(name :str):
    url = f"https://api.openalex.org/authors?filter=display_name.search:{name}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code == 200:
            data = response.json()
            return {
                "count": data['meta']['count'],
                "results": data['results'][:5]#5 les resultat lwlin
            }
        return {"error": "imposible de contacter OpenAlex"}


def process_csv_stats(file_contents: bytes):
    """Process CSV file and return statistics"""
    try:
        csv_text = file_contents.decode('utf-8')
        csv_reader = csv.DictReader(io.StringIO(csv_text))
        
        rows = list(csv_reader)
        if not rows:
            return {"error": "Empty CSV file"}
        
        return {
            "total_rows": len(rows),
            "columns": list(rows[0].keys()) if rows else [],
            "first_row": rows[0] if rows else None
        }
    except Exception as e:
        return {"error": str(e)}