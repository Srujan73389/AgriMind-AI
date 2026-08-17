from sqlalchemy import Column, String, ForeignKey, Float
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class MarketplaceListing(Base):
    __tablename__ = "marketplace_listings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String)
    price = Column(Float)

class MarketplaceOrder(Base):
    __tablename__ = "marketplace_orders"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("marketplace_listings.id"))
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(String)
