//Déclaration de la variable "produitEnregDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
let produitEnregDansLocalStorage = JSON.parse(
  localStorage.getItem("produitPeluche")
);
console.log("les keys et value dans le localStoragen ci-dessous");
console.log(produitEnregDansLocalStorage);

//************************Affichage des produits du panier */
//Si le panier est vide: afficher le panier vide + BTN formulaire disabled
if (localStorage.getItem("produitPeluche") == null) {
  document.querySelector("#btnEnvoi").setAttribute("disabled", "disabled");
}

//Déclaration des variables en rapport avec le Panier
const affichagePanier = document.querySelector("#panierVide");
const affichageProduit = [];
const body = document.querySelector("#articles");
let montantTotal = 0;
let montantFooter = document.querySelector("#montantTotal");

//La Condition
if (produitEnregDansLocalStorage === null) {
  const panierVide = `<h3 class="text-center">Le panier est vide </h3>`;
  affichagePanier.innerHTML = panierVide;
} else {
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

    //AFFICHAGE: PRIX TOTAL DE LA LIGNE DU PRODUIT
    let prixArticle = document.createElement("td");
    prixArticle.textContent =
      `${produitEnregDansLocalStorage[i].prixProduit}` *
        `${produitEnregDansLocalStorage[i].quantiteProduit}` +
      " €";

    //MontantTotal
    montantTotal +=
      `${produitEnregDansLocalStorage[i].prixProduit}` *
      `${produitEnregDansLocalStorage[i].quantiteProduit}`;

    //Les LIENS DE PARENTE
    ligne.appendChild(nomArticle);
    ligne.appendChild(quantiteArticle);
    ligne.appendChild(couleurArticle);
    ligne.appendChild(prixArticle);
    body.appendChild(ligne);
  }
  // Hors de la boucle
  montantFooter.textContent = montantTotal + " €";
}

//___________________LE FORMULAIRE___________________________________________
//Déclaration des variables
let myForm = document.querySelector("#formulaire");
let inputs = document.getElementsByTagName("input");
console.log("Ci-dessous : les inputs du formulaire avec leurs valeurs vides");
console.log(inputs);
let prenomForm = document.querySelector("#prenom");
let nomForm = document.querySelector("#nom");
let emailForm = document.querySelector("#email");
let emailConfirmForm = document.querySelector("#email2");
let numForm = document.querySelector("#numero");
let adresseForm = document.querySelector("#adresse");
let adresse2Form = document.querySelector("#adresse2");
let villeForm = document.querySelector("#ville");
let paysForm = document.querySelector("#pays");

//Les fonctions : pour chaque input PRENOM à VILLE
//* Ecouter la modification du PRENOM
myForm.prenom.addEventListener("change", function () {
  validePrenom(this);
});
//**FONCTION POUR UNE VALIDATION PRENOM**//
function validePrenom(inputPrenom) {
  //Création regExt pour la validation email
  let prenomRegExp = new RegExp("^[a-zA-Z]+$", "g");

  let testPrenom = prenomRegExp.test(inputPrenom.value);
  console.log("Ci-dessous : si testPrenom correct = true sinon false");
  console.log(testPrenom);

  //Récupéré la balise small email
  let smallPrenom = document.querySelector("#helpPrenom");

  //Maintenant qu'on sait que le 'console.log(testPrenom)' peut nous renvoyé true ou false, alors on fait une condition pour tester la RegExt
  if (testPrenom) {
    smallPrenom.textContent = "Prénom valide";
    smallPrenom.classList.add("text-success");
    smallPrenom.classList.remove("text-danger");
    return true;
  } else {
    smallPrenom.textContent = "Prénom non valide";
    smallPrenom.classList.add("text-danger");
    smallPrenom.classList.remove("text-success");
    return false;
  }
}

//* Ecouter la modification du NOM
myForm.nom.addEventListener("change", function () {
  valideNom(this);
});
//**FONCTION POUR UNE VALIDATION NOM**//
function valideNom(inputNom) {
  //Création regExt pour la validation nom
  let nomRegExp = /^[a-zA-Z]+$/;

  let testNom = nomRegExp.test(inputNom.value);
  console.log("Ci-dessous : si testNom correct = true sinon false");
  console.log(testNom);

  let smallNom = document.querySelector("#helpNom");

  if (testNom) {
    smallNom.textContent = "Nom valide";
    smallNom.classList.add("text-success");
    smallNom.classList.remove("text-danger");
    return true;
  } else {
    smallNom.textContent = "Nom non valide";
    smallNom.classList.add("text-danger");
    smallNom.classList.remove("text-success");
    return false;
  }
}

