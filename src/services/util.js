
import {pokeEndpoint, pokeOption} from '../config/';

export function getPokemonList() {
    return fetch(`${pokeEndpoint}${pokeOption.pokemon}`)
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
        return res.sprite[spriteType];
      })
    });
  }

  /**
   * 
   * @param {*} pokeUrl Url for query the pokemon info
   * @returns All the object with the corresponding info about the pokemon
   */
export function getPokeInfo (pokeUrl) {
  return fetch(pokeUrl)
  .then((response) => {
    return response.json()
    .then((info) => {
          return info;
      })
  });
}