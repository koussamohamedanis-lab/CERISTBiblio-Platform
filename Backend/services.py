import requests
import pandas as pd
import io

def fetch_openalex(query:str):
    url = f"https://api.openalex.org/authors?filter=last_known_institution.country_code:dz,display_name.search:{query}"
    response=requests.get(url)
    if response.status_code == 200:
        return response.json().get("results",[])
    return[]

def process_csv_stats(file_content):
    df = pd.read_csv_stats(file_content)
    df.columns = [c.lower() for c in df.columns]
    stats = {
        "publications": len(df),
        "citations": df['citations'].sum() if 'citations' in df.columns else 0,
        "h_index": calculate_h_index(df['citations'].tolist()) if 'citations' in df.columns else 0
    }
    return stats

def calculate_h_index(citations):
    citations.sort(reverse=True)
    h=0
    for i,c in enumerate(citations):
        if c>=i+1:
            h=i+1
        else: break
    return h    
