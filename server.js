const express = require('express');
const fetch = require('node-fetch')
const port = 3000;
const app = express();

app.listen(port, () => {
    console.log(`test server listening at http://localhost:${port}`)
})



recursive = 

app.get('/', async (req, res) => {

    const fetchApi = await fetch('https://api.coincap.io/v2/assets', {
        'method': 'GET',
    })
    const cryptos = await fetchApi.json()
    setInterval(cryptos,60000)
    res.send(cryptos)
})


app.get('/crypto/:id', async (req , res) => {
    const id = req.params.id
    const fetchData = await fetch(`https://api.coincap.io/v2/assets/${id}`, {
        'method': 'GET',
    })
    const cryptos = await fetchData.json()
    res.send(cryptos)  
  });