from fastapi import APIRouter
from services.search_service import fetch_openalex_data

router = APIRouter()

@router.get("/researcher/{name}")
async def get_researcher(name: str):
    results = await fetch_openalex_data(name)
    return results