# Club Cuervos - Payments & Administration Dashboard 🏀

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📌 Overview
A full-stack web application engineered to streamline administrative operations, automate financial tracking, and monitor the operational health of **Club Cuervos Tuxtla**. The system provides real-time insights into active athletes, monthly revenue projections, and automated debtor detection through a robust backend architecture.

## 🚀 Tech Stack

### Backend
* **Framework:** FastAPI (Python)
* **ORM:** SQLModel / SQLAlchemy
* **Database:** PostgreSQL
* **Architecture:** Modular routing, dependency injection (`SessionDep`), and asynchronous endpoints.

### Frontend
* **Library:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Architecture:** Clean separation of concerns with a dedicated API service layer (`fetch`/promises) and custom hooks for state management.

## ✨ Key Features

* **Real-Time Financial Dashboard:** Calculates active athletes, total monthly collections, and projected revenue vs. actual revenue.
* **Dynamic Debt Calculation:** Utilizes SQL subqueries (`.notin_`) to cross-reference the `Athlete` and `Payment` tables, automatically identifying members with pending dues for the current operational month.
* **Safe State Management:** Frontend built with secure progress bar rendering (avoiding zero-division errors) and optimized `useEffect` data fetching.
* **Modern UI/UX:** Dark-themed administrative interface tailored for quick operational reads.

## ⚙️ Local Development Setup

This project uses **Docker** to provide a frictionless local development environment. There is no need to manually install Python or PostgreSQL on your machine.

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/cuervos-payments.git](https://github.com/your-username/cuervos-payments.git)
cd cuervos-payments
```

### 2. Environment Variables
*Create a `.env` file in the root directory of the project. (Docker Compose will use this to configure the database and backend):*
```text
DATABASE_URL=postgresql://user:password@db:5432/cuervos_db
```
*(Note: If your docker-compose maps the database host differently, ensure the URL matches your service name, e.g., `@db` instead of `@localhost`).*

### 3. Spin up the containers
```bash
docker-compose up -d --build
```
*The API will be automatically available at `http://127.0.0.1:8000`. Access the interactive Swagger UI at `/docs`.*

### 4. Frontend Setup (React/Vite)
*(If the frontend is not containerized in your docker-compose, run it locally):*
```bash
cd frontend
npm install
npm run dev
```
*Ensure the `BASE_URL` in `src/api/config.js` is pointed to `http://127.0.0.1:8000`.*

## 🔮 Future Roadmap (v2.0)
* **Historical Debt Engine:** Refactoring the database schema to implement `enrollment_date` and `billing_start_date`, enabling absolute mathematical calculations for accumulated historical debt without requiring retroactive data entry.
* **Cloud Deployment:** Migration to a serverless architecture using Render (Backend), Supabase (PostgreSQL), and Vercel (Frontend).
* **Responsive Design:** Create a responsive UI/UX design for administrators and coaches to manage the club on the go. 

## 👨‍💻 Author
**Daniel Horacio Nanguyasmú Mejía**  
Computer Systems Engineering Student @ TecNM Campus Tuxtla Gutiérrez
