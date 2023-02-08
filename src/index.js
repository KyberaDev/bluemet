const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { databaseDev } = require('./keys');
const flash = require('connect-flash');
const multer = require('multer');
const { Console } = require('console');


const storage  = multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

//init
const app = express();
require('./lib/passport');
require('./lib/auth');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs');

//middlewares
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MySQLStore(databaseDev)
}))
app.use(flash())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/images'),
    limits: { fileSize : 20000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname)); 
        if (mimetype && extname) {
            req.flash('success', 'Producto añadido con exito.')
            cb(null, true)
        }
    }
}).single('uploadProductImage'))

//Global Variables
app.use((req, res, next) => {
    app.locals.error = req.flash('error')
    app.locals.img_error = req.flash('img_error')
    app.locals.success = req.flash('success')
    app.locals.user = req.user
    next();
});

//Routes
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/content', require('./routes/content'));
app.use('/auth', require('./routes/authentication'));
app.use('/dashboard', require('./routes/dashboard'));

//Public


//Start server

app.listen(app.get('port'), () => {
    console.log('listening on port ' + app.get('port'));
});