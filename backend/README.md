# Toolbox Challenge - Backend API

Node.js/Express REST API that fetches CSV files from an external API, processes them, and serves formatted JSON data.

## Development

### Project Structure

```
backend/
├── src/
│   ├── main.js              # Express app entry point & Swagger config
│   ├── routes/
│   │   └── files.js         # File-related API routes
│   ├── services/
│   │   └── files.js         # External API integration
│   └── utils/
│       ├── csvParser.js     # CSV parsing logic
│       └── apiErrorHandler.js # Error handling utility
├── test/                    # Test files
├── .env                     # Environment variables (local)
├── .env.example             # Environment variables template
└── package.json             # Dependencies and scripts
```

### Code Organization

- **routes/**: Express route handlers (request/response logic)
- **services/**: Business logic and external API communication
- **utils/**: Reusable helper functions and utilities

## Prerequisites

- **Node.js 14.x** (specified in package.json engines)
- **npm** (comes with Node.js)

## Installation

```bash
npm install
```

## Running Locally

```bash
npm start
```

Server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

### Required Variables

#### ENDPOINT

- **Description**: Base URL for the external Toolbox API
- **Local Development**: `https://echo-serv.tbxnet.com/v1/secret`
- **Production**: `https://echo-serv.tbxnet.com/v1/secret` (same)
- **Example**:
  ```env
  ENDPOINT=https://echo-serv.tbxnet.com/v1/secret
  ```

#### ENDPOINT_TOKEN

- **Description**: Bearer token for authenticating with the external API
- **Value**: The token is provided in `CHALLENGE_REQUIREMENTS.md` (see root directory)
- **Local Development**: `Bearer aSuperSecretKey`
- **Production**: `Bearer aSuperSecretKey` (same - external API credential)
- **Example**:
  ```env
  ENDPOINT_TOKEN=Bearer aSuperSecretKey
  ```
- **Note**:
  - This is a **test/challenge token** provided in the challenge requirements document
  - The token is for the external API, not your backend
  - It remains the same across environments

#### PORT (Optional)

- **Description**: Port on which the Express server listens
- **Local Development**: `3000` (default if not specified)
- **Production**: Automatically set by Render.com
- **Example**:
  ```env
  PORT=3000
  ```

### Example .env File

Create a `.env` file based on `.env.example` (see below), or use this template:

```env
# Server Configuration
PORT=3000

# External API Configuration
ENDPOINT=https://echo-serv.tbxnet.com/v1/secret
ENDPOINT_TOKEN=Bearer aSuperSecretKey
```

**Note**: A `.env.example` file is provided in this directory as a template. Copy it to `.env` and fill in the values.

## API Endpoints

### GET /health

Health check endpoint to verify the API is running.

**Request:**

```bash
curl http://localhost:3000/health
```

**Response:**

```json
{
  "status": "ok"
}
```

**Status Codes:**

- `200`: API is healthy

---

### GET /files/list

Returns a list of available CSV files from the external API.

**Request:**

```bash
curl http://localhost:3000/files/list
```

**Response:**

```json
{
  "files": ["test1.csv", "test2.csv", "test3.csv"]
}
```

**Status Codes:**

- `200`: Successfully retrieved file list
- `500`: Server error (external API failure, network error)

**Error Response:**

```json
{
  "success": false,
  "message": "Error message description"
}
```

**Production Example:**

```bash
curl https://toolbox-challenge-backend.onrender.com/files/list
```

---

### GET /files/data

Fetches and processes CSV files, returning formatted JSON data.

**Query Parameters:**

- `fileName` (optional): Filter results to a specific CSV file

**Request (All Files):**

```bash
curl http://localhost:3000/files/data
```

**Request (Single File):**

```bash
curl "http://localhost:3000/files/data?fileName=test1.csv"
```

**Response:**

```json
[
  {
    "file": "test1.csv",
    "lines": [
      {
        "text": "Sample text",
        "number": 12345,
        "hex": "a1b2c3d4e5f6"
      },
      {
        "text": "Another line",
        "number": 67890,
        "hex": "f6e5d4c3b2a1"
      }
    ]
  },
  {
    "file": "test2.csv",
    "lines": [
      {
        "text": "More data",
        "number": 11111,
        "hex": "abcdef123456"
      }
    ]
  }
}
```

**Behavior:**

- **Without `fileName`**: Returns all files with ONLY valid lines
- **With `fileName`**: Returns specified file with ALL lines (valid + invalid) and validation metadata
- Files with download/processing errors are excluded
- Empty files are excluded
- Lines with wrong column count (< 4 or > 4) are always excluded

**Validation Metadata (when fileName is specified):**

When the `fileName` parameter is present, each line includes a `validation` object:

```json
{
  "text": "Sample text",
  "number": "12345",
  "hex": "abc",
  "validation": {
    "textValid": true,
    "numberValid": true,
    "hexValid": false
  }
}
```

- `textValid`: true if text field is non-empty
- `numberValid`: true if number field is a valid number
- `hexValid`: true if hex field is exactly 32 characters
- Invalid field values are preserved as strings for review
- This enables the frontend to highlight invalid fields in the UI

**Status Codes:**

- `200`: Successfully retrieved and processed files (even if result is empty array)
- `500`: Server error (external API failure, network error)

**Error Response:**

```json
{
  "success": false,
  "message": "Error message description"
}
```

**Production Examples:**

```bash
# All files
curl https://toolbox-challenge-backend.onrender.com/files/data

# Single file
curl "https://toolbox-challenge-backend.onrender.com/files/data?fileName=test1.csv"
```

## Swagger API Documentation

Interactive API documentation is available via Swagger UI:

- **Local**: http://localhost:3000/api-docs
- **Production**: https://toolbox-challenge-backend.onrender.com/api-docs

The Swagger UI provides:

- Complete API endpoint documentation
- Request/response schemas
- Interactive "Try it out" functionality
- Example requests and responses

## Testing

### Run Tests

```bash
npm test
```

### Test Structure

```
test/
├── server.test.js       # API endpoint integration tests
└── csvParser.test.js    # CSV parsing unit tests
```

### Test Coverage

- Unit tests for CSV parser
- Integration tests for API routes using chai-http

### Writing New Tests

- Use Mocha as the test runner
- Use Chai for assertions
- Use chai-http for HTTP integration tests
- Follow existing test patterns in the `test/` directory

## Deployment

### Render.com Deployment

The backend is deployed on Render.com at: https://toolbox-challenge-backend.onrender.com

#### Deployment Steps

1. **Connect Repository**

   - Link your GitHub repository to Render.com
   - Select the backend directory as the root

2. **Configure Service**

   - **Type**: Web Service
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

3. **Set Environment Variables**

   - Go to Environment tab in Render dashboard
   - Add `ENDPOINT` and `ENDPOINT_TOKEN` variables
   - Do not set `PORT` (Render handles this automatically)

4. **Configure Health Check**
   - **Health Check Path**: `/health`
   - Render will ping this endpoint to verify service health

#### Troubleshooting Production Issues

**Problem**: First request after inactivity is very slow

- **Cause**: Free tier spin-up time
- **Solution**: This is expected. Subsequent requests will be fast. Consider upgrading to a paid plan for always-on service.

**Problem**: API returns 500 errors

- **Solution**: Check Render logs (see below) for error details

#### Important Notes About Free Tier

⚠️ **Render.com Free Tier Behavior**:

- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 50+ seconds to respond
- This is normal and expected behavior for free tier
- Health checks may fail during spin-down, but service will recover
- For production use with guaranteed uptime, consider upgrading to a paid plan

### Linting

```bash
npm run lint
```

The project uses ESLint with Standard style configuration.

## License

ISC
