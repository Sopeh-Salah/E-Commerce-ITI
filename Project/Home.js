import { getData, getcookie, UpdateCookie } from "./functions.js";
var slider_img = document.querySelector('.slider-img');
var products = document.getElementById('products');
let nextBtn = document.getElementById("nextBtn")
let prevBtn = document.getElementById("prevBtn")
var imgIndex = 0;
let cookieValue = '';

let data = await getData();
let AddCartButton = await ShowAProductsForButton();
console.log(AddCartButton);
slider_img.setAttribute('src', data[imgIndex].image);
prevBtn.addEventListener("click", async function () {
    if (imgIndex <= 0) imgIndex = data.length;
    imgIndex--;
    return slider_img.setAttribute('src', data[imgIndex].image);
})
nextBtn.addEventListener("click", async function () {
    let data = await getData();
    if (imgIndex >= data.length - 1) imgIndex = -1;
    imgIndex++;
    return slider_img.setAttribute('src', data[imgIndex].image);
})
async function SetCategories() {
    let data = await getData()
    let categoryset = new Set();
    let categoriesDiv = document.getElementById("categories")
    data.forEach(obj => {
        categoryset.add(obj.category);
    });

    let category = Array.from(categoryset)

    for (let i = 0; i < category.length; i++) {
        var button = document.createElement('button');
        button.textContent = category[i];
        button.value = category[i];
        button.className = "category"
        categoriesDiv.appendChild(button);
    }
    return Array.from(document.getElementsByClassName("category"))
}

let categorybuttons = await SetCategories()
for (let i = 0; i < categorybuttons.length; i++) {
    categorybuttons[i].addEventListener("click", async function () {
        AddCartButton = await ShowAProductsForButton(categorybuttons[i].value);
        AddCartValue()
    })
}

async function ShowAProductsForButton(btnValue = 0) {
    if (btnValue == 0) {
        for (let i = 0; i < data.length; i++) {
            let product = document.createElement('div')
            product.className = "Products"
            let img = document.createElement('img');
            img.src = data[i].image
            let addCart = document.createElement('button')
            let ReadMore = document.createElement('a')
            addCart.className = "productBtn ACart";
            ReadMore.className = "productBtn ReadMore";
            addCart.innerHTML = "Add Cart"
            ReadMore.innerHTML = "Read More"
            addCart.id = "AddCart"
            addCart.value = data[i].id;
            ReadMore.id = "ReadMore";
            ReadMore.href = `product.html?valueToPass=${i}`
            let price = document.createElement('h6')
            price.innerHTML = `Price : ${data[i].price}$`
            price.id = "price";
            product.append(price)
            product.append(img, addCart, ReadMore)
            products.append(product)
            ReadMore.addEventListener("click", function () {
                open("product.html", "_Parent")
            })
        }
        return {
            addCart: Array.from(document.getElementsByClassName("ACart")),
            ReadMore: Array.from(document.getElementsByClassName("ReadMore"))
        }
    } else {
        products.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i].category == btnValue) {
                let product = document.createElement('div')
                product.className = "Products"
                let img = document.createElement('img');
                img.src = data[i].image
                let addCart = document.createElement('button')
                let ReadMore = document.createElement('button')
                addCart.className = "productBtn ASCart";
                ReadMore.className = "productBtn SReadMore";
                addCart.innerHTML = "Add Cart"
                ReadMore.innerHTML = "Read More"
                addCart.id = "AddCart"
                addCart.value = data[i].id;
                ReadMore.id = "ReadMore";
                ReadMore.value = data[i].id;
                let price = document.createElement('h6')
                price.id = "price";
                price.innerHTML = `Price : ${data[i].price}$`
                product.append(price)
                product.append(img, addCart, ReadMore)
                products.append(product)
            }
        }
        return {
            addCart: Array.from(document.getElementsByClassName("ASCart")),
            ReadMore: Array.from(document.getElementsByClassName("SReadMore"))
        }
    }

}

function AddCartValue() {
    for (let i = 0; i < AddCartButton.addCart.length; i++) {
        AddCartButton.addCart[i].addEventListener("click", function () {
            cookieValue += `${AddCartButton.addCart[i].value},`;
            UpdateCookie(cookieValue)
            addToCart();
        })
    }
}
AddCartValue()


function addToCart() {
    let nonEmptyValues = getcookie()
    let carBtn = document.getElementById("carBtn");
    carBtn.textContent = `cart(${nonEmptyValues.length})`
}

