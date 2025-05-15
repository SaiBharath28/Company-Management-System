from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to the Company Management API"}

# Database connection
def get_db_connection():
    conn = sqlite3.connect('companies.db')
    conn.row_factory = sqlite3.Row
    return conn

# Pydantic model for Company
class Company(BaseModel):
    name: str
    location: str

# Create database tables on startup
@app.on_event("startup")
def startup():
    conn = get_db_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

# API Endpoints
@app.post("/companies/", response_model=Company)
def create_company(company: Company):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO companies (name, location) VALUES (?, ?)",
        (company.name, company.location)
    )
    conn.commit()
    company_id = cursor.lastrowid
    conn.close()
    return {**company.dict(), "id": company_id}

@app.get("/companies/", response_model=List[Company])
def read_companies():
    conn = get_db_connection()
    companies = conn.execute("SELECT id, name, location FROM companies").fetchall()
    conn.close()
    return [dict(company) for company in companies]

@app.get("/companies/{company_id}", response_model=Company)
def read_company(company_id: int):
    conn = get_db_connection()
    company = conn.execute(
        "SELECT id, name, location FROM companies WHERE id = ?", 
        (company_id,)
    ).fetchone()
    conn.close()
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return dict(company)

@app.put("/companies/{company_id}", response_model=Company)
def update_company(company_id: int, company: Company):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE companies SET name = ?, location = ? WHERE id = ?",
        (company.name, company.location, company_id)
    )
    conn.commit()
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Company not found")
    conn.close()
    return {**company.dict(), "id": company_id}

@app.delete("/companies/{company_id}")
def delete_company(company_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM companies WHERE id = ?", (company_id,))
    conn.commit()
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Company not found")
    conn.close()
    return {"message": "Company deleted successfully"}