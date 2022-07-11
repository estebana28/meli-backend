const express = require("express")
import { descriptionRequest, productsRequest } from "./apiRequest"

const app = express()
const port = 3003


// Endpoint de busqueda
app.get("/api/items", async (req, res) => {
  const searchQuery = req.query.q
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}&limit=4`

  const response = await productsRequest(url)
  res.status(200).send({response: response})
})


// Endpoint de fetching para descripcion del articulo solicitado
app.get("/api/items/:id", async (req, res) => {
  const searchId = req.params.id
  const urlId = `https://api.mercadolibre.com/items/${searchId}`
  const urlDesc = `https://api.mercadolibre.com/items/${searchId}/description`

  const response = await descriptionRequest(urlId, urlDesc)
  res.status(200).send({response: response})
})

// start server and open port 3003
app.listen(port, () => {
  console.log('Listening to port 3003');
});