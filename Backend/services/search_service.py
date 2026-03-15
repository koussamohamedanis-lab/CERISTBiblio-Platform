import httpx
import csv
import io
from urllib.parse import quote

async def fetch_openalex_data(name: str, search_by: str = "author"):
    """Fetch OpenAlex data by single criterion (supports author, domain, country, lab)"""
    if not name or not name.strip():
        return {"error": "Search term cannot be empty", "results": []}
    
    # Build filter based on search type
    name = name.strip()
    
    if search_by == "author":
        filter_str = f"display_name.search:{quote(name)}"
    elif search_by == "domain":
        filter_str = f"topics.id:{quote(name)}"
    elif search_by == "country":
        # Country codes should be uppercase
        filter_str = f"last_known_institutions.country_code:{name.upper()}"
    elif search_by == "lab":
        filter_str = f"last_known_institutions.display_name.search:{quote(name)}"
    else:
        filter_str = f"display_name:{quote(name)}"
    
    url = f"https://api.openalex.org/authors?filter={filter_str}&per-page=25"
    
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url)
            if response.status_code == 200:
                data = response.json()
                return {
                    "count": data['meta']['count'],
                    "results": data['results'][:5],  # Top 5 results
                    "query": filter_str
                }
            return {"error": f"OpenAlex returned status {response.status_code}", "results": []}
    except httpx.RequestError as e:
        return {"error": f"Connection error: {str(e)}", "results": []}
    except Exception as e:
        return {"error": f"Error: {str(e)}", "results": []}


async def fetch_openalex_advanced(criteria_list: list):
    """Fetch OpenAlex data with multiple criteria and operators (OR/AND)"""
    if not criteria_list:
        return {"error": "No criteria provided", "results": []}
    
    # Build filters respecting operators: OR (|) and AND (,)
    filters_str = None
    
    for criterion in criteria_list:
        value = criterion.value.strip() if hasattr(criterion, 'value') else criterion.get('value', '').strip()
        
        if not value:
            continue
        
        search_by = criterion.searchBy if hasattr(criterion, 'searchBy') else criterion.get('searchBy', 'author')
        operator = criterion.operator if hasattr(criterion, 'operator') else criterion.get('operator', '-')
        operator = operator.lower().strip() if operator else '-'
        
        print(f"DEBUG: Processing criterion - searchBy: {search_by}, value: {value}, operator: {operator}")
        
        # Build individual filter using valid OpenAlex field names
        if search_by == 'author':
            # Use display_name.search filter for author
            f_str = f"display_name.search:{quote(value)}"
        elif search_by == 'domain':
            # Domain filters require valid OpenAlex concept IDs (e.g., C39432304 for AI)
            # Skip if it doesn't look like a concept ID (must start with C)
            if not value.upper().startswith('C'):
                print(f"DEBUG: Skipping domain '{value}' - not a valid OpenAlex concept ID (must start with C)")
                continue
            # Use x_concepts.id which represents the research domain of authors
            f_str = f"x_concepts.id:{value}"
        elif search_by == 'country':
            f_str = f"last_known_institutions.country_code:{value.upper()}"
        elif search_by == 'lab':
            f_str = f"last_known_institutions.display_name.search:{quote(value)}"
        else:
            f_str = f"display_name.search:{quote(value)}"
        
        print(f"DEBUG: Built filter: {f_str}")
        
        # Combine with previous filters using the operator
        if filters_str is None:
            filters_str = f_str
        else:
            # Use operator from current criterion
            if operator in ['and', ',']:
                filters_str = f"{filters_str},{f_str}"
            else:  # Default to OR for unknown operators or 'or'
                filters_str = f"{filters_str}|{f_str}"
    
    if not filters_str:
        return {"error": "No valid search criteria. For Domain/Field search, use valid OpenAlex topic IDs starting with 'C' (e.g., C39432304 for AI)", "results": []}
    
    url = f"https://api.openalex.org/authors?filter={filters_str}&per-page=25"
    print(f"DEBUG: Final OpenAlex URL: {url}")
    
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(url)
            print(f"DEBUG: OpenAlex response status: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                print(f"DEBUG: OpenAlex data count: {data['meta']['count']}")
                print(f"DEBUG: OpenAlex results count: {len(data['results'])}")
                return {
                    "count": data['meta']['count'],
                    "results": data['results'][:10],
                    "query": filters_str
                }
            else:
                print(f"DEBUG: OpenAlex error response: {response.text}")
            return {"error": f"OpenAlex returned status {response.status_code}", "results": []}
    except httpx.RequestError as e:
        print(f"DEBUG: Request error: {str(e)}")
        return {"error": f"Connection error: {str(e)}", "results": []}
    except Exception as e:
        print(f"DEBUG: Exception error: {str(e)}")
        return {"error": f"Error: {str(e)}", "results": []}

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