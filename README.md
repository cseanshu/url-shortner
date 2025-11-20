# URL Shortener

A full-stack URL shortener application built with React and Express. Create short,  links with custom codes or auto-generated ones, track click analytics, and manage your links through an  dashboard.

## Features

- **Create Short URLs**: Generate shortened URLs with custom or auto-generated codes
- **Custom Codes**: Choose your own 6-8 character alphanumeric codes
- **Click Tracking**: Monitor the number of clicks on each shortened URL
- **Analytics Dashboard**: View statistics for all your links in one place
- **Search Functionality**: Quickly find links by code or target URL
- **Link Management**: Delete links when no longer needed
- **Automatic Redirection**: Fast, reliable redirects to target URLs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **React 19**
- **Vite** - Fast build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Prisma** - Modern ORM for database access
- **PostgreSQL** - Relational database
- **CORS** - Cross-origin resource sharing

## Project Structure

```
url-shortner/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API service layer
│   │   ├── App.jsx     # Main app component
│   │   └── main.jsx    # Entry point
│   └── package.json
│
├── backend/            # Express backend API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── migrations/   # Database migrations
│   ├── server.js       # Server entry point
│   ├── config.js       # Configuration settings
│   └── package.json
│
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/url-shortner.git
cd url-shortner
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create a .env file and configure your database
# Add the following environment variables:
# DATABASE_URL="postgresql://user:password@localhost:5432/url_shortener"
# SERVER_PORT=3000
# DB_PORT=5432

# Run database migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Start the development server
npm run dev
```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Create a .env file (if needed) and configure API endpoint
# VITE_API_URL=http://localhost:3000

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Configuration

### Backend Configuration

Create a `config.js` file in the backend directory (or use environment variables):

```javascript
module.exports = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  DB_PORT: process.env.DB_PORT || 5432,
};
```

Create a `.env` file in the backend directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
SERVER_PORT=3000
DB_PORT=5432
```

### Frontend Configuration

The frontend uses Vite for configuration. Update the API endpoint in [src/services/api.js](frontend/src/services/api.js) if needed.

## Database Schema

The application uses a single `Link` model:

```prisma
model Link {
  id            String    @id @default(uuid())
  code          String    @unique
  targetUrl     String
  clicks        Int       @default(0)
  lastClickedAt DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

## API Endpoints

### Create a shortened URL
```http
POST /link
Content-Type: application/json

{
  "targetUrl": "https://example.com",
  "customCode": "abc123" // optional
}
```

### Get all links
```http
GET /link?search=query // search is optional
```

### Get link statistics
```http
GET /link/:code
```

### Delete a link
```http
DELETE /link/:code
```

### Redirect to target URL
```http
GET /:code
```

## Usage

1. **Creating a Short URL**:
   - Enter your long URL in the input field
   - Optionally, provide a custom code (6-8 alphanumeric characters)
   - Click "Shorten" to create your short URL

2. **Viewing Statistics**:
   - Click on any link in the dashboard to view its statistics
   - See the number of clicks and last clicked timestamp

3. **Managing Links**:
   - Use the search bar to filter links
   - Delete unwanted links with the delete button

4. **Using Short URLs**:
   - Share your shortened URL (e.g., `yourdomain.com/abc123`)
   - Anyone clicking the link will be redirected to the target URL
   - Click count will be automatically tracked

## Development

### Backend Development

```bash
cd backend
npm run dev
```

The backend uses `nodemon` for automatic server restarts on file changes.

### Frontend Development

```bash
cd frontend
npm run dev
```

Vite provides hot module replacement for instant updates during development.

### Database Management

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# View your database in Prisma Studio
npx prisma studio

# Reset the database
npx prisma migrate reset
```

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

The production-ready files will be in the `frontend/dist` directory.

### Backend Production

The backend is ready for production deployment. Make sure to:
- Set proper environment variables
- Run `npx prisma migrate deploy` on your production database
- Use a process manager like PM2 for Node.js

Make sure to configure environment variables on your deployment platform.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
