const express = require('express');
const  cron  = require('node-cron');
const fetch = require('node-fetch');
const http = require('http')
const { Server } = require("socket.io");
const cors = require('cors');
const { info } = require('console');
const port = 3000;
const app = express();

app.use(cors())

const server = http.createServer(app)

var interval = setInterval(updateData, 2000);



const io = new Server(server, {
    transports:['polling'],
    cors: {
        origin:'*',
        methods: ["GET","POST"]
    }
})



var cachedData;


io.on('connection', function(socket){
    console.log('user is connected '+socket.id)
    io.sockets.emit('data',cachedData);

})


function updateData() {
    fetch('https://api.coincap.io/v2/assets')
      .then(response=>response.json())
      .then(result => {
        cachedData = result;
        io.sockets.emit('data', result);
    })
  }
  




server.listen(port, () => {
    console.log(`test server listening at http://localhost:${port}`)
})



values = [];
cron.schedule("*/2 * * * * *", async function() {
    const response = await fetch('https://api.coincap.io/v2/assets');
    const body = await response.json();
    body.data.map((item) => {
        if(values.length >= 100){
            values = [];
        }
        values.push(item)
    })
});


app.get('/', async function(req,res) {
    res.send(values)
})


app.get('/crypto/:id', async (req , res) => {
    const id = req.params.id
    const fetchData = await fetch(`https://api.coincap.io/v2/assets/${id}`, {
        'method': 'GET',
    })
    const cryptos = await fetchData.json()
    res.send(cryptos)  
  });