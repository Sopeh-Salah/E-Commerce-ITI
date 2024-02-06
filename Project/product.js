import { getData } from "./functions.js";
let data = await getData()
let index = new URLSearchParams(window.location.search).get('valueToPass');
let parentdiv = document.getElementById("productinfo")
let title = document.createElement('p')
title.innerHTML = data[index].title
title.id = "productTitle"
let img = document.createElement('img')
img.src = data[index].image
img.id = 'productimg'
let description = document.createElement('p')
description.innerHTML = data[index].description
description.id = "productDescription"

console.log(data);
parentdiv.append(title, img, description)
