//get element in localStorage and display 

function displayValidation() {
    response = localStorage.getItem("response");
    response = JSON.parse(response);
    console.log(response)
    totalPrice = localStorage.getItem("totalPrice");
    console.log(totalPrice);

    document.getElementById("confirmation").innerHTML =
        `<h2> Confirmation de commande </h2>
     <p>Votre commande n°${response.orderId} a bien été prise en compte.</p>
     <p>Votre commande d'un montant total de ${totalPrice},00€ sera envoyé à l'adresse suivante :</p>
     <p>${response.contact.lastName} ${response.contact.firstName}</p>
     <p>${response.contact.address}</p>
     <p>${response.contact.city}</p>
     `
};

displayValidation();
