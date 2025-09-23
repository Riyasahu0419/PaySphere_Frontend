# PaySphere

## 🏫 School Payments & Dashboard Application

A full-stack project for managing **School Payments and Transactions** with:

- **Backend**: Node.js (Express) + MongoDB Atlas + JWT Authentication  
- **Frontend**: React (Vite) + TailwindCSS + Axios + React Router  
- **Hosting**: Backend (Heroku/Render/AWS), Frontend (Netlify/Vercel)  

It integrates with a **Payment Gateway API**, provides **REST APIs**, and a **dashboard interface** to view/manage transactions.

---

## 🌐 Demo

- **Live Demo**: [https://pay-sphere-frontend.vercel.app/](https://pay-sphere-frontend.vercel.app/)
- **Frontend Repository**: [PaySphere_Frontend](https://github.com/Riyasahu0419/PaySphere_Frontend)
- **Backend Repository**: [PaySphere_Backend](https://github.com/Riyasahu0419/PaySphere_Backend)

---

## 📂 Project Structure

## 📂 Project Structure
```
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
```




## ⚙️ Backend Features
```
- JWT Authentication for users
- MongoDB Atlas with Schemas:
  - **Order Schema**
  - **Order Status Schema**
  - **Webhook Logs Schema**
  - **User Schema**
- REST APIs for transactions
- Payment Gateway Integration
- Webhook Support
- Pagination, Sorting & Filtering
- Error handling & Validation

---

## 🔧 Setup & Installation (Backend)

### Environment Variables (`.env`)
```env
MONGO_URL=mongodb+srv://username:password@cluster0.mongodb.net/database_name
PORT=8000
JWT_SECRET=your_secret_key
PG_KEY=your_pg_key
PAYMENT_API_KEY=your_payment_api_key
SCHOOL_ID=65xxxxxxxxxxxxxxxxx



```

## Installation

# Clone repository
```
git clone https://github.com/Riyasahu0419/PaySphere_Backend.git
cd PaySphere_Backend
```
# Install dependencies
```
npm install
```
# Run in development
```
npm run dev
```
# Run in production
```
npm start
```

## API Endpoints
### Authentication
```

POST   /auth/register       → Register new user
POST   /auth/login          → User login


```
## Payment
```
POST   /payment/create-payment   → Create a payment order (returns redirect URL & order_id)
```
## Transactions
```
GET    /transactions            → Get all transactions (pagination & sorting supported)
GET    /transactions/school/:schoolId   → Get all transactions for a specific school
GET    /transactions/transaction-status/:custom_order_id   → Get status of a specific transaction
```
## Webhook
```
POST   /webhook                 → Payment gateway webhook (updates order status)
```





