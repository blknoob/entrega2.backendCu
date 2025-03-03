const ProductManager = require("../managers/productManager");
const productManager = new ProductManager();
const { Server } = require("socket.io");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Nuevo cliente conectado!");

    socket.emit("products", productManager.getProducts());

    socket.on("new-product", (product) => {
      productManager.addProduct(
        product.title,
        product.description,
        product.code,
        product.price,
        product.stock,
        product.category,
        product.thumbnail
      );
      io.emit("products", productManager.getProducts());
    });

    socket.on("delete-product", (id) => {
      const product = productManager.deleteProduct(id);
      io.emit("products", productManager.getProducts());
    });
  });
};

module.exports = configureSocket;
