                                                                    //Variables declaration  

var url = "";

                                                                    /*functions declarations*/


//function than get url to display one of articles

function getUrl() {
    url = document.location.pathname.split("/");//get url and split it in array
    //console.log(url)
    url.pop();//delete the last element of array (index.html)
    //console.log(url)
    url.shift();//delete the first element (' ')
    //console.log(url)
    url = url.join('/');//get the url desired
    //console.log(url)
};

//function that display all of articles 

function getAllArticles(url) {
    fetch('http://localhost:3000/api/teddies')
        .then(response => {
            //console.log(response.status);// display response's status 
            return response.json()
        })
        .then(function (teddies) {//if status = 200
            teddies.forEach(teddy => {
                let newUrl = new URL(url + '/produit.html?id=' + teddy._id)//creat new unic url for each teddy
                //console.log(teddy._id)
                document.getElementById('article').innerHTML +=//display teddies 
                    `                   
                     <div class=" mx-auto col-sm-8 col-md-6 col-lg-4 text-center mt-5" >
                        <div class="border-accueil marron-clair-color mr-1 pb-2">
                            <div class="m-2">
                                <img class="imageaccueil" src="${teddy.imageUrl}" alt="photo des produits teddy">
                            </div>
                             <h2>${teddy.name}</h2>                       
                             <p class="card-text marron-fonce-color"> ${teddy.price / 100},00€</p>
                             <a class="marron-clair-color" href="${newUrl.href}">
                                <button id="btn" class="btn-accueil  py-3 my-4 btnCart text-center w-50">Voir l'article</button>
                             </a>
                        </div>
                     </div>                                                       
`;
            });
        })
        .catch(function (err) {//display an error message in status not 200/201/204
            alert("Une erreur est survenue lors du chargement de la page, veuillez nous-excusez");
        })
}

                                                                      //Functions call         

getUrl();
getAllArticles(url);