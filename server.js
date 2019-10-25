const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://andrew_node:admin123@andrewcluster-oklwj.mongodb.net/test?retryWrites=true&w=majority"
const kennedy = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();

/*
client.connect(err => {
    const db = client.db('andrew-node');
    client.close();
});
*/

kennedy.connect((err, client) => {
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

app.post('/show', (req,res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Salvo no banco de dados');
        res.redirect('/');
        db.collection('data').find().toArray((err, results) => {
            console.log(results);
        })
    })
});