const title = document.querySelector(".title");
const reveil = document.querySelector(".reveil");
const chrono = document.querySelector(".chrono");
const horloge = document.querySelector(".horloge");
const minuteur = document.querySelector(".minuteur");
const result = document.querySelector('.result');

setInterval( () => {
    let date = new Date().toLocaleTimeString("fr-FR");

    result.textContent = date;

},
1000);