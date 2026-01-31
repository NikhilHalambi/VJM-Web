# Vaidyakiya Janjagruti Manch NGO Website - Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Project Structure
```
vjm-ngo/
├── server/          # Express.js backend
│   ├── config/      # Database configuration
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   └── server.js    # Main server file
├── client/          # React frontend
│   ├── public/      # Static assets
│   └── src/         # React components and styles
└── .gitignore
```

## Installation Steps

### 1. Setup MongoDB (Local - No API Keys Required)

**Using MongoDB Community Edition (Recommended)**

The project is configured to use MongoDB Community Edition running locally - completely free with no API keys or authentication required!

**Installation:**
- Download from: https://www.mongodb.com/try/download/community
- Install MongoDB Community Edition for Windows
- Start MongoDB service (installed automatically)
- Default connection: `mongodb://localhost:27017`

**Verification:**
```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# Or start it manually
net start MongoDB
```

See [MONGODB_SETUP.md](file:///c:/Users/Nikhil%20Halambi/Documents/Nikhil/SIT/Sem%206/DEVOPS/vjm-ngo/MONGODB_SETUP.md) for detailed installation guide.

> **Note**: MongoDB Atlas (cloud) is optional but NOT required. Local MongoDB Community Edition works perfectly and requires no internet connection or API keys!

### 2. Configure Backend

```bash
# Navigate to server directory
cd server

# Create .env file from template
copy .env.example .env

# Edit .env file and add your MongoDB connection string
# For local: MONGODB_URI=mongodb://localhost:27017/vjm-ngo
# For Atlas: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vjm-ngo

# Install dependencies
npm install
```

### 3. Configure Frontend

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install
```

## Running the Application

### Start Backend Server

```bash
# From server directory
cd server
npm run dev

# Server will start on http://localhost:5000
# Look for "MongoDB Connected" message
```

### Start Frontend Development Server

```bash
# From client directory (in a new terminal)
cd client
npm run dev

# Vite dev server will start on http://localhost:5173
```

### Access the Website

Open your browser and navigate to: **http://localhost:5173**

## Features

### Frontend
- ✅ Modern, responsive design with nature-inspired color palette
- ✅ Smooth scroll navigation
- ✅ Animated statistics counters
- ✅ Glassmorphism effects
- ✅ Contact form with validation
- ✅ Mobile-friendly responsive layout

### Backend
- ✅ Express.js REST API
- ✅ MongoDB database with Mongoose ODM
- ✅ Contact form submission endpoint
- ✅ Project data management
- ✅ CORS enabled for frontend communication

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (admin)

## Testing the Contact Form

1. Navigate to the Contact section
2. Fill in the form fields
3. Submit the form
4. Check MongoDB database for the saved submission
5. Verify success message appears

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings
- Ensure IP is whitelisted in MongoDB Atlas

### Port Already in Use
- Backend: Change PORT in .env file
- Frontend: Change port in vite.config.js

### CORS Errors
- Verify CLIENT_URL in server/.env matches frontend URL
- Check CORS configuration in server.js

## Production Build

```bash
# Build frontend
cd client
npm run build

# The build folder will contain optimized production files
```

## Environment Variables

### Server (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Styling**: Vanilla CSS with modern design patterns
- **Fonts**: Google Fonts (Inter, Outfit)

## Support

For issues or questions, please contact the development team.

---

**Vaidyakiya Janjagruti Manch** - Growing Together for a Sustainable Future 🌱
