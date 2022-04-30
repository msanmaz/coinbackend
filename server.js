const express = require('express');
const  cron  = require('node-cron');
const fetch = require('node-fetch')
const port = 3000;
const app = express();

app.listen(port, () => {
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
    console.log('every 2sec')
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