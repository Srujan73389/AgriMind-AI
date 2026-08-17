from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
async def generate_report():
    return {"status": "generating"}

@router.get("/{id}/download")
async def download_report(id: str):
    return {"url": f"https://reports.url/{id}.pdf"}
