
import {pokeEndpoint, pokeOption} from '../config/';

/**
 * Pagination
 * @param {*} url 
 */
export function getPokemonList(url) {
    return fetch(url ? url : `${pokeEndpoint}${pokeOption.pokemon}`)
    .then((response) => {
      return response.json()
      .then((res) => {
        return res;
      })
    });
  }
  
  /**
   * 
   * @param {*} id Pokemon Identifier 
   * @param {*} spriteType back_default, back_female, back_shiny, back_shiny_female, front_default, front_female, front_shiny, front_shiny_female
   */
 export function getPokemonSprite(id, spriteType) {
    return fetch(`${pokeEndpoint}${pokeOption.pokemon}/${id}`)
    .then((response) => {
      return response.json()
      .then((res) => {
        return spriteType
        ? res.sprite[spriteType] 
        : res.sprite;;
      })
    });
  }

  /**
   * 
   * @param {*} pokeUrl Url for query the pokemon info
   * @returns All the object with the corresponding info about the pokemon
   */
export function getPokeInfo (pokeUrl, id) {
  return fetch(pokeUrl ? pokeUrl : `${pokeEndpoint}${pokeOption.pokemon}/${id}`)
  .then((response) => {
    return response.json()
    .then((info) => {
          return info;
      })
  });
}

export function getAllPokemonInfo (url) {
    let infoComplete;
    return getPokemonList(url)
    .then((e) => {
        return Promise.resolve(infoComplete = e);
    })
    .then(async () => {
        infoComplete.results.forEach((pokemon) => {
           pokemon.id = pokemon.url.split('pokemon/')[1].replace('/', '');
        })
        return Promise.resolve(infoComplete);
    })
    .catch((e) => console.log(e));
}

export function getMoveDetail(url){
  
}

export function getRandomEnemies(pokeList, cant) {
  const pokeSelected = pokeList[(Math.random() * (pokeList.length - 1) + 1).toFixed(0)];
  return getPokeInfo(null, pokeSelected.id)
  .then((response) => {
    return Promise.resolve(response);
  })
}

export function getPokemonHp(height, weight) {
  return (height * weight - (( Math.random() * ((50) + (-50) + -50) ) / 100)).toFixed(0);
}

export function getPokemonPowerInfoByMove(url) {
  return fetch(url)
  .then((response) =>  response.json());
}

export function getPowerByMove(url) {
  getPokemonPowerInfoByMove(url)
  .then(({accuracy, power}) => {
    return Promise.resolve({
      accuracy, power
    })
  })
}