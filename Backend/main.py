from fastapi import FastAPI, UploadFile, File
from services import fetch_openalex_data, process_csv_stats

app = FastAPI()


@app.get("/analyze/openalex")
def analyze_online(name: str):
    data = fetch_openalex_data(name)
    return {"source": "OpenAlex", "results": data}


@app.post("/analyze/csv")
async def analyze_file(file: UploadFile = File(...)):
    contents = await file.read()
    stats = process_csv_stats(contents)
    return {"source": "Manual CSV", "results": stats}
