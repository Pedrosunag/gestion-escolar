const express = require('express');
const router = express.Router();
const clasesController = require('../controllers/clasesController');

router.get('/', clasesController.getClases);
router.get('/:id', clasesController.getClaseById);
router.post('/', clasesController.createClase);
router.put('/:id', clasesController.updateClase);
router.delete('/:id', clasesController.deleteClase);

module.exports = router;