# Product CRUD API

This sample project demonstrates CRUD operations with both MongoDB and MySQL in Node.js.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGO_URI` and MySQL connection values.
3. Install dependencies:

```bash
npm install
```

4. Start the API:

```bash
npm start
```

## API Endpoints

MongoDB-backed endpoints:

- POST `/api/nosql/products`
- GET `/api/nosql/products`
- GET `/api/nosql/products/:id`
- PUT `/api/nosql/products/:id`
- DELETE `/api/nosql/products/:id`

MySQL-backed endpoints:

- POST `/api/sql/products`
- GET `/api/sql/products`
- GET `/api/sql/products/:id`
- PUT `/api/sql/products/:id`
- DELETE `/api/sql/products/:id`

## Product fields

- `name` (string, required)
- `price` (number, required)
- `category` (string, optional)
- `inStock` (boolean, default: true)
