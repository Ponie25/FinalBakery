// Client-side configuration
const config = {
    // API configuration
    API_BASE_URL: process.env.VUE_APP_API_BASE_URL || 'https://finalbakery.onrender.com/api' || 'http://localhost:3000/api',
    
    // Client configuration
    CLIENT_PORT: process.env.VUE_APP_CLIENT_PORT || 8080,
    CLIENT_URL: process.env.VUE_APP_CLIENT_URL || 'https://final-bakery-lake.vercel.app' || 'http://localhost:8080',
    
    // Server configuration
    SERVER_PORT: process.env.VUE_APP_SERVER_PORT || 3000,
    SERVER_URL: process.env.VUE_APP_SERVER_URL || 'https://finalbakery.onrender.com' || 'http://localhost:3000'
};

export default config; 