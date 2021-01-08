
//fonction permettant d'envoyer les informations à l'api

function sendData() {
    let formData = {};//stock les données du formulaire dans un tableau
    formData.lastName = document.getElementById("lastname").value;
    formData.firstName = document.getElementById("firstname").value;
    formData.address = document.getElementById("address").value;
    formData.city = document.getElementById("city").value;
    formData.email = document.getElementById("email").value;
    let products = localStorage.getItem("product");//récupération du local storage
    products = products.split(",");//on le transforme en Json
    let body = JSON.stringify({ "contact": formData, "products": products });
    console.log(body)
    fetch("http://localhost:3000/api/teddies/order", {//methode post
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body,
    }).then(response => {//on récupère la réponse de la requête
        console.log(response.status);
        if (response.status != 200 && response.status != 201 && response.status != 204) {//si la réponse n'est pas un status 200
            throw new Error("Not 2xx response")
        }
        return response.json()
    })
        .then(function (response) {// sinon 
            response = JSON.stringify(response);
            localStorage.setItem("response", response);//on localstorage la reponse (code de commande retourné par l'api)
            console.log(response)
            clearCart();//On supprime le panier
            window.location.href = "validation.html";//on redirige vers la page validation de commande 
        });
};

//fonction permettan d'ajouter un élément requis lors de la validation de formulaire

function required() {
    var lastname = document.forms["validationForm"]["lastname"];
    var firstname = document.forms["validationForm"]["firstname"];
    var address = document.forms["validationForm"]["address"];
    var city = document.forms["validationForm"]["city"];
    var email = document.forms["validationForm"]["email"];
    let classesToAdd = ['border', 'border-danger'];

    if (lastname.value == "") {//ajoute le champ required au formulaire
        document.getElementById('lastname').classList.add(...classesToAdd);//ajoute les class à la liste de classe déjà exitente  
        document.getElementById('lastNameDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    }
    if (firstname.value == "") {
        document.getElementById('firstname').classList.add(...classesToAdd);
        document.getElementById('firstNameDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    }
    if (address.value == "") {
        document.getElementById('address').classList.add(...classesToAdd);
        document.getElementById('addressDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    }
    if (city.value == "") {
        document.getElementById('city').classList.add(...classesToAdd);
        document.getElementById('cityDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    }
    if (email.value == "") {
        document.getElementById('email').classList.add(...classesToAdd);
        document.getElementById('emailDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Champ requis</p>
            </div>`;
    }
    if (email.validity.typeMismatch) {
        document.getElementById('email').classList.add(...classesToAdd);
        document.getElementById('emailDiv').innerHTML += `
            <div class="border border-danger w-25 m-auto p-auto">
                <p class="text-danger m-0">Adresse mail correcte requise</p>
            </div>`;
    }
};



var form = document.getElementById("validCartBtn");
form.addEventListener("click", function (event) {
    event.preventDefault();
    required();
    sendData();
});