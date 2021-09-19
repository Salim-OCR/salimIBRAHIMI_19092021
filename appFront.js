// function body(){
    fetch("http://localhost:3000/api/teddie")
    .then(function(res) {
        if (res.ok) {
    
          return res.json();
        }
      })
      .then(function(value) {
        console.log(value);
      })
      .catch(function(err) {
        // Une erreur est survenue
        console.log("Attention! Erreur: " + err);
      });
// }


//console.log(window);


