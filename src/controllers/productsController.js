const ProductManager = require("../managers/productManager");
const productManager = new ProductManager();

const productsController = {
  getProducts: (req, res) => {
    try {
      res.status(200).json(productManager.getProducts());
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productsController;
