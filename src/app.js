var express = require('express');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
// var db = require('./db/init-db')
var router = express.Router()
let apiLogger = require("./middlewares/apiLogger");

var app = express();

// Overwrite res.send
app.use(apiLogger);
// a middleware function with no mount path. This code is executed for every request to the router


app.use(compression()); //Compress all routes
app.use(helmet());
app.use(cors());

var oauth = require('./routes/oauth');
var apps = require('./routes/apps');
var ctypes = require('./routes/contentTypes');
var assets = require('./routes/assets');
var contents = require('./routes/contents');
var spaces = require('./routes/spaces');

// a middleware function with no mount path. This code is executed for every request to the router

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use("/auth", oauth);
app.use("/apps", apps);
app.use("/ctypes", ctypes);
app.use("/assets", assets);
app.use("/contents", contents);
app.use("/spaces", spaces);
module.exports = app;