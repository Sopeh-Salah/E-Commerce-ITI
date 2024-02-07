function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}
function isValidPassword(password) {
    var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%^&*!]).{8,}$/;

    return passwordPattern.test(password);
}

let email = document.getElementById("email")
let password = document.getElementById("Password")
let contactus = document.getElementById("contactus")


contactus.addEventListener("click", function () {
    if (isValidEmail(email.value)) {
        if (isValidPassword(password.value)) {
            console.log(password.value);
            alert("Thank you for contacting us we will send you an email sooner")
        } else {
            alert("The password must contain uppercase and lowercase letters, and must contain any distinctive characters")
        }
    } else {
        alert("The email must contain @")
    }
})
