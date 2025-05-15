# Company Management System

A full-stack application for managing company information with FastAPI backend and React frontend.



---

## 🚀 Features

### 🔧 Backend API
- CRUD operations for company data  
- SQLite database integration  
- FastAPI with automatic docs at `/docs`

### 💻 Frontend
- View all companies in a responsive grid  
- Add/edit company details  
- Delete companies  
- Real-time data updates  
- Error handling and validation

---

## 🛠 Technologies Used

**Backend**: Python 3.7+, FastAPI, SQLite, Pydantic (for data validation)  
**Frontend**: React.js, Fetch API, CSS3 (Flexbox/Grid)

---

## 📦 Installation

### ✅ Prerequisites
- Python 3.7 or above  
- Node.js 14 or above  
- npm or yarn installed

---

### 🐍 Backend Setup

1. Navigate to the backend folder: `cd backend`  
2. Create virtual environment: `python -m venv venv`  
3. Activate virtual environment:  
   - On Windows: `venv\Scripts\activate`  
   - On Mac/Linux: `source venv/bin/activate`  
4. Install dependencies: `pip install -r requirements.txt`  
5. Run the FastAPI server: `uvicorn main:app --reload`

---

### 🌐 Frontend Setup

1. Navigate to the frontend folder: `cd frontend`  
2. Install frontend dependencies: `npm install`  
3. Start the React development server: `npm start`

---

## 📁 Project Structure

```
company-management/
├── backend/
│   ├── main.py             → FastAPI application  
│   ├── requirements.txt    → Python dependencies  
│   └── companies.db        → SQLite database (auto-generated)  
└── frontend/
    ├── public/              → Static files  
    ├── src/
    │   ├── App.js           → Main React component  
    │   ├── App.css          → Styles  
    │   └── index.js         → React entry point  
    └── package.json         → Frontend dependencies  
```

---

## 🔗 API Endpoints

Method — Endpoint — Description  
GET — `/` — API welcome message  
GET — `/companies` — Get all companies  
POST — `/companies` — Create new company  
GET — `/companies/{id}` — Get single company  
PUT — `/companies/{id}` — Update company  
DELETE — `/companies/{id}` — Delete company

---

## ⚙️ Available Scripts (Frontend)

Inside the `frontend` directory, you can run:  
- `npm start` — Runs the app in development mode  
- `npm test` — Launches the test runner  
- `npm run build` — Builds the app for production



