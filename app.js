//import express from "express"
const express = require("express")
const axios = require("axios")
const { descriptionRequest, productsRequest } = require("./apiRequest")

const app = express()
const port = 3000


app.get("/api/items", async (req, res) => {
  const searchQuery = req.query.q
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}&limit=4`

  const response = await productsRequest(url)
  res.status(200).send({response: response})
})

app.get("/api/items/:id", async (req, res) => {
  const searchId = req.params.id
  const url = `https://api.mercadolibre.com/items/${searchId}`

  const response = await descriptionRequest(url)
  res.status(200).send({response: response})
})

// start server and open port 3003
app.listen(port, () => {
  console.log('Listening to port 3000');
});

module.exports = app