# Toolbox Challenge

A full-stack application that fetches CSV files from an external API, processes them, and displays the data in an interactive web interface.

## Overview

This project consists of two main components:

- **Backend**: Node.js/Express REST API that fetches and processes CSV files
- **Frontend**: React application with Redux state management for data visualization

## Technology Stack

### Backend

- **Runtime**: Node.js 14.x
- **Framework**: Express 4.17.1
- **HTTP Client**: Axios
- **Testing**: Mocha + Chai
- **API Documentation**: Swagger/OpenAPI

### Frontend

- **Framework**: React 18.2.0
- **State Management**: Redux Toolkit 2.10.1
- **UI Library**: React Bootstrap 5.3.0
- **Build Tool**: Webpack 5
- **Testing**: Jest + React Testing Library

## Project Structure

```
toolbox-challenge/
├── backend/              # Node.js Express API
│   ├── src/
│   │   ├── main.js      # Express app entry point
│   │   ├── routes/      # API route handlers
│   │   ├── services/    # External API integration
│   │   └── utils/       # Helper functions (CSV parser, error handler)
│   └── test/            # Backend tests
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── redux/       # Redux store and slices
│   │   └── api.js       # Backend API client
│   └── dist/            # Production build output
├── docker-compose.yml   # Local development setup
└── openspec/            # Project specifications and changes
```

## Quick Start

### Prerequisites

- **Node.js 14.x** (for backend)
- **Node.js 16.x** (for frontend)
- **npm** (comes with Node.js)
- **Docker** and **Docker Compose** (optional, for containerized development)

### Installation & Running

#### Option 1: Using Docker Compose (Recommended)

```bash
# Start both backend and frontend services
docker-compose up

# Backend will be available at: http://localhost:3000
# Frontend will be available at: http://localhost:4000
```

#### Option 2: Manual Setup

**Backend:**

```bash
cd backend
npm install
npm start
# Server runs on http://localhost:3000
```

**Frontend:**

```bash
cd frontend
npm install
npm start
# Development server runs on http://localhost:4000
```

## Environment Variables

### Backend

Create `backend/.env` file (or copy from `backend/.env.example`):

```env
PORT=3000
ENDPOINT=https://echo-serv.tbxnet.com/v1/secret
ENDPOINT_TOKEN=Bearer aSuperSecretKey
```

**Note**: The `ENDPOINT_TOKEN` value is provided in `CHALLENGE_REQUIREMENTS.md`. This is a test/challenge token for the external API.

### Frontend

Create `frontend/.env` file:

```env
REACT_APP_API_URL=http://localhost:3000
```

For detailed environment variable documentation, see:

- [Backend Environment Variables](backend/README.md#environment-variables-section)
- [Frontend Environment Variables](frontend/README.md#environment-variables-section)

## API Documentation

Interactive Swagger API documentation is available at:

- **Local**: http://localhost:3000/api-docs
- **Production**: https://toolbox-challenge-backend.onrender.com/api-docs

## Production Deployment

Both services are deployed on Render.com:

- **Backend API**: https://toolbox-challenge-backend.onrender.com
- **Frontend App**: https://toolbox-challenge-qmf4.onrender.com

**Note**: The backend uses Render's free tier, which spins down after periods of inactivity. The first request after inactivity may take 50+ seconds as the service spins up.

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Development Guidelines

### Code Quality

- **Linting**: Both projects use ESLint with Standard style
- **Backend**: `npm run lint` in backend directory
- **Frontend**: `npm run lint` in frontend directory

### Module System

- **Backend**: CommonJS (require/module.exports)
- **Frontend**: ES6 modules (import/export)

### API Integration

- Backend fetches data from external Toolbox API
- Frontend communicates with backend via REST API
- All API calls include proper error handling

## Documentation

- [Backend README](backend/README.md) - API endpoints, setup, deployment
- [Frontend README](frontend/README.md) - Component architecture, state management, deployment
- [Challenge Requirements](CHALLENGE_REQUIREMENTS.md) - Original challenge specifications

## License

ISC