//* Ecouter la modification de l'email
myForm.email.addEventListener("change", function () {
  valideEmail(this);
});
//**FONCTION POUR UNE VALIDATION EMAIL**//
function valideEmail(inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  let testEmail = emailRegExp.test(inputEmail.value);
  console.log("Ci-dessous : si testEmail correct = true sinon false");
  console.log(testEmail);

  let smallEmail = document.querySelector("#helpEmail");

  if (testEmail) {
    smallEmail.textContent = "Email valide";
    smallEmail.classList.add("text-success");
    smallEmail.classList.remove("text-danger");
    return true;
  } else {
    smallEmail.textContent = "Email non valide";
    smallEmail.classList.add("text-danger");
    smallEmail.classList.remove("text-success");
    return false;
  }
}

//* Ecouter la modification ADRESSE
myForm.adresse.addEventListener("change", function () {
  valideAdresse(this);
});
//**FONCTION POUR UNE VALIDATION ADRESSE**//
function valideAdresse(inputAdresse) {
  let adresseRegExp = new RegExp("^[a-zA-Z0-9,-_.:;éèîç ]+$");

  let testAdresse = adresseRegExp.test(inputAdresse.value);
  console.log("Ci-dessous : si testAdresse correct = true sinon false");
  console.log(testAdresse);

  let smallAdresse = document.querySelector("#helpAdresse");

  if (testAdresse) {
    smallAdresse.textContent = "Adresse valide";
    smallAdresse.classList.add("text-success");
    smallAdresse.classList.remove("text-danger");
    return true;
  } else {
    smallAdresse.textContent =
      "Adresse non valide : doit contenir maximum 30 caractères";
    smallAdresse.classList.add("text-danger");
    smallAdresse.classList.remove("text-success");
    return false;
  }
}

//* Ecouter la modification ADRESSE 2
myForm.adresse2.addEventListener("change", function () {
  valideAdresse2(this);
});
//**FONCTION POUR UNE VALIDATION ADRESSE 2**//
function valideAdresse2(inputAdresse2) {
  let adresse2RegExp = new RegExp("^[a-zA-Z0-9,-_.:;éèîç ]+$");

  let testAdresse2 = adresse2RegExp.test(inputAdresse2.value);
  console.log("Ci-dessous : si testAdresse2 correct = true sinon false");
  console.log(testAdresse2);

  let smallAdresse2 = document.querySelector("#helpAdresse2");

  if (testAdresse2) {
    smallAdresse2.textContent = "Adresse 2 valide";
    smallAdresse2.classList.add("text-success");
    smallAdresse2.classList.remove("text-danger");
    return true;
  } else {
    smallAdresse2.textContent =
      "Adresse 2 non valide : doit contenir maximum 30 caractères";
    smallAdresse2.classList.add("text-danger");
    smallAdresse2.classList.remove("text-success");
    return false;
  }
}

//* Ecouter la modification VILLE
myForm.ville.addEventListener("change", function () {
  valideVille(this);
});
//**FONCTION POUR UNE VALIDATION VILLE**//
function valideVille(inputVille) {
  let villeRegExp = new RegExp("^[a-zA-Z- ]+$");

  let testVille = villeRegExp.test(inputVille.value);
  console.log("Ci-dessous : si testVille correct = true sinon false");
  console.log(testVille);

  let smallVille = document.querySelector("#helpVille");

  if (testVille) {
    smallVille.textContent = "Ville valide";
    smallVille.classList.add("text-success");
    smallVille.classList.remove("text-danger");
    return true;
  } else {
    smallVille.textContent =
      "Ville non valide : doit contenir des lettres en miniscule ou majuscule et maxi 20 caractères";
    smallVille.classList.add("text-danger");
    smallVille.classList.remove("text-success");
    return false;
  }
}

// Si formulaire est vide faire une ft général => ligne 113
function verifieErreur() {
  msg = "";
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      msg = "*Veuillez remplir tous les champs du formulaire";
      document.querySelector("#champsFormulaireVide").innerHTML = msg;
      document
        .querySelector("#champsFormulaireVide")
        .classList.add("text-danger");
    }
  }
};

//_________________ECOUTE DU BTN____________________________
//* Ecouter la soumission du BTN ENVOI du formulaire
document.querySelector("#btnEnvoi").addEventListener("click", function (e) {
  //e.preventDefault();
  verifieErreur();
  if (
    validePrenom(myForm.prenom) &&
    valideNom(myForm.nom) &&
    valideEmail(myForm.email) &&
    valideAdresse(myForm.adresse) &&
    valideAdresse2(myForm.adresse2) &&
    valideVille(myForm.ville)
  ) {
    console.log("email valide");
    boucleIdProduit();
    const data = {
      contact: {
        firstName: `${prenomForm.value}`,
        lastName: `${nomForm.value}`,
        address: `${adresseForm.value}`,
        city: `${villeForm.value}`,
        email: `${emailForm.value}`,
      },
      products: [...boucleIdProduit()],
    };
    //Appel Du POST
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        
        console.log("Request complete! response:", res);
        const json = await res.json();
        localStorage.setItem("numeroCommande", json.orderId);
        localStorage.setItem("montantTotal", montantTotal);
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
