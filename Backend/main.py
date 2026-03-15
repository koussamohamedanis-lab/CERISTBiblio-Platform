from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from routers.search import router as search_router 
from services.search_service import fetch_openalex_data

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router, prefix="/api")

@app.get("/analyze/openalex")
async def analyze_online(name: str, search_by: str = "author"):
    data = await fetch_openalex_data(name, search_by)
    return {"source": "OpenAlex", "results": data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)