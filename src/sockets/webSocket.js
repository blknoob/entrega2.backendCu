// const ProductManager = require("../managers/productManager");
// const productManager = new ProductManager();
const { Server } = require("socket.io");

const configureSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Nueva conexión:", socket.id);

    // Enviar productos al cliente al conectarse
    const products = productManager.getProducts();
    console.log("📦 Enviando productos al cliente:", products);
    socket.emit("products", products);

    // Manejar nuevo producto
    socket.on("new-product", (prod) => {
      if (!prod.title || !prod.description || !prod.code || !prod.price || !prod.stock || !prod.category || !prod.thumbnail) {
        socket.emit("error", { error: "Faltan datos" });
        return;
      }

      const product = productManager.addProduct(
        prod.title,
        prod.description,
        prod.code,
        prod.price,
        prod.stock,
        prod.category,
        prod.thumbnail
      );

      if (!product.error) {
        const updatedProducts = productManager.getProducts();
        console.log("📦 Lista actualizada de productos:", updatedProducts);
        io.sockets.emit("products", updatedProducts);
      }
    });

    // Manejar eliminación de producto
    socket.on("delete-product", (id) => {
      console.log(`Eliminando producto con ID: ${id}`);
      const deleted = productManager.deleteProduct(parseInt(id, 10));

      if (!deleted.error) {
        const updatedProducts = productManager.getProducts();
        console.log("📦 Lista actualizada de productos tras eliminar:", updatedProducts);
        io.sockets.emit("products", updatedProducts);
      } else {
        socket.emit("error", { error: "Producto no encontrado" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ Cliente desconectado: ${socket.id}`);
    });
  });
};

module.exports = configureSocket;
