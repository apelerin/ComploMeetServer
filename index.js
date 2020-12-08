require('dotenv').config()

let express = require('express')
let app = express();
var port = process.env.PORT || 4040;

app.get('/', (req, res) => res.send('Welcome to Express')); // keeping that for example, to delete

app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

let apiRouter = require("./router")
app.use('/api', apiRouter)

let mongoose = require('mongoose');

//connect to mongoose
const dbCredentials = process.env.DB_USER + ':' + process.env.DB_PASSWORD;
const dbHostName = process.env.DB_IP + '/' + process.env.DB_NAME;
dbUri = "mongodb://" + dbCredentials + '@' + dbHostName;
options = {useNewUrlParser: true, useUnifiedTopology: true};
const mongo = mongoose.connect(dbUri, options);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})
