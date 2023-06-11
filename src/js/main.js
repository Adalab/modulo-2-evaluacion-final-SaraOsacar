'use strict';

// Query Selector
const charactersList = document.querySelector('.js_listCharacters');
const urlCharacters = `https://api.disneyapi.dev/character?page=50`;
const input = document.querySelector('.js_descSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const favourites = document.querySelector('.js_listFavourites');

let listCharactersData = [];


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
}

// 3. Crear función que renderiza un personaje con la info que seleccione
function renderOneCharacter(dataCharacter) {
  let html = `<li id="${dataCharacter.__id}">
                <article>
                <img src="${dataCharacter.imageUrl}" alt=${dataCharacter.name}/>
                <p js_name">${dataCharacter.name}</p>
                </article>
            </li>`;
  return html;
}
