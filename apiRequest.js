const axios = require("axios")

async function productsRequest(url) {
  
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


async function descriptionRequest(url) {
  
  try {
    const httpsResponse = await axios.get(url)
    .then((res => res))
    return httpsResponse
  } catch (error) {
    console.log(error)
  }
}

module.exports = { productsRequest, descriptionRequest }