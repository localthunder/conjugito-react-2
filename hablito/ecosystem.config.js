export default {
    apps: [{
      name: 'hablito',
      script: 'node server/server.js',
      env: {
        NODE_ENV: 'production'
      }
    }]
  };