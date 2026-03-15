from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.search_service import fetch_openalex_data, fetch_openalex_advanced

router = APIRouter()

class SearchCriterion(BaseModel):
    searchBy: str
    value: str
    operator: str = "-"

class AdvancedSearchRequest(BaseModel):
    criteria: List[SearchCriterion]
    primaryQuery: str

@router.get("/researcher/{name}")
async def get_researcher(name: str, search_by: str = "author"):
    """Simple search by single criterion (author, domain, country, lab)"""
    results = await fetch_openalex_data(name, search_by)
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
    
    results = await fetch_openalex_advanced(valid_criteria)
    return results