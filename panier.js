//Déclaration de la variable "produitEnregDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let produitEnregDansLocalStorage = JSON.parse(localStorage.getItem('produitPeluche'));
console.log(produitEnregDansLocalStorage);

// `${produitEnregDansLocalStorage.length}` + `${idProduit}`

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

//RegExp
const RegExtLaBase = new RegExp(/^[a-zA-Z]+\s$/);
const RegExtEmail = /^[a-zA-Z0-9_. -]+[@]{1}[a-zA-Z0-9_. -]+[.]{1}[a-z]{3,10}$/.test;
const RegExtNumero = /^[0-9]+/.test;

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


//stocker les saisies dans le local storage
document.querySelector('#btnEnvoi').addEventListener("click", function (e) {
    verifieErreur();
    // e.preventDefault();
    if (prenomForm.value == "") {
        const prenomVide = document.querySelector('#prenomSpan');
        prenomVide.innerHTML = "*Veuillez mettre votre prénom";
        // else if ((prenomForm.value).search(/^[a-zA-Z-]+\s$/))
    } else if (!RegExtLaBase) {
        const prenomVide = document.querySelector('#prenomSpan');
        prenomVide.innerHTML = "*Votre prénom doit contenir que des lettres minuscules et majuscules";
    } else {
        const prenomVide = document.querySelector('#prenomSpan');
        prenomVide.style.color = "green";
        prenomVide.innerHTML = "Votre prénom est validé";
    };

    if (nomForm.value == "") {
        const nomVide = document.querySelector('#nomSpan');
        nomVide.innerHTML = "*Veuillez mettre votre nom";
        nomForm = nomVide;
    } else if (emailForm.value == "") {
        const emailVide = document.querySelector('#emailSpan');
        emailVide.innerHTML = "*Veuillez mettre votre email";
        emailForm = emailVide;
    } else if (emailConfirmForm.value == "") {
        const emailConfirmFormVide = document.querySelector('#emailConfirmSpan');
        emailConfirmFormVide.innerHTML = "*Veuillez confirmé votre email";
        emailConfirmForm = emailConfirmFormVide;
    } else if (numForm.value == "") {
        const numVide = document.querySelector('#numeroSpan');
        numVide.innerHTML = "*Veuillez mettre votre numéro";
        numForm = numVide;
    } else if (adresseForm.value == "") {
        const adresseVide = document.querySelector('#adresseSpan');
        adresseVide.innerHTML = "*Veuillez mettre votre adresse";
        adresseForm = adresseVide;
    } else if (adresse2Form.value == "") {
        const adresse2Vide = document.querySelector('#adresse2Span');
        adresse2Vide.innerHTML = "*Veuillez complété votre adresse";
        adresse2Form = adresse2Vide;
    } else if (villeForm.value == "") {
        const villeVide = document.querySelector('#villeSpan');
        villeVide.innerHTML = "*Veuillez mettre votre ville";
        villeForm = villeVide;
    } else if (paysForm.value == "") {
        const paysVide = document.querySelector('#paysSpan');
        paysVide.innerHTML = "*Veuillez mettre votre pays";
        paysForm = paysVide;
        console.log(nomVide);
        e.preventDefault();
    } else {

        console.log("ICI");

        boucleIdProduit();
        // let idProduitAEnvoyer = boucleIdProduit();
        // boucleIdProduit();
        //POST API
        const data = {
            contact: {
                firstName: `${prenomForm.value}`,
                lastName: `${nomForm.value}`,
                address: `${adresseForm.value}` + ` ${adresse2Form.value}`,
                city: `${villeForm.value}`,
                email: `${emailForm.value}`
            },
            products: [...boucleIdProduit()] 

            // ['5beaa8bf1c9d440000a57d94']

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
            if(fetch == true){
                location.href = "./confirmation.html";
            }
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
