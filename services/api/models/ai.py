from sqlalchemy import Column, String, ForeignKey, Text
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String)

class Message(Base):
    __tablename__ = "messages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id"))
    content = Column(Text)
    role = Column(String)

class AIReasoningLog(Base):
    __tablename__ = "ai_reasoning_logs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    message_id = Column(UUID(as_uuid=True), ForeignKey("messages.id"))
    trace = Column(Text)

class DiseaseEvent(Base):
    __tablename__ = "disease_events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id"))
    disease_type = Column(String)
