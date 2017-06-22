const express = require('express')
const app = express()
const port = 5000
var facts = require('./facts')
var favourites = []

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/facts/random', function (req, res) {
    const index = Math.floor(Math.random()*facts.length);
    const fact = facts[index];
    res.send({ id: index, fact: fact })
})

app.get('/facts/favourite/:id', function(req, res){ 
    const id = req.params.id
    const fact = facts[id]
    if(!fact){
        res.sendStatus(404)
    }
    else{
        favourites.push({ id: id, fact: fact })
        res.sendStatus(200)
    }
})

app.get('/facts/favourites', function(req, res){
    res.send(favourites)
})

app.listen(port)
console.log(`Listening on port ${port}`)

//