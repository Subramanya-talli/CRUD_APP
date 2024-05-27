const express = require('express');
const dotenv = require("dotenv");
const morgan = require('morgan');
const bodyparser = require('body-parser');
const app = express();
const path = require('path')

const connectDB = require('./server/database/connection.js')

dotenv.config({path : "config.env"})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//mongodb Connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine","ejs")

// load Assets
app.use('/CSS', express.static(path.resolve(__dirname, "assets/CSS")) )
app.use('/img', express.static(path.resolve(__dirname, "assets/img")) )
app.use('/js', express.static(path.resolve(__dirname, "assets/js")) )

app.use('/', require('./server/routes/router'))

app.listen(3000, ()=>{
    console.log(`Server is now running in ${PORT}`)
});