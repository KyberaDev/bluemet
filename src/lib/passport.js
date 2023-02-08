const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DATABASE = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField : 'USUARIO',
    passwordField : 'PASSWD',
    passReqToCallback: true
}, async (req, USUARIO, PASSWD, done) => {

    console.log(req.body)
    let { NOMBRE, MAIL, TIPO_USUARIO, userRePass } = req.body;
    const HABILITADO = 1;

    if (PASSWD == userRePass) {

        PASSWD = await helpers.encrypt(PASSWD);

        const NUser = {
            TIPO_USUARIO,
            USUARIO,
            PASSWD,
            MAIL,
            HABILITADO,
            NOMBRE
        }

        const result = await DATABASE.query('INSERT INTO usuarios SET ?', [ NUser ])
        NUser.ID_USUARIO = result.insertId
        return done(null, false)
    }else{
        return done(null, false, req.flash('error', 'Las contraseñas no coinciden.'));
    }
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'userName',
    passwordField: 'passWord',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const user = await DATABASE.query('SELECT * FROM usuarios WHERE USUARIO = ? AND HABILITADO = 1;', [username])

    if (user.length > 0) {

        const userData = user[0];
        const valid = await helpers.match(password, userData.PASSWD);

        if (valid) {
            done(null, userData, req.flash('success', 'Bienvenido'));
        }else{
            done(null, false, req.flash('error', 'Contraseña invalida.'));
        }

    }else{ return done(null, false, req.flash('error', 'El usuario no existe.')) }
}));

passport.serializeUser((user, done) => {
    done(null, user.ID_USUARIO);
});

passport.deserializeUser(async (id, done) => {
    const user = await DATABASE.query('SELECT * FROM usuarios WHERE ID_USUARIO = ?', [id]);
    done(null, user[0]);
});