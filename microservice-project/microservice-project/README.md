# Microservice Learning Project


## Architecture
- **Eureka Server** (port 8761) — Service Discovery
- **API Gateway** (port 8080) — Single Entry Point
- **User Service** (port 8081) — User CRUD + Kafka Producer
- **Product Service** (port 8082) — Product CRUD + Kafka Consumer
- **Kafka** (port 9092) — Async messaging via Docker

## How to Run

### Step 1: Start Kafka (Docker required)
```bash
docker-compose up -d
```

### Step 2: Start services IN ORDER
1. Start **eureka-server** first
2. Start **user-service**
3. Start **product-service**
4. Start **api-gateway** last

### Step 3: Test APIs via Gateway (port 8080)

#### Users
- GET    http://localhost:8080/api/users
- GET    http://localhost:8080/api/users/1
- POST   http://localhost:8080/api/users
  Body: {"name": "John", "email": "john@example.com"}
- DELETE http://localhost:8080/api/users/1

#### Products
- GET    http://localhost:8080/api/products
- GET    http://localhost:8080/api/products/1
- POST   http://localhost:8080/api/products
  Body: {"name": "Laptop", "description": "Gaming Laptop", "price": 999.99}
- DELETE http://localhost:8080/api/products/1

### Step 4: View Eureka Dashboard
http://localhost:8761

### Step 5: H2 Console (in-memory DB)
- User Service:    http://localhost:8081/h2-console  (JDBC URL: jdbc:h2:mem:userdb)
- Product Service: http://localhost:8082/h2-console  (JDBC URL: jdbc:h2:mem:productdb)

## Kafka Flow
When you create a User → User Service publishes to `user-created` topic → Product Service consumes it and logs the event.
