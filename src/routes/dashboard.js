const express = require('express');
const router = express.Router();
const DATABASE = require('../database');
const { loggedIn } = require('../lib/auth');
const passport = require('passport');
const helpers = require('../lib/helpers');

router.get('/', loggedIn, async (req, res) => {
    const visitas_productos = await DATABASE.query("SELECT SUM(VISTAS) AS vistas FROM Productos;");
    const visitas = await DATABASE.query("SELECT * FROM visitas");
    const usuarios_dashboard = await DATABASE.query("SELECT ID_USUARIO, NOMBRE, TIPO_USUARIO, HABILITADO FROM usuarios WHERE USUARIO != ?", [req.user.USUARIO]);
    const productos = await DATABASE.query("SELECT * FROM productos ORDER BY FECHA_SUBIDO DESC LIMIT 16");
    const count_productos = await DATABASE.query("SELECT COUNT(*) as cantidad_productos FROM productos");

    const isAdmin = (req.user.TIPO_USUARIO == 0 || req.user.TIPO_USUARIO == 1) ? true : false; 

    const data = {
        productos: { productos },
        usuarios: { usuarios_dashboard },
        count_productos: count_productos[0],
        visitas_productos: visitas_productos[0],
        visitas: visitas[0],
        user: req.user.USUARIO,
        isAdmin
    }

    res.render('dashboard/dashboard', { data });
});

router.get('/analytics', loggedIn, async (req, res) => {
    const visitas_productos = await DATABASE.query("SELECT SUM(VISTAS) AS vistas FROM Productos;");
    const visitas = await DATABASE.query("SELECT * FROM visitas");
    const usuarios_dashboard = await DATABASE.query("SELECT ID_USUARIO, NOMBRE, TIPO_USUARIO, HABILITADO FROM usuarios WHERE USUARIO != ?", [req.user.USUARIO]);
    let productos = await DATABASE.query("SELECT * FROM productos ORDER BY VISTAS DESC LIMIT 10");
    const count_productos = await DATABASE.query("SELECT COUNT(*) as cantidad_productos FROM productos");

    const isAdmin = (req.user.TIPO_USUARIO == 0 || req.user.TIPO_USUARIO == 1) ? true : false; 
    productos = porcentajes(productos, visitas_productos[0].vistas);

    const data = {
        productos: { productos },
        usuarios: { usuarios_dashboard },
        count_productos: count_productos[0],
        visitas_productos: visitas_productos[0],
        visitas: visitas[0],
        user: req.user.USUARIO,
        isAdmin
    }
    
    res.render('dashboard/analytics', { data });
});

router.get('/productos', loggedIn, async (req, res) => {
    const productos = await DATABASE.query("SELECT * FROM productos");
    const data = {
        productos,
        isAdmin: (req.user.TIPO_USUARIO == 0 || req.user.TIPO_USUARIO == 1) ? true : false 
    }
    res.render('dashboard/productos', { data });
});

router.get('/addUser', loggedIn, async (req, res) => {
    const data = {
        isAdmin: true
    }
    res.render('dashboard/addUser', { data });
});

router.post('/addUser', loggedIn, (req, res, next) => {
    passport.authenticate('local.signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/dashboard/addUser',
        failureFlash: true
    })(req, res, next)
});

router.get('/addProduct', loggedIn, (req, res) => {
    const data = {
        isAdmin: (req.user.TIPO_USUARIO == 0 || req.user.TIPO_USUARIO == 1) ? true : false 
    }
    res.render('dashboard/addProduct', { data })
});

router.post('/addProduct', loggedIn, async (req, res) => {

    const IMG = `/images/${req.file.originalname}`;
    let { NOMBRE_PRODUCTO, PROCEDENCIA, CATEGORIA, TIPO_PRODUCTO, STOCK } = req.body
    TIPO_PRODUCTO = ('0') ? null : TIPO_PRODUCTO;

    const product = {
        NOMBRE_PRODUCTO,
        PROCEDENCIA,
        CATEGORIA,
        TIPO_PRODUCTO,
        STOCK,
        IMG
    }

    await DATABASE.query('INSERT INTO productos SET ?', [ product ])
    res.render('dashboard/addProduct')

});

router.post('/disableUser/:user', loggedIn, async (req, res) => {
    const user = req.params.user
    await DATABASE.query('UPDATE usuarios SET HABILITADO = ? WHERE ID_USUARIO = ?', [0, user])
    res.redirect('/dashboard');
});

router.post('/enableUser/:user', loggedIn, async (req, res) => {
    const user = req.params.user
    await DATABASE.query('UPDATE usuarios SET HABILITADO = ? WHERE ID_USUARIO = ?', [1, user])
    res.redirect('/dashboard');
});

router.get('/editUser/:user', loggedIn, async (req, res) => {
    const user = req.params.user
    const userData = await DATABASE.query('SELECT ID_USUARIO, TIPO_USUARIO, MAIL, NOMBRE, USUARIO FROM usuarios WHERE ID_USUARIO = ?', [user]);
    const data = {
        userData : {userData},
        isAdmin: true
    }
    res.render('dashboard/editUser', { data })
});

router.post('/editUser/:user', loggedIn, async (req, res) => {
    const user = req.params.user
    const newUserData = req.body
    await DATABASE.query('UPDATE usuarios SET ? WHERE ID_USUARIO = ?', [newUserData, user])
    res.redirect('/dashboard')
});

router.get('/settings', loggedIn, async (req, res) => {
    const data = {
        isAdmin: true
    }
    res.render('dashboard/settings', { data })
});

router.post('/modifyUser', loggedIn, async (req, res) => {
    const newUserData = req.body
    await DATABASE.query('UPDATE usuarios SET ? WHERE ID_USUARIO = ?', [newUserData, req.user.ID_USUARIO])
    res.redirect('/dashboard/settings')
});

router.post('/changePassword', loggedIn, async (req, res) => {
    const passwordChangeFormData = req.body
    const oldPasswordValid = await helpers.match(passwordChangeFormData.OLD_PASSWORD, req.user.PASSWD);
    if (oldPasswordValid) {
        if (passwordChangeFormData.PASSWD === passwordChangeFormData.RE_PASSWORD) {
            const hash = await helpers.encrypt(passwordChangeFormData.PASSWD)
            const data = {
                PASSWD : hash
            }
            await DATABASE.query('UPDATE usuarios SET ? WHERE ID_USUARIO = ?', [data, req.user.ID_USUARIO])
        }else{ 
            req.flash('error', 'Las contraseñas no coinciden.') 
            console.log('Las contraseñas no coinciden.')
        }
    }else { 
        req.flash('error', 'La contraseña es incorrecta.') 
        console.log('La contraseña es incorrecta.')
    }
    res.redirect('/dashboard/settings')
});

module.exports = router;

function porcentajes(productos, total_visitas){
    productos.forEach(producto => {
        const porcentaje = (parseFloat(producto.VISTAS) * 100) / total_visitas;
        producto.PORCENTAJE = Math.round(porcentaje)
    });
    return productos;
}