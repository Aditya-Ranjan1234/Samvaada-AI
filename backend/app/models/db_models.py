from sqlalchemy import create_all, Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Float, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import datetime

Base = declarative_base()

class Call(Base):
    __tablename__ = "calls"
    call_id = Column(String, primary_key=True)
    phone_number = Column(String)
    call_timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String) # ACTIVE/COMPLETED/FAILED
    language = Column(String)
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Transcript(Base):
    __tablename__ = "call_transcripts"
    transcript_id = Column(Integer, primary_key=True, autoincrement=True)
    call_id = Column(String, ForeignKey("calls.call_id"))
    speaker = Column(String) # CALLER/AGENT/SYSTEM
    text = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    confidence = Column(Float)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    role = Column(String, default="AGENT") # AGENT, SUPERVISOR, ADMIN
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AgentStats(Base):
    __tablename__ = "agent_stats"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_calls = Column(Integer, default=0)
    avg_handling_time = Column(Float, default=0.0) # in seconds
    last_active = Column(DateTime, default=datetime.datetime.utcnow)
