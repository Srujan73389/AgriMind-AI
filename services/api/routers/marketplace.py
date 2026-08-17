from fastapi import APIRouter
from ..schemas.marketplace import ListingCreate, ListingResponse, OrderCreate, OrderResponse

router = APIRouter()

@router.post("/listings", response_model=ListingResponse)
async def create_listing(listing: ListingCreate):
    return ListingResponse(id="list1", seller_id="123", **listing.model_dump())

@router.post("/orders", response_model=OrderResponse)
async def create_order(order: OrderCreate):
    return OrderResponse(id="ord1", buyer_id="123", status="pending", **order.model_dump())
