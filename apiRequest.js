const axios = require("axios")

const ItemDescription = {
  author: { 
    name:String,
    lastname: String 
  },
  item: {
    id: String,
    title: String,
    price: {
      currency: String,
      amount: Number,
      decimals: Number,
  },
  picture: String,
  condition: String,
  free_shipping: Boolean,
  sold_quantity: Number,
  description: String,
  }
}

async function productsRequest(url) {
  try {
    const httpsResponse = await axios.get(url)
    .then((res) => {
      const data = res.data.results.map(item => {
      const itemData = {
        author: { 
          name: "Esteban",
          lastname: "Arce" 
        },
        item: {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: item.decimals || null,
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: "descripcion",
        }
      }
      return itemData
    });
      return data
    });
    return httpsResponse
  } catch (error) {
    console.log(error)
  }
}


async function descriptionRequest(urlId, urlDesc) {
  const promiseId = await axios.get(urlId)
  const promiseDesc = await axios.get(urlDesc)

  const httpsResponse = Promise.all([promiseId, promiseDesc])
  .then(values => {
    const itemData = {
      author: { 
        name: "Esteban",
        lastname: "Arce" 
      },
      item: {
        id: values[0].data.id,
        title: values[0].data.title,
        price: {
          currency: values[0].data.currency_id,
          amount: values[0].data.price,
          decimals: values[0].data.decimals || null,
      },
      picture: values[0].data.pictures[0].secure_url,
      condition: values[0].data.condition,
      free_shipping: values[0].data.shipping.free_shipping,
      sold_quantity: values[0].data.sold_quantity,
      description: values[1].data.plain_text,
      }
    }
    return itemData
  })
  return httpsResponse
}

module.exports = { productsRequest, descriptionRequest }