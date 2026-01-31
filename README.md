# 📚 Bookmarkd

A full-stack book tracking application to manage your reading list. Track books by status (reading, completed, want to read) and organize them with custom tags.

## Tech Stack

| Layer    | Technology                  |
|----------|----------------------------|
| Frontend | Next.js, TypeScript, CSS   |
| Backend  | Express.js, TypeScript     |
| Database | MongoDB (Mongoose)         |
| Auth     | JWT + bcrypt               |

## Project Structure

```
Bookmarkd/
├── client/          # Next.js frontend (port 3001)
│   └── src/
└── server/          # Express backend (port 3000)
    └── src/
        ├── controllers/
        ├── models/
        ├── routes/
        └── services/
```

## Local Setup

### 1. Clone & Install

```bash
git clone https://github.com/AmitChapde/Bookmark-d.git
cd Bookmark-d

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 2. Environment Variables

Create `.env` files in both `server` and `client` directories with the following variables:

**Server** (`server/.env`):
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookmarkd
JWT_SECRET=your_jwt_secret_key_here
```

**Client** (`client/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

> **Note**: Replace `MONGO_URI` with your MongoDB connection string and `JWT_SECRET` with a strong secret key. `NEXT_PUBLIC_API_URL` is accessible in the browser, so use `localhost` for development and your production URL for deployment.

### 3. Run Development

```bash
# Terminal 1 - Server
cd server && npm run dev

# Terminal 2 - Client
cd client && npm run dev
```

- **Client**: http://localhost:3001
- **Server**: http://localhost:3000

## API Endpoints

| Method | Endpoint            | Description        |
|--------|---------------------|--------------------|
| POST   | /api/v1/auth/register | Register user      |
| POST   | /api/v1/auth/login  | Login user         |
| GET    | /api/v1/books       | Get all books      |
| POST   | /api/v1/books       | Create book        |
| PUT    | /api/v1/books/:id   | Update book        |
| DELETE | /api/v1/books/:id   | Delete book        |

## Deployment

**Render (Backend)**
- Build: `npm install && npm run build`
- Start: `npm start`

---


