// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware para manejar CORS
app.use(cors());
app.use(express.json());

// Rutas
const databasePath = path.resolve(__dirname, '../database');

// Inicializar archivos de datos si no existen
const initializeDataFile = (fileName) => {
    const filePath = path.join(databasePath, `${fileName}.js`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `module.exports = [];`);
    }
};

initializeDataFile('menu');
initializeDataFile('pedidos');

// Cargar datos al inicio del servidor
let menuData = require('../database/menu');
let pedidosData = require('../database/pedidos');

app.get('/menu', (req, res) => {
    try {
        res.json(menuData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/pedidos', (req, res) => {
    try {
        res.json(pedidosData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/pedidos', (req, res) => {
    try {
        const newPedido = {
            id: pedidosData.length + 1,
            pedido: req.body.pedido, 
            nombre: req.body.nombre,
        };

        pedidosData.push(newPedido);
        fs.writeFileSync(path.join(databasePath, 'pedidos.js'), `module.exports = ${JSON.stringify(pedidosData, null, 2)};`);

        res.json(newPedido);
    } catch (error) {
        console.error('Error en POST /pedidos:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
