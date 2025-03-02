const express = require('express');
const app = express();
const handlebarsConfig = require('./configs/hbs');
const path = require('path');
const viewsRoutes = require('./routes/viewsRoutes');



handlebarsConfig(app);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', viewsRoutes);


module.exports = app;