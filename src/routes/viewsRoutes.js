const express = require("express");
const router = express.Router();

router.get("/products", (req, res) => {
  res.render("partials/home");
});

router.get("/realtimeproducts", (req, res) => {
  res.render("partials/realtimeproducts");
});

module.exports = router;
