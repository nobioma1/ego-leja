const server = require('./api/server');
const { PORT } = require('./config');

async function startServer() {
  server.listen(PORT, (err) => {
    console.log(`####🚀 Server listening on port: ${PORT} 🚀 ####`);
  });
}

startServer();
