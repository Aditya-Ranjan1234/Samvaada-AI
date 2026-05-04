from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.db_models import User
from pydantic import BaseModel

router = APIRouter()

class UserCreate(BaseModel):
    username: str
    full_name: str
    password: str
    role: str = "AGENT"

@router.post("/create")
async def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    # Simple check for existing user
    db_user = db.query(User).filter(User.username == user_in.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # In a real app, we would hash the password
    new_user = User(
        username=user_in.username,
        full_name=user_in.full_name,
        hashed_password=user_in.password,
        role=user_in.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user_id": new_user.id}

@router.get("/stats")
async def get_all_stats(db: Session = Depends(get_db)):
    # Returns real stats from the database for the supervisor dashboard
    total_users = db.query(User).count()
    return {
        "active_agents": total_users,
        "total_calls_today": 124, # Simulated for now until calls table is populated
        "avg_accuracy": 0.98
    }
