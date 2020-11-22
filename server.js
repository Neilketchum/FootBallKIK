const express = require('express')
const bodyParser = require("body-parser")
const ejs = require('ejs')
const http = require('http')
const container  = require('./container');

container.resolve(function(users){
    const app = SetupExpress();


    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(8080,function(){
            console.log(`server running at port 8080`)
        })
    }
    // Set up Router
    const router = require('express-promise-router')();
    users.SetRouting(router);
    

    app.use(router);
})