from fastapi import FastAPI, UploadFile, File
from routers.search import router as search_router 
from services import fetch_openalex_data

app = FastAPI()

app.include_router(search_router, prefix="/api")

@app.get("/analyze/openalex")
async def analyze_online(name: str):
    data = await fetch_openalex_data(name)
    return {"source": "OpenAlex", "results": data}