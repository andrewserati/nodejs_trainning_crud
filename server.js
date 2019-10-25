const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://andrew_node:<password>@andrewcluster-oklwj.mongodb.net/test?retryWrites=true&w=majority"
const app = express();

MongoClient.connect(uri, (err,client) => {
    // .. start the server
});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ajs');

app.listen(3000, function(){
    console.log('server running on port 3000');
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/show', (req,res) => {
    console.log(req.body);
});

