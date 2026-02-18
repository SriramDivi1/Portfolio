from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

load_dotenv()

# Validate required env vars at startup
mongo_url = os.environ.get("MONGO_URL")
db_name = os.environ.get("DB_NAME")
if not mongo_url or not db_name:
    raise ValueError(
        "Missing required environment variables: MONGO_URL and DB_NAME must be set. "
        "Create a .env file with MONGO_URL and DB_NAME."
    )

app = FastAPI(title="Sriram Divi Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection (env validated above)
client = MongoClient(mongo_url)
db = client[db_name]
contacts_collection = db["contacts"]

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: str
    status: str

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "message": "Portfolio API is running"}

@app.post("/api/contact", response_model=ContactResponse)
def submit_contact(contact: ContactForm):
    contact_doc = {
        "name": contact.name,
        "email": contact.email,
        "subject": contact.subject,
        "message": contact.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "new"
    }
    
    result = contacts_collection.insert_one(contact_doc)
    
    return ContactResponse(
        id=str(result.inserted_id),
        name=contact.name,
        email=contact.email,
        subject=contact.subject,
        message=contact.message,
        created_at=contact_doc["created_at"],
        status="new"
    )

@app.get("/api/contacts")
def get_contacts():
    contacts = list(contacts_collection.find({}, {"_id": 0}))
    return {"contacts": contacts}
