from pydantic import BaseModel

class ListingCreate(BaseModel):
    title: str
    price: float
    description: str

class ListingResponse(ListingCreate):
    id: str
    seller_id: str
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    listing_id: str
    quantity: int

class OrderResponse(OrderCreate):
    id: str
    buyer_id: str
    status: str
    class Config:
        from_attributes = True
