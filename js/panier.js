//Encodage en UTF-8

function getUtf8() {
    //Encodage en UTF-8
    const uri = 'https://mozilla.org/?x=шеллы';
    const encoded = encodeURI(uri);
    console.log(encoded);
    // expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

    try {
        console.log(decodeURI(encoded));
        // expected output: "https://mozilla.org/?x=шеллы"
    } catch (e) { // catches a malformed URI
        console.error(e);
    }
};

//variables declaration

let ids = localStorage.getItem("ids");// get ids and informations 
let idsArray = [];
if (ids) {
    idsArray = ids.split(","); //Split elements on an array
}
let cart = [];
let idsAlreadyHere = [];
let cartTotalPrice = 0;
let arrayBtns = [];
let idsString = "";


/*functions declaration*/


//function used to display product add to cart

function displayProducts(idsArray) {
    //console.log(idsArray)
    document.getElementById("article-cart").innerHTML = "";
    idsArray.forEach(function (id) {//for each article on cart 
        //console.log(idsArray)
        //console.log(localStorage)
        let product = localStorage.getItem(id);//get products stocked in id
        console.log(product)
        if (product) {// if an article has add to cart 
            if (idsAlreadyHere.indexOf(id) === -1) {// if id doesn't exist in idsAlreadyHere array
                console.log("si l'article n'est pas présent")
                idsAlreadyHere.push(id);// Put id in idsAlreadyHere array 
                product = JSON.parse(product);// transform product Json into product Javascript 
                let productCart = {};//creation of a new product to display all of product arguments 
                productCart.id = idsArray.indexOf(product._id);//position of id in idsArray
                productCart.productId = product._id;//id of product 
                productCart.quantity = 1;//default quantity when an object was add to cart
                productCart.price = (product.price / 100);//Price of product 
                productCart.productTotalPrice = productCart.quantity * productCart.price;// total price for product was add to cart 
                cart.push(productCart);// put object in array 
                document.getElementById("article-cart").innerHTML +=//display product was add to cart 
                    `<div class="row mt-3 pb-3 marron-fonce-color border-bot">
                        <div class="col-12 p-0">
                            <div class="row">
                                <div class="col-12 col-lg-4 ">
                                    <img class="card-img" src="${product.imageUrl}" alt="photo du produit">
                                </div>
                                <div class="col-12 col-lg-8">
                                    <h2 class="text-center">${product.name}</h2>
                                    <div class="row offset-3 col-6 offset-lg-0 col-lg-4 text-center d-flex justify-content-center my-3">
                                        <form class="p-0 text-center">
                                            <input type="checkbox">
                                        </form>
                                        <p class="p-0">Ceci sera un cadeau</p>
                                    </div>
                                    <div class="row offset-3 col-6 offset-lg-0 col-lg-4 d-flex justify-content-center numberInput">
                                        <label class="my-auto pr-0 mr-2" for="articleNumber">Quantité : </label>
                                        <input class="number" type="number" name="articleNumber" min="0" max="100" step="1" value="1">
                                    </div>
                                    <div class="text-center">
                                        <button class="btn-accueil marron-clair-color py-3 my-4 btnCart text-center">Supprimer</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 p-0 my-auto price text-center">
                                <p class="productTotalPrice"></p>                                        
                            </div>
                        </div>
                    </div>`
                productTotalPrice(productCart.id);
                document.addEventListener('input', function a() {//when user change quantity of product in cart 
                    cartTotalPrice = 0;
                    productTotalPrice(productCart.id);//calcul after changement
                    getTotalPrice(cart);//calcul carft total price after input changement 
                })
            } else {
                console.log("si l'aticle est déjà présent")
                cart.forEach(function (article) {
                    console.log(cart)
                    if (article.productId === id) {//if object was already in cart 
                        document.getElementsByClassName('number')[cart.indexOf(article)].value++;//increases its value by one 
                        article.quantity++;//increases its 
                        console.log(article.quantity)
                        article.productTotalPrice = article.quantity * article.price;//calcul its new price 
                        document.getElementsByClassName('numberInput')[cart.indexOf(article)].innerHTML =
                            `<label class="my-auto pr-0 mr-2" for="articleNumber">Quantité : </label>
                             <input class="number" type="number" name="articleNumber" min="0" max="100" step="1" value="${article.quantity}">`

                    };
                    document.getElementsByClassName("productTotalPrice")[cart.indexOf(article)].innerHTML = `Total : <b>${cart[cart.indexOf(article)].productTotalPrice},00 €</b>`;
                });

            };
        };

    });

};


                                                                            /*functions calling */

getUtf8();
displayProducts(idsArray);