const ProductManager = require("../managers/productManager");
const productManager = new ProductManager();

const realTimeProductsController = {

  getRealTimeProducts: (req, res) => {
    try {
      res.status(200).json(productManager.getProducts());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createRealTimeProduct: (req, res) => {
    try {
      const { title, description, code, price, stock, category, thumbnail } =
        req.body;

      if (
        !title ||
        !description ||
        !code ||
        !price ||
        !stock ||
        !category ||
        !thumbnail
      ) {
        return res.status(400).json({ error: "Faltan datos" });
      }

      const newProduct = productManager.addProduct(
        title,
        description,
        code,
        Number(price), 
        Number(stock), 
        category,
        thumbnail
      );

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al crear producto" });
    }
  },

  deleteRealTimeProduct: (req, res) => {
    try {
      const { id } = req.params; // obetenemos el id del producto a eliminar por boton en el front
      const product = productManager.deleteProduct(id);
      if (product.error) {
        return res.status(404).json(product);
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar producto" });
    }
  },
};

module.exports = realTimeProductsController;

