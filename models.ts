//Aqui encontramos el tipado de las estructuras de datos

export interface ItemData {
  id: String,
  title: String, 
  price: { 
    currency: String, 
    amount: Number, 
    decimals: Number
  },
  picture: String, 
  condition: String, 
  free_shipping: Boolean
}

export interface ProductInfo {
  author: { 
    name:String,
    lastname: String 
  },
  categories: String[], 
  items: ItemData[] 
}

export interface ItemDescription {
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

export interface CategoryData {
  id: string, 
  name: string, 
  results: number
}

export interface RouteData {
  id: string,
  name: string
}
