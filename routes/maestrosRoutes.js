const express = require('express');
const router = express.Router();
const maestrosController = require('../controllers/maestrosController');

router.get('/', maestrosController.obtenerMaestros);
router.get('/:id', maestrosController.obtenerMaestroPorId);
router.post('/', maestrosController.agregarMaestro);
router.put('/:id', maestrosController.actualizarMaestro);
router.delete('/:id', maestrosController.eliminarMaestro);

module.exports = router;