from sqlalchemy import Column, String, ForeignKey, Text
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class CommunityPost(Base):
    __tablename__ = "community_posts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String)
    content = Column(Text)

class CommunityComment(Base):
    __tablename__ = "community_comments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(UUID(as_uuid=True), ForeignKey("community_posts.id"))
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    content = Column(Text)
