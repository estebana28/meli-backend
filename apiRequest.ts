import axios from "axios"
import { RouteData, ItemData, ProductInfo, ItemDescription, CategoryData } from "./models"


// En base a los resultados, busca la categoria con mayor cantidad de resultados y obtiene el path de las categorias para dotar al breadcrumb con esa informacion
async function getMatchCategory(categories: [CategoryData]) {
  const highestResultCategory = categories.sort((a: any, b: any) => b.results - a.results)
  const categoryId = highestResultCategory[0].id
  
  try {
    const httpsResponse = await axios.get(`http://api.mercadolibre.com/categories/${categoryId}`)
    .then((res: any) => res.data.path_from_root)
    .then((res: any) => {
      const breadcrumbPath = res.map((route: RouteData) => {
        return route.name
      })
      return breadcrumbPath
    })
    return httpsResponse
  } catch (error) {
    console.log(error, "error");
  }
  return []
}


// Hace un data fetch a la api de MELI y trae los resultados en base al parametro de busqueda
export async function productsRequest(url: string) {
  try {
    const httpsResponse = await axios.get(url)
    .then(async (res: any) =>  {
      const itemsArray = res.data.results.map((result: any) => {
        const itemData: ItemData = {
          id: result.id,
          title: result.title,
          price: {
            currency: result.currency_id,
            amount: result.price,
            decimals: result.decimals || "",
          },
          picture: result.thumbnail,
          condition: result.condition,
          free_shipping: result.shipping.free_shipping,
        }
        return itemData
      });
      console.log(itemsArray);
      
      const categoryResult: string[] = await getMatchCategory(res.data.available_filters[0].values)
      const results: ProductInfo = {
        author: { 
          name: "Esteban",
          lastname: "Arce" 
        },
        categories: categoryResult,
        items: itemsArray
      }
      return results
    });
    return httpsResponse
  } catch (error) {
    console.log(error)
  }
}

// Hace un data fetch de la descripcion de un producto
export async function descriptionRequest(urlId: string, urlDesc: string) {
  const promiseId = await axios.get(urlId)
  const promiseDesc = await axios.get(urlDesc)
  
  const httpsResponse = Promise.all([promiseId, promiseDesc])
  .then(values => {
    const itemData: ItemDescription = {
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