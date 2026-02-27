from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Platforme Bibliométrique Algérienne en ligne"}

@app.get("/stats/{researcher_name}")
def get_researcher_stats(researcher_name: str):
    # This is where you will call OpenAlex later!
    return {
        "name": researcher_name,
        "publications": 15,
        "h_index": 4
    }