'use strict';

// Query Selector
const charactersList = document.querySelector('.js_listCharacters');
const urlCharacters = `https://api.disneyapi.dev/character?pageSize=50`;
const input = document.querySelector('.js_descSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const favourites = document.querySelector('.js_listFavourites');

let listCharactersData = [];
let listFavouritesCharacters = [];

//Creo variable LocalStorage
const favStorage = JSON.parse(localStorage.getItem('charactersFavourites'));

// Función con variable LocalStorage. También añado el render en la función handleclick para que almacene los favoritos en los que se ha hecho click al reiniciar
function getFavStorage() {
  if (favStorage) {
    listFavouritesCharacters = favStorage;
    renderFavouriteCards(listFavouritesCharacters);
  }
}
getFavStorage();

// 1.Fetch para obtener información del servidor
fetch(urlCharacters)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    listCharactersData = data.data; //listCharacterData guarda todo el listado de personajes
    renderListCharacters(listCharactersData);
  });


//2. Crear función que renderiza el listado + bucle para recorrer el array de personajes y pintarlo en HTML
function renderListCharacters (list) {
  for (const eachCharacter of list ) {
    charactersList.innerHTML += renderOneCharacter(eachCharacter);
  }
  addEventFavouritesCharacters();
}
/*//renderiza lista de favoritos
function renderFavouriteCards (list) {
  for (const eachCharacter of list ) {
    favourites.innerHTML += renderOneCharacter(eachCharacter);
  }
}*/

// 3. Crear función que renderiza un personaje del total de la lista con la info que seleccione
function renderOneCharacter(dataCharacter) {
  const defaultImg = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'; // creo constante por si la card no tuviera imagen, se le añada la que le metemos del placeh.
  let cardImg = dataCharacter.imageUrl;
  if (cardImg === ''){
    cardImg = defaultImg;
  }

  let html = `<li class="cardEachCharacter" id="${dataCharacter._id}"> 
                <article>
                <img src="${cardImg}" alt="${dataCharacter.name}" class="imgCharacters"/>
                <p js_name">${dataCharacter.name}</p>
                </article>
            </li>`;

  return html;
 
}

//4. Generar el evento en cada character
function addEventFavouritesCharacters () {
  const list = document.querySelectorAll('.cardEachCharacter');
  console.log(list);
  for(const singleCharacter of list) {
    singleCharacter.addEventListener('click', handleClick);

  }
}

// 5. Función para renderizar los favoritos (atributo gancho id)

function renderFavouriteCards (list) {
  let html = '';
  for (const eachCharacter of list ) {
    html += `<div class="characters-div">
  <div class="characters js_favourite-card" id="${eachCharacter._id}">
  <p class="names"> Name:${eachCharacter.name}</p>
  <img src="${eachCharacter.imageUrl}" alt="${eachCharacter.name}"/>
  </div>
  </div>`;

  }
  favourites.innerHTML = html;
  /*return html;*/
}


//6. Handleclick para convertir la tarjeta en favorita cuando la usuaria hace click

function handleClick(event) {
  const id = parseInt(event.currentTarget.id); // id de la carta sobre la que se hace el click y parseInt para convertirlo en número
  console.log(id);
  const selectedCard = listCharactersData.find((item) => item._id === id); // de la lista de caracters encuentra el id que coincide con el id de la carta que el usuario ha seleccionado
  const indexCharacter = listFavouritesCharacters.findIndex((item) => item._id === id); // en la lista de favoritos está el id clickado por el usuario? si no está el resultado sera index -1.

  //añadirlo al listado de favoritos
  if(indexCharacter === -1) {
    listFavouritesCharacters.push(selectedCard); // Lo añade si no está en la lista de favoritos
  } else {
    listFavouritesCharacters.splice(indexCharacter, 1); // elimina coincidencia, si estuviera

  }
  console.log(listFavouritesCharacters);
  favourites.innerHTML= renderFavouriteCards(listFavouritesCharacters);

  // 7. Guardar a los seleccionados favoritos en el LocalStorage y que se mantengan al reiniciar página. Al inicio creo constante y función
  renderFavouriteCards(listFavouritesCharacters);
  localStorage.setItem('charactersFavourites', JSON.stringify(listFavouritesCharacters));

}



