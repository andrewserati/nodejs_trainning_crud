const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://andrew_node:admin123@andrewcluster-oklwj.mongodb.net/test?retryWrites=true&w=majority"
const database = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();

/*
client.connect(err => {
    const db = client.db('andrew-node');
    client.close();
});
*/

database.connect((err, client) => {
    if (err) return console.log(err);
    db = client.db('andrew-node');

    app.listen(3000, function(){
        console.log('server running on port 3000');
    });    

})

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ajs');


app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/', (req, res) => {
    var cursor = db.collection('data').find();
});

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err,results) => {
        if (err) return console.log(err);
        res.render('show.ejs', {data: results})
    })
})

app.post('/show', (req,res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Salvo no banco de dados');
        res.redirect('/show');
    })
});