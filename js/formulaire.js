
//function that send data to api with post request

function sendData() {
    let formData = {};//create an array tu stock data from form
    formData.lastName = document.getElementById("lastname").value;
    formData.firstName = document.getElementById("firstname").value;
    formData.address = document.getElementById("address").value;
    formData.city = document.getElementById("city").value;
    formData.email = document.getElementById("email").value;
    let products = localStorage.getItem("product");//get localStorage
    products = products.split(",");//split element with ,
    let body = JSON.stringify({ "contact": formData, "products": products });
    console.log(body)
    fetch("http://localhost:3000/api/teddies/order", {//methode post
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body,
    }).then(response => {//get json response
        console.log(response.status);
        if (response.status != 200 && response.status != 201 && response.status != 204) {//if response doesn't 200 
            throw new Error("Not 2xx response")
        }
        return response.json()
    })
        .then(function (response) { 
            response = JSON.stringify(response);
            localStorage.setItem("response", response);// localStorage command is send by api 
            responseId = JSON.parse(response).orderId;
            console.log(response)
            clearCart();//delete cart
            window.location.href = `validation.html?id=${responseId}`;//open html page to display commande validation 
        });
};

//function use to make input of form required before validation 

function required() {
    var lastname = document.forms["validationForm"]["lastname"];
    var firstname = document.forms["validationForm"]["firstname"];
    var address = document.forms["validationForm"]["address"];
    var city = document.forms["validationForm"]["city"];
    var email = document.forms["validationForm"]["email"];
    let classesToAdd = ['border', 'border-danger'];
    let lastnameRegex = /^[A-Za-z-'\s]{1,50}$/g;
    let firstnameRegex = /^[A-Za-z-'\s]{1,25}$/g;
    let cityRegex = /^[A-Za-z-'\s]{1,75}$/g;
    
    if (lastname.value == "") {//add required to input in form
        document.getElementById('lastname').classList.add(...classesToAdd);//add class at class already exist 
        document.getElementById('lastNameDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    } else if (!lastnameRegex.test(lastname.value)) {
        document.getElementById('lastname').classList.add(...classesToAdd);//add class at class already exist 
        document.getElementById('lastNameDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Votre nom doit contenir au moins 1 lettre seulement le (- et ') sont autorisés</p>
            </div>`;
    };

    if (firstname.value == "") {
        document.getElementById('firstname').classList.add(...classesToAdd);
        document.getElementById('firstNameDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    }
    else if (!firstnameRegex.test(firstname.value)) {
        document.getElementById('firstname').classList.add(...classesToAdd);//add class at class already exist 
        document.getElementById('firstNameDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Votre prénom doit contenir au moins 1 lettre seulement le (- et ') sont autorisés</p>
            </div>`;
    };

    if (address.value == "") {
        document.getElementById('address').classList.add(...classesToAdd);
        document.getElementById('addressDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    };

    if (city.value == "") {
        document.getElementById('city').classList.add(...classesToAdd);
        document.getElementById('cityDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    };

    if (!cityRegex.test(city.value)) {
        document.getElementById('city').classList.add(...classesToAdd);//add class at class already exist 
        document.getElementById('cityDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Ne peux contenir des caractères autres que - et '</p>
            </div>`;
    };

    if (email.value == "") {
        document.getElementById('email').classList.add(...classesToAdd);
        document.getElementById('emailDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    };

    if (email.validity.typeMismatch) {
        document.getElementById('email').classList.add(...classesToAdd);
        document.getElementById('emailDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Adresse mail correcte requise</p>
            </div>`;
    };
};

//function use to delete cart after command valided 

function clearCart() {
    let ids = localStorage.getItem("ids");
    let idsArray = ids.split(",");//put id in ids array
    for (let i = 0; i < idsArray; i++) {
        localStorage.remove(idsArray[i]);//delete each line of idsArray
    };
    localStorage.removeItem("ids");//delete ids
};




var form = document.getElementById("validCartBtn");
form.addEventListener("click", function (event) {
    event.preventDefault();
    required();
    sendData();
});