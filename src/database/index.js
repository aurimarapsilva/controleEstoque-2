// Importar bibliotecas
const Sequelize = require('sequelize');
const dbConfig = require('../config/dataBase');

// Importar Models
const Product = require('../app/models/Product');
const User = require('../app/models/User');
const Moviments = require('../app/models/Moviments');
const MovimentsItems = require('../app/models/MovimentsItems');

// Conectar ao banco
const connection = new Sequelize(dbConfig);

Product.init(connection);
User.init(connection);
Moviments.init(connection);
MovimentsItems.init(connection);

Moviments.associate(connection.models);
MovimentsItems.associate(connection.models);
User.associate(connection.models);
Product.associate(connection.models);

module.exports = connection;