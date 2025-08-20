# LivePrompt Frontend

A React-based frontend application for transcript summarization using Material-UI and Redux.

## Features

- **Transcript Upload**: Support for text input and file uploads (.txt, .docx, .pdf)
- **AI-Powered Summarization**: Intelligent transcript analysis with action items and topics
- **Results Display**: Clean, organized summary presentation
- **Export Options**: Download summaries as TXT or JSON
- **Modern UI**: Material-UI components with responsive design
- **Redux State Management**: Centralized state with RTK Query for API calls

## Tech Stack

- **React 19** with Vite
- **Material-UI (MUI)** for UI components
- **Redux Toolkit** with RTK Query for state management
- **React Dropzone** for file uploads
- **Nginx** for production serving

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Setup

### Production (with Nginx)

```bash
# Build and run production container
docker build -t liveprompt-frontend .
docker run -p 3000:80 liveprompt-frontend
```

Or use docker-compose:

```bash
# Run production setup
docker-compose up -d
```

### Development

```bash
# Run development setup with hot reload
docker-compose -f docker-compose.dev.yml up -d
```

## Docker Commands

| Command | Description |
|---------|-------------|
| `docker build -t liveprompt-frontend .` | Build production image |
| `docker-compose up -d` | Run production setup |
| `docker-compose -f docker-compose.dev.yml up -d` | Run development setup |
| `docker-compose down` | Stop containers |
| `docker-compose logs frontend` | View container logs |

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api` with the following endpoints:

- `POST /api/summarize` - Submit transcript for summarization
- `GET /api/summaries` - Retrieve all summaries
- `GET /api/summaries/{id}` - Get specific summary
- `GET /api/health` - Health check

## Environment Configuration

The application automatically handles API calls through Redux RTK Query. For production deployment, update the API base URL in `src/store/api/transcriptApi.js`.

## Project Structure

```
src/
├── components/          # React components
│   ├── AppContent.jsx   # Main app container
│   ├── Navbar.jsx       # Navigation bar
│   ├── Footer.jsx       # Footer component
│   ├── TranscriptUpload.jsx  # Upload screen
│   └── SummaryResults.jsx    # Results screen
├── store/              # Redux store
│   ├── api/            # RTK Query API definitions
│   ├── slices/         # Redux slices
│   └── index.js        # Store configuration
└── services/           # Utility services
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
