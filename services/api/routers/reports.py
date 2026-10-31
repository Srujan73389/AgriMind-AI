from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

REPORTS_STORE = [
    {
        "id": "rep-101",
        "title": "Gadihalli Soil Health Card Certificate (NPK Lab Audit)",
        "category": "Soil Health",
        "date": "Aug 08, 2026",
        "farm_plot": "Paddy & Ragi Plot A1",
        "location": "Gadihalli, Ajjampura Tq, Chikkamagaluru KA",
        "issued_by": "District Soil Testing Lab & AgriMind AI",
        "file_size": "2.4 MB PDF",
        "status": "Lab Verified",
        "summary": "Complete N-P-K soil analysis, pH 6.8 rating, organic carbon content (0.72%), and recommended micronutrient dosage."
    },
    {
        "id": "rep-102",
        "title": "Kisan Credit Card (KCC) Bank Loan Yield Potential Certificate",
        "category": "Bank Loan (KCC)",
        "date": "Aug 05, 2026",
        "farm_plot": "All Active Plots (13.7 Acres)",
        "location": "Chikkamagaluru District, KA",
        "issued_by": "Canara Bank / SBI Agri Loan Board",
        "file_size": "3.1 MB PDF",
        "status": "Bank Ready",
        "summary": "Certified crop yield forecast (24.5 qtl/acre) and land asset evaluation required for ₹1.6 Lakh collateral-free credit."
    },
    {
        "id": "rep-103",
        "title": "PM Fasal Bima Yojana Crop Insurance Claim Audit",
        "category": "Crop Insurance",
        "date": "Jul 28, 2026",
        "farm_plot": "Groundnut Plot B2",
        "location": "Ajjampura, Chikkamagaluru KA",
        "issued_by": "Agriculture Department, Govt of Karnataka",
        "file_size": "1.8 MB PDF",
        "status": "Official Record",
        "summary": "Sentinel-2 satellite NDWI moisture stress proof verifying drought impact for instant DBT insurance payout."
    }
]

@router.get("/")
async def list_reports():
    return REPORTS_STORE

@router.post("/generate")
async def generate_report(data: Dict[str, Any]):
    new_report = {
        "id": f"rep-{len(REPORTS_STORE) + 101}",
        "title": data.get("title", "Custom Farm Performance Report"),
        "category": data.get("category", "Soil Health"),
        "date": "Today",
        "farm_plot": data.get("farmPlot", "Gadihalli Plot A1"),
        "location": "Gadihalli, Ajjampura Tq, Chikkamagaluru KA",
        "issued_by": "AgriMind Multi-Agent Certification Engine",
        "file_size": "2.1 MB PDF",
        "status": "Lab Verified",
        "summary": "Generated official agricultural performance report with live telemetry."
    }
    REPORTS_STORE.insert(0, new_report)
    return new_report

@router.get("/{id}/download")
async def download_report(id: str):
    return {
        "id": id,
        "download_url": f"/api/reports/{id}/pdf",
        "status": "ready"
    }
