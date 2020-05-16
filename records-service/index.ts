import { server } from './api/server';
import { config } from './config';

async function startServer() {
  server.listen(config.PORT, () => {
    console.log(`####🚀 Server listening on port: ${config.PORT} 🚀 ####`);
  });
}

startServer();
