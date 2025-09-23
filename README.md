# PaySphere_Frontend
 # 🏫 School Payments & Dashboard Application

A full-stack project for managing **School Payments and Transactions** with:

- **Backend**: Node.js (NestJS/Express) + MongoDB Atlas + JWT Authentication  
- **Frontend**: React (Vite) + TailwindCSS + Axios + React Router  
- **Hosting**: Backend (Heroku/Render/AWS), Frontend (Netlify/Vercel)  

It integrates with a **Payment Gateway API**, provides **REST APIs**, and a **dashboard interface** to view/manage transactions.

---
## Demo

- **Live Demo**: [[https://pay-sphere-frontend.vercel.app/](https://pay-sphere-frontend.vercel.app/)]
- **GitHub Repository (Frontend)**: [[https://github.com/Riyasahu0419/PaySphere_Frontend](https://github.com/Riyasahu0419/PaySphere_Frontend)]
- **GitHub Repository (Backend)**: [[https://github.com/Riyasahu0419/PaySphere_Backend](https://github.com/Riyasahu0419/PaySphere_Backend)]

## 📂 Project Structure

school-payments-app/
│── backend/ # Backend microservice
│ ├── server.js
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── .env.example
│
│── frontend/ # React frontend
│ ├── src/
│ │ ├── App.jsx
│ │ ├── pages/
│ │ ├── components/
│ │ └── hooks/
│ └── .env.example
│
│── README.md # Documentation

---

# ⚙️ Backend Service

## 🚀 Features
- JWT Authentication for users
- MongoDB Atlas with Schemas:
  - Order Schema
  - Order Status Schema
  - Webhook Logs Schema
  - User Schema
- REST APIs for transactions
- Payment Gateway Integration
- Webhook Support
- Pagination, Sorting & Filtering
- Error handling & Validation

---

## 🛠️  Instructions (Backend)
### Set up environment variables:
```
MONGO_URL=mongodb+srv://username:password@cluster0.sample.mongodb.net/database_name
PORT=8000
JWT_SECRET=xxxxxxxxxxx
PG_KEY=xxxxxxxxxxx
PAYMENT_API_KEY=xxxxxxxxxxxxxxxx
SCHOOL_ID=65xxxxxxxxxxxxxxxxx


```

## Installation

1. Clone the repository: (Backend)
```bash
git clone https://github.com/Riyasahu0419/PaySphere_Backend.git
cd PaySphere_Backend
npm install

npm start  # NestJS
# or
npm run dev         # Express

```
## API Endpoints
### Authentication
```

POST /auth/register -user regiater
POST /auth/login - user Login 

```
## Products
```
GET /api/products - Get all products
GET /api/products/:category - Get products by category
GET /api/products/:id - Get specific product details
```



