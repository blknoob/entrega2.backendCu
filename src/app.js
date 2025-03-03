const express = require('express');
const app = express();
const handlebarsConfig = require('./configs/hbs');
const path = require('path');
const viewsRoutes = require('./routes/viewsRoutes');
const productsRoutes = require('./routes/productsRoutes');
const realTimeProductsRoutes = require('./routes/realTimeProductsRoutes');



handlebarsConfig(app);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', viewsRoutes);
app.use('/', productsRoutes);
app.use('/', realTimeProductsRoutes);


module.exports = app;