//Déclaration de la variable "produitEnregDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let produitEnregDansLocalStorage = JSON.parse(localStorage.getItem('produitPeluche'));
console.log(produitEnregDansLocalStorage);

//************************Affichage des produits du panier */
//Si le panier est vide: afficher le panier vide
if (localStorage.getItem('produitPeluche') == null) {
    document.querySelector('#btnEnvoi').setAttribute('disabled', 'disabled');
}

const affichagePanier = document.querySelector('#panierVide');
if (produitEnregDansLocalStorage === null) {
    const panierVide = `<h3 class="text-center">Le panier est vide </h3>`;
    affichagePanier.innerHTML = panierVide;
} else {
    //Sélection de la classe ou je vais injecte le code HTML
    const affichageProduit = [];
    const body = document.querySelector('#articles');
    let montantTotal = 0;
    let montantFooter = document.querySelector('#montantTotal');

    //BOUCLE FOR DES PRODUITS ENRG
    for (let i = 0; i < produitEnregDansLocalStorage.length; i++) {

        //Creer une ligne pour chaque peluche
        let ligne = document.createElement("tr");

        //AFFICHAGE ARTICLE
        let nomArticle = document.createElement("td");
        nomArticle.textContent = `${produitEnregDansLocalStorage[i].nomProduit}`;

        //AFFICHAGE QUANTITE
        let quantiteArticle = document.createElement("td");
        quantiteArticle.textContent = `${produitEnregDansLocalStorage[i].quantiteProduit}`;

        //AFFICHAGE COULEUR
        let couleurArticle = document.createElement("td");
        couleurArticle.textContent = `${produitEnregDansLocalStorage[i].couleurProduit}`;

        //AFFICHAGE PRIX TOTAL
        let prixArticle = document.createElement("td");
        prixArticle.textContent = `${produitEnregDansLocalStorage[i].prixProduit}` * `${produitEnregDansLocalStorage[i].quantiteProduit}` + ' €';

        //MontantTotal
        montantTotal += `${produitEnregDansLocalStorage[i].prixProduit}` * `${produitEnregDansLocalStorage[i].quantiteProduit}`;

        //btn poubelle: pour supp la ligne 
        let btnClear = document.createElement("button");
        btnClear.classList = 'btn btn-danger';
        btnClear.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
        class="icon" width="17" height="17" fill="currentColor" class="bi bi-trash"
        viewBox="0 0 16 16">
        <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
    </svg>`;
        btnClear.addEventListener('click', () => {
            ligne.remove();
        })

        ligne.appendChild(nomArticle);
        ligne.appendChild(quantiteArticle);
        ligne.appendChild(couleurArticle);
        ligne.appendChild(prixArticle);
        ligne.appendChild(btnClear);
        body.appendChild(ligne);
    }
    // Hors de la boucle
    montantFooter.textContent = montantTotal;
};

//FORMULAIRE
//Récupération des données du formulaire 
let myForm = document.querySelector('#formulaire');
let prenomForm = document.querySelector('#prenom');
let nomForm = document.querySelector('#nom');
let emailForm = document.querySelector('#email');
let emailConfirmForm = document.querySelector('#email2');
let numForm = document.querySelector('#numero');
let adresseForm = document.querySelector('#adresse');
let adresse2Form = document.querySelector('#adresse2');
let villeForm = document.querySelector('#ville');
let paysForm = document.querySelector('#pays');
let inputs = document.getElementsByTagName('input');
let erreurForm = "";
let validerForm = "";

// Si formulaire est vide
function verifieErreur() {
    erreurForm = '';
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            erreurForm = "*Veuillez remplir tous les champs du formulaire";
            document.querySelector('#erreurFormulaire').innerHTML = erreurForm;
            document.querySelector('#erreurFormulaire').classList.add("text-danger");
            document.querySelector('#erreurFormulaire').classList.remove("text-success");
            console.log(erreurForm);
            break;
        } else {
            let validerForm = "Le formulaire est bien rembli";
            document.querySelector('#erreurFormulaire').innerHTML = validerForm;
            document.querySelector('#erreurFormulaire').classList.remove("text-danger");
            document.querySelector('#erreurFormulaire').classList.add("text-success");
            console.log(validerForm);
        }
    }
};
/////////////////////////////////////////////////////
//RegExp
const regExtLaBase = new RegExp(/^[a-zA-Z\s]+/);

myForm.prenom.addEventListener('change', function(){
    validePrenom(this);
});
const validePrenom = function(inputPrenom) {

    //On test ExpReg du prénom
    if (regExtLaBase.test(inputPrenom.value)) {
        const prenomVide = document.querySelector('#prenomSpan');
        prenomVide.innerHTML = "Votre prénom est validé";
        prenomVide.classList.remove("text-danger");
        prenomVide.classList.add("text-success");
        return true;
    } else {
        const prenomVide = document.querySelector('#prenomSpan');
        prenomVide.innerHTML = "*Votre prénom : en minuscules ou majuscules";
        prenomVide.classList.remove("text-success");
        prenomVide.classList.add("text-danger");
        return false;
    };
console.log('ICI PRENOM');
    console.log(regExtLaBase.test(inputPrenom.value));
};

//RegExt NOM
myForm.nom.addEventListener('change', function(){
    valideNom(this);
});
const valideNom = function(inputNom) {
  
    //On test ExpReg nom
    if (regExtLaBase.test(inputNom.value)) {
        const nomVide = document.querySelector('#nomSpan');
        nomVide.innerHTML = "Votre nom est validé";
        nomVide.classList.remove("text-danger");
        nomVide.classList.add("text-success");
    } else {
        const nomVide = document.querySelector('#nomSpan');
        nomVide.innerHTML = "*Votre nom : en minuscules ou majuscules";
        nomVide.classList.remove("text-success");
        nomVide.classList.add("text-danger");
    };
console.log('ICI NOM');
    console.log(regExtLaBase.test(inputNom.value));
};

//RegExt EMAIL
const regExtEmail = new RegExp(/^[a-zA-Z0-9_. -]+[@]{1}[a-zA-Z0-9_. -]+[.]{1}[a-z]/);
myForm.email.addEventListener('change', function(){
    valideEmail(this);
});
const valideEmail = function(inputEmail) {
  
//On test ExpReg EMAIL
    if (regExtEmail.test(inputEmail.value)) {
        const emailVide = document.querySelector('#emailSpan');
        emailVide.innerHTML = "Votre email est validé";
        emailVide.classList.remove("text-danger");
        emailVide.classList.add("text-success");
    } else {
        const emailVide = document.querySelector('#emailSpan');
        emailVide.innerHTML = "*Votre email est incorrect";
        emailVide.classList.remove("text-success");
        emailVide.classList.add("text-danger");
    };
console.log('ICI email');
    console.log(regExtEmail.test(inputEmail.value));
};

//RegExp NUMERO
const regExtNumero = new RegExp(/^[+]{1}[\s0-9]+/);
myForm.numero.addEventListener('change', function(){
    valideNumero(this);
});

const valideNumero = function(inputNumero) {
//On test ExpReg Numéro
    if (regExtNumero.test(inputNumero.value)) {
        const numeroVide = document.querySelector('#numeroSpan');
        numeroVide.innerHTML = "Votre numéro est validé";
        numeroVide.classList.remove("text-danger");
        numeroVide.classList.add("text-success");
    } else {
        const numeroVide = document.querySelector('#numeroSpan');
        numeroVide.innerHTML = "*Votre numero doit contenir que des chiffres";
        numeroVide.classList.remove("text-success");
        numeroVide.classList.add("text-danger");
    };
console.log('ICI NUMERO');
    console.log(regExtEmail.test(inputNumero.value));
};

//RegExt ADRESSE
const regExtAdresse = new RegExp(/^[a-zA-Z0-9_. -,;\s]+/);
myForm.adresse.addEventListener('change', function(){
    valideAdress(this);
});
const valideAdress = function(inputAdress) {

    //On test ExpReg ADRESSE
    if (regExtAdresse.test(inputAdress.value)) {
        const adresseVide = document.querySelector('#adresseSpan');
        adresseVide.innerHTML = "Votre adresse est validée";
        adresseVide.classList.remove("text-danger");
        adresseVide.classList.add("text-success");
    } else {
        const adresseVide = document.querySelector('#adresseSpan');
        adresseVide.innerHTML = "*Votre adresse : ne doit pas comporter de symbole comme *'@{]";
        adresseVide.classList.remove("text-success");
        adresseVide.classList.add("text-danger");
    };
console.log('ICI ADRESSE');
    console.log(regExtAdresse.test(inputAdress.value));
};
//ADRESSE 2
myForm.adresse2.addEventListener('change', function(){
    valideAdress2(this);
});
const valideAdress2 = function(inputAddress2) {

    //On test ExpReg ADRESSE
    if (regExtAdresse.test(inputAddress2.value)) {
        const adresse2Vide = document.querySelector('#adresse2Span');
        adresse2Vide.innerHTML = "Votre adresse est validée";
        adresse2Vide.classList.remove("text-danger");
        adresse2Vide.classList.add("text-success");
    } else {
        const adresse2Vide = document.querySelector('#adresse2Span');
        adresse2Vide.innerHTML = "*Votre adresse : ne doit pas comporter de symbole comme *'@{]";
        adresse2Vide.classList.remove("text-success");
        adresse2Vide.classList.add("text-danger");
    };
console.log('ICI ADRESSE 2');
    console.log(regExtAdresse.test(inputAddress2.value));
};

//RegExt VILLE
const regExtVille = new RegExp(/^[a-zA-Z-,\s]+/);

myForm.ville.addEventListener('change', function(){
    valideVille(this);
});
const valideVille = function(inputVille) {

    //On test ExpReg du ville
    if (regExtVille.test(inputVille.value)) {
        const villeVide = document.querySelector('#villeSpan');
        villeVide.innerHTML = "Le champ est validé";
        villeVide.classList.remove("text-danger");
        villeVide.classList.add("text-success");
    } else {
        const villeVide = document.querySelector('#villeSpan');
        villeVide.innerHTML = "*Veuillez utilisé que des lettres";
        villeVide.classList.remove("text-success");
        villeVide.classList.add("text-danger");
    };
console.log('ICI VILLE');
    console.log(regExtVille.test(inputVille.value));
};

document.querySelector('#btnEnvoi').addEventListener("click", function (e) {
    e.preventDefault();

    if(validePrenom(myForm.prenom)){
        console.log('prenom valide');
    }else{
        console.log('prenom non valide');
    }
    verifieErreur();


    if (paysForm.value == "") {
        const paysVide = document.querySelector('#paysSpan');
        paysVide.innerHTML = "*Veuillez mettre votre pays";
        paysForm = paysVide;
        console.log(nomVide);
        e.preventDefault();
    } else {

        console.log("ICI");

        boucleIdProduit();
        const data = {
            contact: {
                firstName: `${prenomForm.value}`,
                lastName: `${nomForm.value}`,
                address: `${adresseForm.value}` + ` ${adresse2Form.value}`,
                city: `${villeForm.value}`,
                email: `${emailForm.value}`
            },
            products: [...boucleIdProduit()]

        };
        console.log(data.products);
        fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(async res => {
            console.log("Request complete! response:", res);
            alert('Votre commande a bien été enregitrée, le numéro de commande apparaîtra à la page de confirmation');
            const json = await res.json();
            localStorage.setItem("numeroCommande", json.orderId);
            //Vidage du localstorage
            localStorage.removeItem("produitPeluche");
            window.location.href = "./confirmation.html";
        })

            .catch((err) => {
                console.error(err);
            });

    }
});

function boucleIdProduit() {
    let tableIdProduit = [];
    for (let v = 0; v < produitEnregDansLocalStorage.length; v++) {
        console.log(produitEnregDansLocalStorage[v].idProduit);
        tableIdProduit.push(produitEnregDansLocalStorage[v].idProduit);
    }
    return tableIdProduit;
}




//les éléments FORMULAIRE cas par cas

// emailConfirmForm.addEventListener('span', () =>{
//     if(emailConfirmForm.value != emailForm.value){
//         emailConfirmForm.innerHTML = "*Adresse email n'est pas la même";
//     }
// });
// console.log(emailConfirmForm);

// for(let i =0; i < document.querySelector('form').elements.length; i++){
//    if(document.querySelector('form').elements.item(i).value == '') {
//        erreur = "message d'erreur";
//        //Et disabled du bouton Envoyer
//        break;
//    } else {
//        //remove attribut Disabled
//    }

// }


    // localStorage.setItem("prenom", prenomForm.value);
    // localStorage.setItem("nom", nomForm.value);
    // localStorage.setItem("email", emailForm.value);
    // localStorage.setItem("emailDeConfirmation", emailConfirmForm.value);
    // localStorage.setItem("numero", numForm.value);
    // localStorage.setItem("adresse", adresseForm.value);
    // localStorage.setItem("adresse2", adresse2Form.value);
    // localStorage.setItem("ville", villeForm.value);
    // localStorage.setItem("pays", paysForm.value);
