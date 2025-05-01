
module.exports = {
  apps: [
    {
      name: 'test',  // Name of your application
      script: 'server.js',  // Entry point to your Node.js app
      instances: 1,  // Number of instances (set to 1 for a single instance)
      autorestart: true,  // Automatically restart the app if it crashes
      max_restarts: 10,
      watch: false,  // Set to true if you want PM2 to watch files for changes
      max_memory_restart: '100M',  // Restart app if it exceeds 250MB of memory
      env: {
        PATHNAME: '/test',
        PORT: 5595
      }
    }
  ]
};
