const http = require("http");
const app = require("./src/app.js");
const configureSocket = require("./src/sockets/webSocket");

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

configureSocket(server); 

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
