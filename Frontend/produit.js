//LES VARIABLES EN RAPPORT AVEC URL 
//Récupération de l'URL
let queryStrings = window.location.search;
console.log(queryStrings);
//Récupération de tous les paramètres dans l'URL
const urlParams = new URLSearchParams(queryStrings);
console.log(urlParams);
//Récupération du paramètre id
const id = urlParams.get('id');
console.log(id);
//url de la page du produit avec ID
let url = "http://localhost:3000/api/teddies/" + id;
console.log(url);

//LA FONCTION FETCH
fetch(url)
  //Appelé la fonction avec une condition si réponse ok on le veut en json
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  //POUR VOIR LES FONCTIONS ALLER LIGNE 96.
  // Récupération ok créer le schéma de ma page : UTLISATION DU DOM dans ma PROMISE THEN
  .then((data) => {
    console.log(data);
    //Informer le nom de la peluche que le client à select a l'acceuil
    const nomDuProduitSelect = document.querySelector('#nomDuProduitSelect');
    nomDuProduitSelect.innerHTML = `<h2 class="txth2">Les informations de la peluche <strong>${data.name}</strong> que vous avez selectionné </h2>`;
    console.log(nomDuProduitSelect);

    //La structure du produit
    const PRODUIT = document.querySelector('.produit');
    //Creation des Divs
    const newDiv = document.createElement('div');
    newDiv.classList.add("card","mb-3");
    newDiv.style.maxWidth = '5000px';
    const newRow = document.createElement('div');
    newRow.classList.add('row', 'g-0');
    //image
    const newCol = document.createElement('div');
    newCol.classList.add('col-md-4');
    newCol.innerHTML = `<img src="${data.imageUrl}"class="img-fluid rounded-start" alt="peluche style="max-width : 50px">`;
    //Création (cardBody, SelectColor)
    const newCol2 = document.createElement('div');
    newCol2.classList.add('col-md-8');
    //cardBody 
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    //Nom Peluche
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.innerHTML = `${data.name}`;
    //Description
    const cardParagraphe = document.createElement('p');
    cardParagraphe.classList.add('card-text');
    cardParagraphe.innerHTML = `<p>${data.description}</p>`;
    //Quantite
    const selectQuantite = document.createElement('select');
    selectQuantite.style.maxWidth = '115px';
    selectQuantite.classList.add('form-select');
    selectQuantite.innerHTML = `<option value='None' selected>Quantité</option>`;
    //Boucle pour les quantites
    let numbersQuantités = 0;
    for (let i = 0; i < 5; i++) {
      numbersQuantités++;
      selectQuantite.innerHTML += `<option value=${numbersQuantités}>${numbersQuantités}</option>`;
    }
    //Prix de la peluche
    //Convertire les centimes en EUROS
    let convertiseur = (data.price / 100);
    const cardPrix = document.createElement('p');
    cardPrix.classList.add('card-text');
    cardPrix.innerHTML = `<small>Prix : ${convertiseur} € </small> `;

    //Couleur de la peluche
    const selectColor = document.createElement('select');
    selectColor.classList.add('form-select');
    selectColor.innerHTML = `<option value='None' selected>Personalisation de ta peluche</option>`;
    //Boucle pour la couleur
    for (let color of data.colors) {
      selectColor.innerHTML += `<option value=${color}>${color}</option>`;
    };

//____________________Les FONCTIONS________________________________________
    //Bouton Panier
    const btn = document.createElement('div');
    btn.classList.add('btn');
    btn.innerHTML = `<button type="button" class="btn btn-info">Ajouter au panier</button>`;

    //btn ACCUEIL
    const btnAccueil = document.createElement('div');
    btnAccueil.classList.add('btn');
    btnAccueil.innerHTML = `<button type="button" class="btn btn-warning">Revenir à l'accueil</button>`;
    console.log(btnAccueil);
    
    //addEvenListener Du btn accueil
    btnAccueil.addEventListener('click', () => {
      window.location.href = "index.html";
    });
    //addEvenListener Du btn Panier
    btn.addEventListener('click', () => {
      if (selectColor.value !== "None" && selectQuantite.value !== "None") {
        // Ajout des informations dans le local storage
        function ajouterDansLePanier(data) {
          // Récupération des valeurs du formulaire 
          let optionsProduits = {
            nomProduit: data.name,
            couleurProduit: selectColor.value,
            prixProduit: convertiseur,
            idProduit: data._id,
            quantiteProduit: parseInt(selectQuantite.value)
          };
          //*Local storage 
          //Déclaration de la variable "produitEnregDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
          //JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JS.
          let produitEnregDansLocalStorage = JSON.parse(localStorage.getItem('produitPeluche'));
          // s'il y a deja des produits enregistres dans le local storage
          if (produitEnregDansLocalStorage) {

            let trouver = false;

            for (let element of produitEnregDansLocalStorage) {

              if (element.nomProduit == optionsProduits.nomProduit && element.couleurProduit == optionsProduits.couleurProduit) {
                trouver = true;
                element.quantiteProduit += optionsProduits.quantiteProduit;
              }
            }

            if (trouver == false) {
              produitEnregDansLocalStorage.push(optionsProduits);
            }

            localStorage.setItem('produitPeluche', JSON.stringify(produitEnregDansLocalStorage));
          }
          // s'il n'y a pas dans le local storage
          else {
            produitEnregDansLocalStorage = [];
            produitEnregDansLocalStorage.push(optionsProduits);
            localStorage.setItem('produitPeluche', JSON.stringify(produitEnregDansLocalStorage));
          }
        }
        ajouterDansLePanier(data);
        
        const produitSelectAuPanier = document.querySelector('#produitSelectAuPanier');
        produitSelectAuPanier.innerText = `L'article ${data.name} de couleur ${selectColor.value} en quantité ${selectQuantite.value} a bien été bien rajouter au panier. `;
        actualiserQuantitePanierLogo();
      } else {
        alert('Veuillez choisir minimum une quantité et une couleur dans le panier');
      }
    });

    const btnContainer = document.createElement('div');
    btnContainer.classList = 'btn-container';
    PRODUIT.append(newDiv, btnContainer);
    btnContainer.append(btn, btnAccueil);
    newDiv.append(newRow);
    newRow.append(newCol, newCol2);
    newCol2.append(cardBody, selectColor);
    cardBody.append(cardTitle, cardParagraphe, cardPrix, selectQuantite);
  })
  //Si la réponse n'est pas ok écrire une phrase
  .catch((err) => {
    console.log("Attention! Erreur: " + err);
    document.querySelector('body').innerHTML = `<h3>Sorry !!! <br> La page n'est pas disponible.<br>Veuillez recontacté votre node server 3000</h3>`;
  });

  //FONCTION PANIER
function actualiserQuantitePanierLogo() {
  const nbArticles = document.querySelector('#nbArticles');
  const produitsLogo = JSON.parse(localStorage.getItem('produitPeluche'));
  let quantiteLogo = 0;

  for (let produit of produitsLogo) {
    quantiteLogo += produit.quantiteProduit;
  }
  nbArticles.innerText = quantiteLogo;
}
