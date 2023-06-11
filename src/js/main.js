'use strict';

//Query Selector

const input = document.querySelector('.js_descSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const charactersUl = document.querySelector('.js_listCharacters');
const favourites = document.querySelector('.js_listFavourites');
const urlCharacters = 'https://api.disneyapi.dev/character?pageSize=50';

let listCharactersData = [];


// 1.Fetch para obtener información del servidor
fetch(urlCharacters)
  .then((response) => response.json())
  .then((data)=> {
    console.log(data);
    listCharactersData = data.characters;
    console.log(listCharactersData);
    renderListCharacters(listCharactersData);

  });
//2. Crear función que renderiza el listado + bucle para recorrer el array de personajes
function renderListCharacters(listData) {
  charactersUl.innerHTML = '';
  for(const character of listData) {
    charactersUl.innerHTML += renderCharacter(character);

  }
}
// 3. Crear función que renderiza un personaje
function renderCharacter(character) {
  const html = `<li>${character.name}</li>`;
  return html;
}