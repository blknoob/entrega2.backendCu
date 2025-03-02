const ProductManager = require("../managers/productManager");
const productManager = new ProductManager();

const productsController = {
  getProducts: (req, res) => {
    try {
      // console.log("hola");
      // console.log(productManager.getProducts());

      res.status(200).json(productManager.getProducts());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: (req, res) => {
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
        Number(price), // Convertir a número
        Number(stock), // Convertir a número
        category,
        thumbnail
      );

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al crear producto" });
    }
  },

  deleteProduct: (req, res) => {
    try {
      const { id } = req.params;
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

module.exports = productsController;
