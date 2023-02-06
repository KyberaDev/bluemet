const express = require('express');
const router = express.Router();
const DATABASE = require('../database');

router.get('/productos', async (req, res) => {
    const productos = await DATABASE.query("SELECT * FROM productos")
    res.render('content/productos', {productos});
});

module.exports = router;