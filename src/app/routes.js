// Importar bibliotecas
const express = require('express');
const router = express.Router();

// Importar controles
const productsController = require('./controller/productsController');
const usersControler = require('./controller/usersController');
const movimentsControler = require('./controller/movimentsController');

// Rotas 
router.get('/products', productsController.index);
router.post('/products', productsController.store);

router.get('/users', usersControler.index);
router.post('/users', usersControler.store);
router.delete('/users/:id', usersControler.delete);

router.get('/moviments', movimentsControler.index);
router.post('/users/:user_id/moviments', movimentsControler.store);

module.exports = router;