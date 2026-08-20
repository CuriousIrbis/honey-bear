from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from .database import engine, Base, get_db
from . import models

# Автоматически создаем таблицы в Docker при старте приложения
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Honey-Bear Trello API")

# Настраиваем CORS для связи с React (порт 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Валидация входящих данных через Pydantic (аналог TypeScript интерфейсов)
class BoardCreate(BaseModel):
    title: str

class BoardResponse(BaseModel):
    id: str
    title: str

    class Config:
        from_attributes = True

# Роут проверки связи
@app.get("/api/health")
def health_check():
    return {"status": "OK", "message": "Python FastAPI is running perfectly!"}

# Получить все доски
@app.get("/api/boards", response_model=List[BoardResponse])
def get_boards(db: Session = Depends(get_db)):
    return db.query(models.Board).all()

# Создать новую доску
@app.post("/api/boards", response_model=BoardResponse, status_code=status.HTTP_201_CREATED)
def create_board(board_data: BoardCreate, db: Session = Depends(get_db)):
    if not board_data.title.strip():
        raise HTTPException(status_code=400, detail="Название доски обязательно")
    
    new_board = models.Board(title=board_data.title.strip())
    db.add(new_board)
    db.commit()
    db.refresh(new_board)
    return new_board
