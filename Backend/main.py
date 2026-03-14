from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from routers.search import router as search_router 
from services import fetch_openalex_data

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Autorise le frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router, prefix="/api")

@app.get("/analyze/openalex")
async def analyze_online(name: str):
    data = await fetch_openalex_data(name)
    return {"source": "OpenAlex", "results": data}