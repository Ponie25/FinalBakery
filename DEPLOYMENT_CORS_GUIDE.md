# CORS Deployment Guide

## Why CORS Issues Occur During Deployment

CORS (Cross-Origin Resource Sharing) issues happen when your frontend and backend are deployed to different domains, and the server doesn't allow requests from the frontend's domain.

## Common Causes

1. **Different domains**: Frontend on `https://your-app.vercel.app` and backend on `https://your-api.render.com`
2. **Mixed protocols**: Frontend on HTTPS, backend on HTTP
3. **Missing environment variables**: Server doesn't know about the frontend's domain
4. **Hardcoded origins**: Server only allows specific domains

## How to Fix CORS Issues

### 1. Set Environment Variables

#### For Backend (Server) Deployment:

Set these environment variables in your hosting platform (Vercel, Render, Heroku, etc.):

```bash
# Add your frontend domain to allowed origins
CORS_ORIGINS=https://your-frontend-domain.com,https://your-frontend-domain.vercel.app

# Set your frontend URL
CLIENT_URL=https://your-frontend-domain.com

# Set your backend URL
SERVER_URL=https://your-backend-domain.com

# Environment
NODE_ENV=production
```

#### For Frontend (Client) Deployment:

Set these environment variables in your hosting platform:

```bash
# Set your backend API URL
VUE_APP_API_BASE_URL=https://your-backend-domain.com/api

# Set your frontend URL
VUE_APP_CLIENT_URL=https://your-frontend-domain.com

# Set your backend URL
VUE_APP_SERVER_URL=https://your-backend-domain.com
```

### 2. Platform-Specific Instructions

#### Vercel (Frontend)
1. Go to your project settings
2. Add environment variables in the "Environment Variables" section
3. Make sure to set them for "Production" environment

#### Render (Backend)
1. Go to your service dashboard
2. Navigate to "Environment" tab
3. Add the environment variables listed above

#### Netlify (Frontend)
1. Go to Site settings > Environment variables
2. Add the environment variables

### 3. Verify Your Configuration

After setting environment variables, restart your deployments and check:

1. **Backend logs**: Look for "Allowed origins" in the console output
2. **Frontend network tab**: Check if requests are going to the correct URL
3. **Browser console**: Look for CORS error messages

### 4. Testing CORS Configuration

You can test if CORS is working by:

1. Opening your deployed frontend
2. Opening browser developer tools (F12)
3. Going to the Network tab
4. Performing an action that makes an API call
5. Checking if the request succeeds or fails

### 5. Common CORS Error Messages

- `Access to fetch at 'https://api.example.com' from origin 'https://app.example.com' has been blocked by CORS policy`
- `No 'Access-Control-Allow-Origin' header is present on the requested resource`

### 6. Debugging Steps

1. **Check server logs** for "Allowed origins" and "Request origin" messages
2. **Verify environment variables** are set correctly in your hosting platform
3. **Ensure HTTPS**: Both frontend and backend should use HTTPS in production
4. **Check API base URL**: Make sure frontend is calling the correct backend URL

### 7. Temporary Debugging (Development Only)

If you need to temporarily allow all origins for debugging (NOT recommended for production):

```javascript
// In server/app.js - ONLY FOR DEBUGGING
app.use(cors({
    origin: true, // Allow all origins
    credentials: true
}));
```

### 8. Security Best Practices

1. **Never use `origin: true`** in production
2. **Always specify exact domains** in CORS_ORIGINS
3. **Use HTTPS** for both frontend and backend
4. **Keep environment variables secure** and don't commit them to version control

## Example Configuration

### Frontend (Vercel)
```
VUE_APP_API_BASE_URL=https://bakery-api.onrender.com/api
VUE_APP_CLIENT_URL=https://bakery-app.vercel.app
VUE_APP_SERVER_URL=https://bakery-api.onrender.com
```

### Backend (Render)
```
CORS_ORIGINS=https://bakery-app.vercel.app,https://bakery-theta-eight.vercel.app
CLIENT_URL=https://bakery-app.vercel.app
SERVER_URL=https://bakery-api.onrender.com
NODE_ENV=production
```

## Still Having Issues?

1. Check the server logs for detailed CORS information
2. Verify all environment variables are set correctly
3. Ensure both frontend and backend are deployed and accessible
4. Test with a simple API endpoint first
5. Check if your hosting platform has any specific CORS requirements 