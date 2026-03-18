# Secure Shopping API 🛒

A secured product catalog REST API built using WSO2 open-source 
products, demonstrating enterprise API management and OAuth 2.0 security.

## 🏗️ Architecture
Client → WSO2 API Manager (Gateway) → Node.js Backend
              ↕
       WSO2 Identity Server (OAuth2)

## 🛠️ Products Used
- **WSO2 API Manager 4.6.0** — API gateway, rate limiting, developer portal
- **WSO2 Identity Server 7.2.0** — Identity management
- **Node.js** — Mock product catalog backend

## 🔑 Key Features
- OAuth 2.0 security — 401 Unauthorized without a valid token
- API gateway pattern — backend never exposed directly
- Rate limiting — throttling policies applied
- Developer portal — API subscription management

## 📡 API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | `/shop/1.0/products` | List all products |
| GET | `/shop/1.0/products/{id}` | Get product by ID |

## 💡 What I Learned
OAuth 2.0, REST API design, API gateway patterns, token-based 
authentication, rate limiting, SSL certificate management, 
and enterprise identity management using WSO2 open-source products.
