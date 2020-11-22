const express = require('express')
const bodyParser = require("body-parser")
const http = require('http')
const cookieParser = require('cookie-parser')
const validator = require('express-validator');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const flash = require("connect-flash")
const passport = require('passport')


const container = require('./container');

container.resolve(function (users) {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb+srv://neil:123@cluster0.ymdvf.mongodb.net/<dbname>?retryWrites=true&w=majority",
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then((req, res) => {
            if (req) {
                console.log("Connected")
            } else {
                console.log("rejected")
            }
        })
    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(8080, function () {
            console.log(`server running at port 8080`)
        })
        configureExpress(app);
        // Set up Router
        const router = require('express-promise-router')();
        users.SetRouting(router);


        app.use(router);
    }
    function configureExpress(app) {
        app.use(express.static('public'));
        app.set('view engine', "ejs");
        app.set(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(validator());
        app.use(session({
            secret: "janclncaklnkcnalcnlkcnxcnca",
            resave: "true",
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }))
        app.use(flash())
        app.use(passport.initialize());
        app.use(passport.session());

    }
})