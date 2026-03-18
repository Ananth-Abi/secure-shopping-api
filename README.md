# 🛒 Secure Shopping API

A full stack e-commerce application built with WSO2 open-source products, demonstrating enterprise API management, OAuth 2.0 security, and modern web development.

---

## 🏗️ Architecture

```
React Frontend (localhost:5173)
        ↓ login request
Express Backend (localhost:3001) ──→ WSO2 API Manager ──→ WSO2 oauth2/token
        ↓ JWT token returned
React Frontend
        ↓ GET /products + Bearer token
WSO2 API Manager Gateway (localhost:8280)
        ↓ validates token
Express Backend (localhost:3001)
        ↓ SQL query
MySQL Database (shopping_db)
        ↑ product data returned
React Frontend displays product cards
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Axios |
| API Gateway | WSO2 API Manager 4.6.0 |
| Identity | WSO2 Identity Server 7.2.0 |
| Backend | Node.js, Express.js |
| Database | MySQL (via XAMPP) |
| Auth | OAuth 2.0, JWT Tokens |

---

## 🔑 Key Features

- **OAuth 2.0 login flow** — React app gets JWT token from WSO2 via Express proxy
- **API Gateway security** — every request validated at WSO2 gateway
- **401 Unauthorized** — requests without a valid token are blocked at the gateway
- **Real MySQL database** — product data stored and queried from MySQL
- **Product catalog** — browse Laptop, Phone, Headset, Keyboard, Monitor
- **Search** — filter products by name in real time
- **Logout** — clears token and redirects to login
- **Rate limiting** — throttling policies applied at gateway level
- **Developer Portal** — API subscription management via WSO2

---

## 📡 API Endpoints

### Express Backend (port 3001)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/login` | Get OAuth2 token from WSO2 |
| GET | `/products` | Get all products from MySQL |
| GET | `/products/:id` | Get single product |
| POST | `/products` | Add new product |
| DELETE | `/products/:id` | Delete product |

### WSO2 Gateway (port 8280)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/shop/1.0/products` | Secured — get all products |
| GET | `/shop/1.0/products/{id}` | Secured — get product by ID |

---

## 🚀 How to Run

### Prerequisites
- Java JDK 17
- Node.js v18+
- XAMPP (MySQL)
- WSO2 API Manager 4.6.0
- WSO2 Identity Server 7.2.0

### Step 1 — Start XAMPP MySQL
Open XAMPP Control Panel → Start **MySQL**

### Step 2 — Start WSO2 Identity Server
```bash
cd wso2is-7.2.0/bin
./wso2server.bat
```
Wait for: `WSO2 Carbon started`

### Step 3 — Start WSO2 API Manager
```bash
cd wso2am-4.6.0/bin
./api-manager.bat
```
Wait for: `WSO2 Carbon started`

### Step 4 — Start Express Backend
```bash
cd express-backend
node server.js
```

### Step 5 — Start React Frontend
```bash
cd frontend
npm run dev
```

### Step 6 — Open the App
Go to `http://localhost:5173` and login with `admin / admin`

---

## 📁 Project Structure

```
secure-shopping-api/
├── express-backend/
│   ├── server.js          # Express + MySQL + login proxy
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx  # OAuth2 login form
│   │   │   └── Products.jsx # Product grid
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── config/
│   ├── apim-changes.toml  # APIM config changes
│   └── is-changes.toml    # IS config changes
├── .gitignore
└── README.md
```

---

## 🔐 Security Demo

**With OAuth2 token:**
```bash
# Returns 200 OK with product list
curl -X GET http://localhost:8280/shop/1.0/products \
  -H "Authorization: Bearer <token>"
```

**Without token:**
```bash
# Returns 401 Unauthorized — gateway blocks the request
curl -X GET http://localhost:8280/shop/1.0/products
```

---

## 💡 What I Learned

- WSO2 API Manager — API lifecycle, publishing, gateway configuration
- WSO2 Identity Server — OAuth 2.0 token issuance, identity management
- OAuth 2.0 password grant flow — token request, JWT structure, expiry
- API gateway pattern — separation of concerns between gateway and backend
- CORS handling — server-side token proxy to avoid browser restrictions
- SSL certificate management — Java keytool, PKCS12, JKS keystores
- Rate limiting — throttling policies in WSO2
- Full stack development — React, Express, MySQL integration
- Enterprise middleware configuration — TOML config files, port management

---

## 🏢 Real World Parallel

This project implements the same patterns used by:
- **Stripe** — API keys + OAuth + gateway
- **Shopify** — product catalog + secured API
- **Twilio** — developer portal + subscription model

---

## 👤 Author

**Ananth-Abi** — Built for internship career day demonstration
- GitHub: [github.com/Ananth-Abi/secure-shopping-api](https://github.com/Ananth-Abi/secure-shopping-api)