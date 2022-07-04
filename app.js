//import express from "express"
const express = require("express")
const axios = require("axios")

const app = express()
const port = 3000


async function httpRequest(url) {
 
  
  try {
    const httpsResponse = await axios.get(url)
    .then((res => {
      return res.data.results
    }))
    //TODO Data structure to return
    return httpsResponse
  } catch (error) {
    console.log(error)
  }
}



app.get("/api/items", async (req, res) => {
  const searchQuery = req.query.q
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}&limit=4`

  const response = await httpRequest(url)
  res.status(200).send({response: response})
})

// start server and open port 3003
app.listen(port, () => {
  console.log('Listening to port 3000');
});

module.exports = app