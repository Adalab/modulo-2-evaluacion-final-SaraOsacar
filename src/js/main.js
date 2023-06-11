'use strict';

// Query Selector
const charactersList = document.querySelector('.js_listCharacters');
const urlCharacters = `https://api.disneyapi.dev/character?pageSize=50`;
const input = document.querySelector('.js_descSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const favourites = document.querySelector('.js_listFavourites');

let listCharactersData = [];
let listFavouritesCharacters = [];


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
//renderiza lista de favoritos
function renderFavoriteCards (list) {
  for (const eachCharacter of list ) {
    favourites.innerHTML += renderOneCharacter(eachCharacter);
  }
}

// 3. Crear función que renderiza un personaje del total de la lista con la info que seleccione
function renderOneCharacter(dataCharacter) {
  const defaultImg = 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney'; // creo constante por si la card no tuviera imagen, se le añada la que le metemos del placeh.
  let cardImg = dataCharacter.imageUrl;
  if (cardImg === ''){
    cardImg = defaultImg;
  }

  let html = `<li id="${dataCharacter.__id}">
                <article>
                <img src="${cardImg}" alt=${dataCharacter.name}/>
                <p js_name">${dataCharacter.name}</p>
                </article>
            </li>`;
  return html;
}

//4. Generar el evento en cada character
function addEventFavouritesCharacters () {
  for(const singleCharacter of charactersList) {
    singleCharacter.addEventListener('click', handleClick);
  }
}



