# EasyBack Express - Setup Instructions

Welcome to EasyBack Express! This guide will help you get up and running quickly.

## Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

### 2. Start the Application

**Option A: Start both servers automatically (Recommended)**
```bash
npm run dev
```

**Option B: Start servers manually**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Generated Files**: http://localhost:3001/downloads

## How to Use

1. **Create Endpoints**: Use the form on the left to create new API endpoints
   - Enter the route path (e.g., `/api/users`)
   - Select HTTP method (GET, POST, PUT, DELETE)
   - Add a description (optional)
   - Add custom headers using the "Add Header" button

2. **View Endpoints**: Your created endpoints appear in the grid layout in the center

3. **Generate Code**: Click "Generate & Download" on the right to:
   - Generate a complete Express.js server
   - Automatically download the server file
   - Download additional files (package.json, README.md)

## Generated Files

When you generate code, you'll get:

- **server.js**: Complete Express server with your endpoints
- **package.json**: Project configuration with dependencies
- **README.md**: Setup instructions for your generated project

## Troubleshooting

### Server Connection Issues

If you see "ERR_CONNECTION_REFUSED":

1. Make sure the backend server is running:
   ```bash
   npm run server
   ```

2. Check if port 3001 is available:
   ```bash
   lsof -i :3001
   ```

3. Try different ports by setting the PORT environment variable:
   ```bash
   PORT=3002 npm run server
   ```

### CORS Issues

If you get CORS errors when generating code:

1. Make sure both servers are running on correct ports:
   - Backend: http://localhost:3001
   - Frontend: http://localhost:5173

2. Check server logs for CORS errors

3. Test the backend API directly:
   ```bash
   curl -X GET http://localhost:3001/api/health
   ```

4. If still having issues, try restarting both servers:
   ```bash
   # Stop all servers (Ctrl+C)
   # Then restart
   npm run dev
   ```

5. Check browser console for detailed error messages

6. Try accessing the backend directly in browser:
   http://localhost:3001/api/health

### Frontend Issues

If the frontend doesn't start:

1. Make sure you're in the frontend directory:
   ```bash
   cd frontend
   npm run dev
   ```

2. Check if port 5173 is available

3. Clear node_modules and reinstall:
   ```bash
   cd frontend
   rm -rf node_modules
   npm install
   ```

### Template Not Found

If you get "Template file not found" error:

1. Make sure you're running the server from the root directory
2. Check that `templates/server.js` exists in the project root

## Project Structure

```
easyback-express/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # React context
│   │   └── types/          # TypeScript types
│   └── package.json
├── templates/              # Code generation templates
│   └── server.js
├── output/                 # Generated files
│   └── generated/
├── server.js              # Backend API server
├── package.json           # Backend dependencies
└── README.md
```

## Development

### Adding New Features

1. **Backend**: Modify `server.js` for new API endpoints
2. **Frontend**: Add components in `frontend/src/components/`
3. **Templates**: Modify `templates/server.js` to change generated code

### Environment Variables

- `PORT`: Backend server port (default: 3001)
- `NODE_ENV`: Environment mode

## Production Build

```bash
# Build frontend
npm run build

# The built files will be in frontend/dist/
```

## Support

If you encounter issues:

1. Check this SETUP.md file
2. Look at the console logs for error details
3. Make sure all dependencies are installed
4. Verify both servers are running

## Features

- ✅ Visual endpoint creation
- ✅ Custom headers support
- ✅ Grid layout for endpoint management
- ✅ Automatic code generation
- ✅ Express.js server generation
- ✅ Package.json generation
- ✅ README generation
- ✅ File download functionality
- ✅ Responsive design
- ✅ Real-time server status checking

Happy coding! 🚀