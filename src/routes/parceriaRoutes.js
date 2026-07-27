const express = require('express');
const router = express.Router();
const parceriaController = require('../controllers/parceriaController');

// Quando chegar um GET na raiz da rota, chame a função listarParcerias
router.get('/', parceriaController.listarParcerias);

// Quando chegar um POST, chame a criarParceria
router.post('/', parceriaController.criarParceria);

// Quando chegar PUT ou DELETE (precisam do ID), chame as respectivas funções
router.put('/:id', parceriaController.atualizarParceria);
router.delete('/:id', parceriaController.deletarParceria);

module.exports = router;