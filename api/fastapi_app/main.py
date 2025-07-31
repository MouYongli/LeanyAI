"""
This is a FastAPI application that provides endpoints for service.

Main application with modular router structure:
- MinIO file storage endpoints (/upload/, /download/, etc.)
- Agent service endpoints (/agent/, /agent/plan)
- Example service endpoint (/example/)

http://127.0.0.1:8000/example/
http://127.0.0.1:8000/docs - API documentation
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from example_service import example_hello_world

# Import routers
from .routers import minio, agent

app = FastAPI(
    title="LeanyAI API",
    description="FastAPI application with file storage and AI agent services",
    version="1.0.0",
)

# Enable CORS for front-end requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(minio.router)
app.include_router(agent.router)


@app.get("/", tags=["root"])
def read_root():
    """
    Root endpoint providing basic API information.
    """
    return {
        "message": "Welcome to LeanyAI API",
        "docs": "/docs",
        "version": "1.0.0",
        "services": {
            "files": "File storage and management",
            "agent": "AI task planning and generation"
        }
    }


@app.get("/example/", tags=["example"])
def example_service():
    """
    Example service that returns a simple greeting.
    """
    return example_hello_world()