export async function getData() {
    try {
        let response = await fetch('https://fakestoreapi.com/products')
        let data = await response.json()
        data.sort((a, b) => a.price - b.price);
        return await data;
    } catch (error) {
        console.log(error);
    }
}
export function getcookie() {
    let valuesArray = document.cookie.split(',').filter(value => !isNaN(value)).filter(value => value != '');

    if (valuesArray[-1] == '') {
        nonEmptyValues.pop();
    }

    return valuesArray;

}
export function UpdateCookie(values) {
    document.cookie = `${values}; expires=Thu, 01 Jan 2025 00:00:00 UTC;`;
}
