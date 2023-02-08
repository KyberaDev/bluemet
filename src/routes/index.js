const express = require('express');
const router = express.Router();

const DATABASE = require('../database');


router.get('/', async (req, res) => {
    const productos_recientes = await DATABASE.query("SELECT * FROM productos ORDER BY FECHA_SUBIDO LIMIT 4")
    await DATABASE.query("CALL add_view();");
    res.render('index', {productos_recientes});
});

module.exports = router;