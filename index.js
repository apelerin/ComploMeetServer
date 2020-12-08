require('dotenv').config()

let express = require('express')
let app = express();
var port = process.env.PORT || 4040;

app.get('/', (req, res) => res.send('Welcome to Express')); // keeping that for example, to delete



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})
