import uuid

from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Board(Base):
    __tablename__ = "boards"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    columns = relationship("TrelloColumn", back_populates="board", cascade="all, delete-orphan")

class TrelloColumn(Base):
    __tablename__ = "columns"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False)
    order = Column(Integer, nullable=False)
    board_id = Column(String, ForeignKey("boards.id", ondelete="CASCADE"))

    board = relationship("Board", back_populates="columns")
    tasks = relationship("Task", back_populates="column", cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    order = Column(Integer, nullable=False)
    column_id = Column(String, ForeignKey("columns.id", ondelete="CASCADE"))

    column = relationship("TrelloColumn", back_populates="tasks")