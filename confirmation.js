let produitEnregDansLocalStorage = JSON.parse(localStorage.getItem('produitPeluche'));
let numCommandeLocalStorage = localStorage.getItem('numeroCommande');

console.log(numCommandeLocalStorage);
//Confirmation COMMANDE
let numCommande = document.querySelector('#numCommande');
numCommande.innerText = `${numCommandeLocalStorage}`;

let prixTotal = document.querySelector('#prixTotal');

    // prixTotal.textContent =  `${produitEnregDansLocalStorage.prixProduit}` * `${produitEnregDansLocalStorage.quantiteProduit}`;


let acceuil = document.querySelector('#acceuil');

acceuil.addEventListener("click", () =>{
    //Vidage LocalStorage
    localStorage.removeItem("numeroCommande");
    acceuil = location.href="./index.html";

});




