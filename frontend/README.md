# Toolbox Challenge - Frontend

React application with Redux state management that displays CSV file data fetched from the backend API.

## Prerequisites

- **Node.js 16.x** (recommended)
- **npm** (comes with Node.js)

## Installation

```bash
npm install
```

## Running Development Server

```bash
npm start
```

Development server will start on `http://localhost:4000` with hot reload enabled.

## Building for Production

```bash
npm run build
```

Production build will be created in the `dist/` directory.

## Environment Variables

Create a `.env` file in the frontend directory with the following variables:

### Required Variables

#### REACT_APP_API_URL

- **Description**: Base URL for the backend API
- **Local Development**: `http://localhost:3000`
- **Production**: `https://toolbox-challenge-backend.onrender.com`
- **Example**:
  ```env
  REACT_APP_API_URL=http://localhost:3000
  ```

**Important**: Environment variables must be set at **build time** (not runtime). Webpack's DefinePlugin injects these values during the build process.

### Example .env File

**Local Development:**

```env
REACT_APP_API_URL=http://localhost:3000
```

**Production Build:**

```env
REACT_APP_API_URL=https://toolbox-challenge-backend.onrender.com
```

## Development

### Development Server Details

- **Port**: 4000
- **Hot Reload**: Enabled (changes reflect automatically)
- **Webpack Dev Server**: Configured in `webpack.config.js`

### Project Structure

```
frontend/
├── src/
│   ├── index.js                    # Application entry point
│   ├── App.js                      # Root component
│   ├── config.js                   # Environment configuration
│   ├── api.js                      # Backend API client
│   ├── components/
│   │   ├── FileTable/              # Main data table component
│   │   ├── FileFilter/             # Search/filter component
│   │   ├── FileList/               # Sidebar file list
│   │   ├── FileDetailsModal/       # File details modal
│   │   ├── ErrorAlert/             # Error display component
│   │   └── SkeletonRow/            # Loading skeleton
│   └── redux/
│       ├── store.js                # Redux store configuration
│       └── slices/
│           ├── filesSlice.js       # File data state
│           ├── fileListSlice.js    # File list state
│           └── modalSlice.js       # Modal state
├── public/                         # Static assets
├── dist/                           # Production build output
└── webpack.config.js               # Webpack configuration
```

### State Management Patterns

1. **Async Operations**: Use Redux Toolkit's `createAsyncThunk`
2. **Loading States**: Track loading/error states for each async operation
3. **Normalized Data**: Store data in a flat structure when possible
4. **Selectors**: Use selectors to access state (enables memoization)

### API Integration

The `src/api.js` module provides a centralized interface for backend communication:

```javascript
import { fetchFiles, fetchFilesByName, fetchFileList } from './api';

// Fetch all files
const files = await fetchFiles();

// Fetch specific file
const file = await fetchFilesByName('test1.csv');

// Fetch file list
const fileList = await fetchFileList();
```

**Features**:

- Axios-based HTTP client
- Automatic error transformation
- Consistent error handling
- Configurable base URL from environment

## Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm test:watch
```

### Test Structure

```
frontend/
├── __mocks__/              # Mock files for testing
└── src/
    └── components/
        └── [Component]/
            ├── index.js
            └── [Component].test.js
```

### Test Coverage

- Component rendering tests
- User interaction tests
- Redux state management tests
- API integration tests

### Writing New Tests

- Use Jest as the test runner
- Use React Testing Library for component tests
- Use `@testing-library/user-event` for user interactions
- Follow existing test patterns in component directories

## Build and Deployment

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory:

- Minified JavaScript bundles
- Optimized CSS
- Compressed assets
- Source maps for debugging

### Build Output

```
dist/
├── index.html          # Main HTML file
├── bundle.js           # JavaScript bundle
├── bundle.js.map       # Source map
└── [assets]/           # Images, fonts, etc.
```

### Render.com Deployment

The frontend is deployed on Render.com at: https://toolbox-challenge-qmf4.onrender.com

#### Deployment Steps

1. **Connect Repository**

   - Link your GitHub repository to Render.com
   - Select the frontend directory as the root

2. **Configure Service**

   - **Type**: Static Site
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Set Environment Variables**

   - Go to Environment tab in Render dashboard
   - Add `REACT_APP_API_URL`: `https://toolbox-challenge-backend.onrender.com`

4. **Deploy**
   - Render will automatically build and deploy
   - Subsequent pushes to main branch trigger auto-deploys

## Features

### File Data Display

- Displays CSV data in a responsive table
- Shows file name, text, number, and hex columns
- Handles multiple files simultaneously

### Client-Side Filtering

- Search by text content
- Filter by file name
- Real-time filtering as you type

### File List Sidebar

- Shows all available files
- Click to filter by specific file
- Displays file count

### File Details Modal

- Click any row to view detailed information
- Shows all fields for selected line
- Easy-to-read modal interface

### Dark/Light Theme Toggle

- Switch between dark and light themes
- Theme preference persisted in localStorage
- Smooth theme transitions

### Error Handling and Display

- User-friendly error messages
- Automatic error recovery
- Dismissible error alerts

### Loading States

- Skeleton loaders during data fetch
- Loading indicators for async operations
- Smooth transitions between states

## Linting

```bash
npm run lint
```

The project uses ESLint with Standard style and React-specific rules.

## License

ISC
