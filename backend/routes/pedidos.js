// backend/routes/pedidos.js
const express = require('express');
const router = express.Router();
const db = require('../../database/pedidos');


// Obtener la lista de pedidos
router.get('/', (req, res) => {
    res.json(db);
});

module.exports = router;
