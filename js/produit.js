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

function getArticle() {

    const urlParams = new URLSearchParams(window.location.search);//get url
    const myParam = urlParams.get('id');//get id from url

    fetch('http://localhost:3000/api/teddies/' + myParam)//get request to api url + id of teddy we have recuped sooner
        .then(response => {
            console.log(response.status);// display response's status 
            return response.json()
        })
        .then(function (product) {
            document.getElementById('article').innerHTML +=// display product coresponding to id 
                `   <div class="col-12 border-accueil pb-3">   
                    <div class="row">
                        <div class="col-12 col-md-8 pl-0">
                            <img class="w-100 h-auto m-2 border-radius" src="${product.imageUrl}" "alt="photo des produits teddy">
                        </div>
                        <div class="col-12 col-md-4">
                            <h1 class="text-center marron-fonce-color">${product.name}</h1>
                            <p class="marron-fonce-color"><b><u>A propos de cet article :</u></b> <br /> ${product.description}</p>
                            <p class="marron-fonce-color"><b><u>Références :</u></b> ${product._id}</p>                               
                            <div class="row mt-5 mx-auto">
                                <select id="select" class="col-6">
                                </select>  
                                <div class="col-6">
                                    <p class="price marron-fonce-color"> Prix: ${product.price / 100},00€</p>
                                </div>
                            </div>
                            <div class="text-center">
                                <button id="btn" class="btn-accueil marron-clair-color py-3 my-4 btnCart text-center w-50">Ajouter au panier</button>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="mt-5 marron-clair-color">
                <p><b><u>Politique de retour</b></u></p>
                <p>Si vous n’êtes pas satisfait d'un produit que vous avez commandé auprès d'Orinoco.fr 
                    ou si celui-ci est défectueux ou endommagé, vous pouvez nous le retourner sous 30 jours suivant la date de livraison, 
                    et nous vous rembourserons ou remplacerons l'intégralité de l'article. Pour plus d’informations, veuillez nous contacter.
                    Si un défaut apparaissait sur votre produit passé la période de 30 jours, et durant toute la période de garantie, vous devez 
                    contacter directement le Service Après-Vente du fabricant.</p>    
            </div>`;
            product.colors.forEach(function (color) {
                document.getElementById('select').innerHTML += `<option value="${color}"> ${color} </option>`;
            });

            document.getElementById('btn').addEventListener('click', () => {// au clic
                let ids = localStorage.getItem("ids");// we get ids in local storage 
                let idsArray = [];
                if (ids) {// if an article is already localStorage
                    idsArray = ids.split(","); //we split ids with "," and add them into idsArray
                }
                idsArray.push(product._id);//add id in idsArray
                localStorage.setItem("ids", idsArray.join(","));// localStorage string of ids in idsArray 
                console.log(localStorage)
                localStorage.setItem(product._id, JSON.stringify(product));// enregistre la chaine de caractère de l'object dans l'id
                console.log(product)
                alert("Votre article a bien été ajouté au panier")
            })
        })
        .catch(function (err) {
            alert("Une erreur est survenue lors du chargement de la page, veuillez nous-excusez");
        })
};



getUtf8();
getArticle();