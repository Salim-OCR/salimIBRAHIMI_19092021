let url = "http://localhost:3000/api/teddies"; 
fetch(url) 
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    
    console.log(data);

    const MAIN = document.querySelector('.main');

    for(let peluche of data){
      let newDiv = document.createElement('div');
      newDiv.classList.add('col-sm-4');
      // newDiv.getElementsById.add('id');

      let newCard = document.createElement('div');
      newCard.classList.add('card', 'border-warning', 'mb-3');

      let newHeader = document.createElement('div');
      newHeader.classList.add('card-header', 'bg-transparent', 'border-warning');

      let newTitle = document.createElement('h2');
      newTitle.innerText = `${peluche.name}`;

      let newBody = document.createElement('div');
      newBody.classList.add('card-body', 'text-warning');


      let newImage = document.createElement('div');
      newImage.innerHTML = `<img src="${peluche.imageUrl}" class="card-img-top" alt="peluche"> `;

      // let newParagraph = document.createElement('p');
      // newParagraph.innerHTML = `<p class="card-text" ><strong>Description :</strong> <br>${peluche.description}</p>`;

      let newFooter = document.createElement('div');
      newFooter.classList.add('d-flex', 'justify-content-around', 'card-footer', 'bg-transparent', 'border-warning', 'text-warning');

      let prixConvertion = (peluche.price / 100);
      let newPrix = document.createElement('p');
      newPrix.innerHTML = `Prix : ${prixConvertion} €`;

      MAIN.append(newDiv);
      newDiv.append(newCard);
      newCard.append(newHeader);
      newHeader.append(newTitle);
      newCard.append(newBody, newFooter);
      newBody.append(newImage);
      newFooter.append(newPrix);
    };

  })

  .catch((err) => {
    console.log("Attention! Erreur: " + err);
    document.querySelector('body').innerHTML = `<h3>Sorry !!! <br> La page n'est pas disponible, veuillez installer npm puis node server 3000</h3>`;
  });










