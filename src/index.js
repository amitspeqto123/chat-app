const http = require('http');
const app = require('./app');
const dbConnect = require('./config/db');
const port = 3000
const setupWebsocket = require("./socket/socket");

const server = http.createServer(app);
setupWebsocket(server);

// database connection
dbConnect();

server.listen(port, () => {
  console.log(`app listening on port ${port}`)
});
