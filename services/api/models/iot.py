from sqlalchemy import Column, String, ForeignKey, Float, DateTime
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class IoTDevice(Base):
    __tablename__ = "iot_devices"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id"))
    device_type = Column(String)

class SensorReading(Base):
    __tablename__ = "sensor_readings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    device_id = Column(UUID(as_uuid=True), ForeignKey("iot_devices.id"))
    timestamp = Column(DateTime)
    value = Column(Float)
