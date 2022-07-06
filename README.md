# Repositorio para el backend del challenge de MercadoLibre

Este repositorio tiene como objetivo de dotar al frontend de una API para hacer de intermediario con la API de ML.

Consta de 2 endpoints que son los siguientes.

**/items?search=query**

A este endpoint le llega la query de la caja de busqueda desde el frontend.
El mismo se encarga de realizar una llamda https a la API de ML y establece un limite de 4 resultados (exigido por el challenge.)

**/items/:id**

En este endpoint iremos a buscar toda la descripcion del producto seleccionado.