//LES VARIABLES
let produitEnregDansLocalStorage = JSON.parse(localStorage.getItem('produitPeluche'));
//Confirmation COMMANDE
let numCommandeLocalStorage = localStorage.getItem('numeroCommande');
console.log(numCommandeLocalStorage);
let numCommande = document.querySelector('#numCommande');
numCommande.innerText = `${numCommandeLocalStorage}`;
//CONFIRMATION MONTANT TOTAL
let prixTotal = document.querySelector('#prixTotal');
prixTotal.innerText = localStorage.getItem('montantTotal') + ' €';
let acceuil = document.querySelector('#acceuil');

//FONCTION CLICK ACCEUIL
acceuil.addEventListener("click", () =>{
    //Vidage LocalStorage
    localStorage.removeItem("numeroCommande");
    localStorage.removeItem("montantTotal");
    localStorage.removeItem("produitPeluche");

    acceuil = location.href="./index.html";
});




