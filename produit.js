console.log('sa'+ 'sa');
let url = 'http://localhost:3000/api/teddies';
fetch(url)
.then((res) => {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
})
.then((data) => {
    console.log(data);
    const PRODUIT = document.querySelector('produit');

})
.catch((err) => {
    console.log("Attention! Erreur: " + err);
    document.querySelector('body').innerHTML = `<h3>Sorry !!! <br> La page n'est pas disponible, veuillez installer npm puis node server 3000</h3>`;
  });