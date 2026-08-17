import uuid
from datetime import datetime
from sqlalchemy import String, ForeignKey, Float, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from packages.database.base import Base

class Farm(Base):
    __tablename__ = "farms"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=True) # Point string representation
    total_area_ha: Mapped[float] = mapped_column(Float, nullable=False)
    soil_type: Mapped[str] = mapped_column(String(100), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

class Field(Base):
    __tablename__ = "fields"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    farm_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("farms.id"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    boundary: Mapped[str] = mapped_column(String, nullable=True) # Polygon string
    area_ha: Mapped[float] = mapped_column(Float, nullable=False)
    current_crop: Mapped[str] = mapped_column(String(100), nullable=True)
    planting_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    expected_harvest_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
