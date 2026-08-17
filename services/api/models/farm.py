from sqlalchemy import Column, String, ForeignKey, Float
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Farm(Base):
    __tablename__ = "farms"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    name = Column(String)
    location_lat = Column(Float)
    location_lng = Column(Float)

class Field(Base):
    __tablename__ = "fields"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id"))
    name = Column(String)
