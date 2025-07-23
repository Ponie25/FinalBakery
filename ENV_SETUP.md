# Environment Variables Setup

This project uses environment variables for configuration. Follow these steps to set up your environment:

## 1. Environment File Setup

Copy the example environment file:
```bash
cp env.example .env
```

## 2. Environment Variables

### Server Configuration
- `SERVER_PORT`: Port for the backend server (default: 3000)
- `SERVER_URL`: URL for the backend server (default: http://localhost:3000)

### Client Configuration
- `CLIENT_PORT`: Port for the frontend client (default: 8080)
- `CLIENT_URL`: URL for the frontend client (default: http://localhost:8080)

### Vue.js Environment Variables (Client-side)
These must be prefixed with `VUE_APP_` to be accessible in Vue.js:
- `VUE_APP_API_BASE_URL`: API base URL for client requests
- `VUE_APP_CLIENT_PORT`: Client port
- `VUE_APP_CLIENT_URL`: Client URL
- `VUE_APP_SERVER_PORT`: Server port
- `VUE_APP_SERVER_URL`: Server URL

### Database Configuration
- `DATABASE_URL`: MongoDB connection string

### API Configuration
- `API_BASE_URL`: Base URL for API endpoints

### Session Configuration
- `SESSION_SECRET`: Secret key for session encryption
- `SESSION_MAX_AGE`: Session timeout in milliseconds (default: 24 hours)

### CORS Configuration
- `CORS_ORIGIN`: Allowed origin for CORS (default: http://localhost:8080)

### Environment
- `NODE_ENV`: Environment mode (development/production)

## 3. Usage

### Server (Node.js)
The server automatically loads environment variables from the `.env` file in the root directory.

### Client (Vue.js)
Vue.js automatically loads environment variables prefixed with `VUE_APP_` from the `.env` file.

## 4. Production Deployment

For production, update the environment variables in your `.env` file:

```env
NODE_ENV=production
SERVER_URL=https://your-production-domain.com
CLIENT_URL=https://your-production-domain.com
VUE_APP_API_BASE_URL=https://your-production-domain.com/api
VUE_APP_SERVER_URL=https://your-production-domain.com
CORS_ORIGIN=https://your-production-domain.com
```

## 5. Security Notes

- Never commit the `.env` file to version control
- Keep your `SESSION_SECRET` secure and unique
- Use strong database passwords
- In production, ensure all URLs use HTTPS

## 6. Troubleshooting

If environment variables are not loading:
1. Ensure the `.env` file exists in the root directory
2. Check that variable names are correct
3. For Vue.js, ensure variables are prefixed with `VUE_APP_`
4. Restart your development servers after changing environment variables 