// Author : Vibhav Deo
const app = require('express')();
const http = require('http').Server(app);
//const io = require('socket.io')(http);
const cors = require('cors');
const Config = require('./Config')
const dbhelper = require('./dbHelper')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const util = require('util')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(dbhelper.openConnection());

app.use('/',routes)
http.listen(Config.APP_CONSTANTS.SERVER.PORT, function () {
    console.log('https://localhost:'+Config.APP_CONSTANTS.SERVER.PORT);
});