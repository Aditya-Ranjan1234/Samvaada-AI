from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://samvaada_user:samvaada_password@localhost:5432/samvaada_db"
    POSTGRES_URL: str | None = None
    
    @property
    def get_db_url(self):
        return self.POSTGRES_URL or self.DATABASE_URL
    REDIS_URL: str = "redis://localhost:6379/0"
    KAFKA_BOOTSTRAP_SERVERS: str = "localhost:9092"
    
    SECRET_KEY: str = "supersecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    # Supabase Specific Keys
    SUPABASE_URL: str | None = None
    SUPABASE_ANON_KEY: str | None = None
    SUPABASE_SERVICE_ROLE_KEY: str | None = None
    SUPABASE_JWT_SECRET: str | None = None

    class Config:
        env_file = ".env"

settings = Settings()
