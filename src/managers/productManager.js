const fs = require("fs");
const path = require("path");
const express = require("express");

class ProductManager {
  constructor() {
    this.db = path.join(__dirname, "../db/products.json");
    this.products = this.loadProducts();
    this.id = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
  }

  loadProducts() {
    try {
      if (!fs.existsSync(this.db)) {
        fs.writeFileSync(this.db, JSON.stringify([]));
      }
      return JSON.parse(fs.readFileSync(this.db, "utf-8"));
    } catch (error) {
      console.error("Error al cargar productos:", error.message);
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.db, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error("Error al guardar productos:", error.message);
    }
  }

  addProduct(title, description, code, price, stock, category, thumbnail) {
    if (
      !title ||
      !description ||
      !code ||
      !price ||
      !stock ||
      !category ||
      !thumbnail
    ) {
      return { error: "Faltan datos" };
    }

    try {
      const newProduct = {
        id: this.id,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnail,
      };
      this.products.push(newProduct);
      this.saveProducts();
      this.id++;
      return newProduct;
    } catch (error) {
      console.error("Error al agregar producto:", error.message);
      return { error: "No se pudo agregar el producto" };
    }
  }

  getProducts() {
    try {
      // console.log("Desde get",this.products);
      return this.products;
    } catch (error) {
      console.error("Error al obtener productos:", error.message);
      return { error: "No se pudieron obtener los productos" };
    }
  }

  deleteProduct(id) {
    try {
      const index = this.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
        this.saveProducts();
        return { success: "Producto eliminado" };
      }
      return { error: "Producto no encontrado" };
    } catch (error) {
      console.error("Error al eliminar producto:", error.message);
      return { error: "No se pudo eliminar el producto" };
    }
  }
}

module.exports = ProductManager;
