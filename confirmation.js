let numCommandeLocalStorage = JSON.parse(localStorage.getItem('numCommande'));
console.log(numCommandeLocalStorage);
//Confirmation du MONTANT TOTAL
let numCommande = document.querySelector('#numCommande');
numCommande.innerHTML = ``;




let acceuil = document.querySelector('#acceuil');

acceuil.addEventListener("click", () =>{
    acceuil = location.href="./index.html";
});


