import { getData, getcookie, UpdateCookie } from "./functions.js";
let TotalPrice = document.getElementById("TotalPrice");
let priceforproduct = document.getElementsByClassName("TotalProductPrice")
let Checkout = document.getElementById("Checkout")
let data = await getData()
let cookie = getcookie()
console.log(cookie);
let cart = document.getElementById("cart")
for (let i = 0; i < cookie.length; i++) {
    for (let j = 0; j < data.length; j++) {
        if (cookie[i] == data[j].id) {
            let product = document.createElement('div')
            product.className = "Products"
            product.id = `${data[j].id}`;
            let img = document.createElement('img');
            img.src = data[j].image
            let remove = document.createElement('button')
            remove.className = "productBtn  Removbtn"
            remove.id = "removBtn"
            remove.innerHTML = "Remove"
            remove.value = data[j].id;
            let numOfProducts = document.createElement('input')
            let TotalProductPrice = document.createElement('textarea')
            numOfProducts.type = "number"
            numOfProducts.className = "productCount productelem"
            numOfProducts.min = 1;
            numOfProducts.defaultValue = 1
            TotalProductPrice.value = data[j].price * numOfProducts.value
            numOfProducts.addEventListener("input", function () {
                TotalProductPrice.value = (data[j].price * numOfProducts.value).toFixed(2);
                TotalPrice.value = sum(priceforproduct);
            })
            TotalProductPrice.readOnly = true;
            TotalProductPrice.className = "TotalProductPrice productelem"
            let price = document.createElement('h6')
            price.innerHTML = `Price : ${data[j].price}$`
            price.id = "price";
            product.append(price)
            product.append(img, remove, numOfProducts, TotalProductPrice)
            cart.append(product)
        }
    }
}
let removeBtns = document.getElementsByClassName("Removbtn")
for (let index = 0; index < removeBtns.length; index++) {
    removeBtns[index].addEventListener("click", function () {
        console.log(cookie);
        let indexToRemove = cookie.indexOf(removeBtns[index].value)
        cookie.splice(indexToRemove, 1);
        UpdateCookie(cookie);
        console.log(cookie);
        let removeddiv = document.getElementById(`${removeBtns[index].value}`)
        removeddiv.remove()
        TotalPrice.value = sum(priceforproduct);
    })
}

TotalPrice.value = sum(priceforproduct);
function sum(Btn) {
    let sum = 0;
    for (let i = 0; i < Btn.length; i++) {
        sum += parseInt(Btn[i].value);
    }
    return sum
}
Checkout.addEventListener("click", function () {
    let newcookie = []
    UpdateCookie(newcookie)
    cookie = getcookie()
    TotalPrice.value = 0;
    let divs = document.getElementsByClassName("Products")
    while (divs.length > 0) {
        divs[0].remove();
    }
    alert("Your purchase was completed successfully")
})