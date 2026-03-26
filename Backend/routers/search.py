from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.search_service import fetch_openalex_data, fetch_openalex_advanced, fetch_author_works

router = APIRouter()

class SearchCriterion(BaseModel):
    searchBy: str
    value: str
    operator: str = "-"

class AdvancedSearchRequest(BaseModel):
    criteria: List[SearchCriterion]
    primaryQuery: str
    page: Optional[int] = 1
    perPage: Optional[int] = 20

@router.get("/researcher/{name}")
async def get_researcher(name: str, search_by: str = "author", page: int = 1, per_page: int = 20):
    """Simple search by single criterion (author, domain, country, lab)"""
    results = await fetch_openalex_data(name, search_by, page, per_page)
    return results

@router.get("/researcher/{author_id}/works")
async def get_author_works(author_id: str):
    """Fetch all works for a specific author"""
    results = await fetch_author_works(author_id)
    return results

@router.post("/researcher/search/advanced")
async def advanced_search(request: AdvancedSearchRequest):
    """Advanced search with multiple criteria and operators"""
    if not request.criteria:
        raise HTTPException(status_code=400, detail="No search criteria provided")
    
    # Filter out empty criteria
    valid_criteria = [c for c in request.criteria if c.value.strip()]
    
    if not valid_criteria:
        raise HTTPException(status_code=400, detail="No valid search criteria")
    
    page = request.page or 1
    per_page = request.perPage or 20
    
    results = await fetch_openalex_advanced(valid_criteria, page, per_page)
    return results