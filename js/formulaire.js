
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



var form = document.getElementById("validCartBtn");
form.addEventListener("click", function (event) {
    event.preventDefault();
    sendData();
});