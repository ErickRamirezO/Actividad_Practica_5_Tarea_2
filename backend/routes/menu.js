// backend/routes/adopters.js
const express = require('express');
const router = express.Router();
const db = require('../../database/menu');

// Obtener la lista de la comida disponible
router.get('/', (req, res) => {
    res.json(db);
});

module.exports = router;
