// Client-side configuration
const config = {
    API_BASE_URL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api',
    CLIENT_URL: process.env.VUE_APP_CLIENT_URL || 'http://localhost:8080',
    SERVER_URL: process.env.VUE_APP_SERVER_URL || 'http://localhost:3000'
};

export default config; 