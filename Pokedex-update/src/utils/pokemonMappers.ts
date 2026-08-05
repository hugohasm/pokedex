import {Result, SimplePokemon} from '../interfaces/pokemonInterface';

export const getPokemonIdFromUrl = (url: string) => {
  const urlParts = url.split('/').filter(Boolean);
  return urlParts[urlParts.length - 1];
};

export const getPokemonPictureById = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const mapPokemonList = (pokemonList: Result[]): SimplePokemon[] =>
  pokemonList.map(({name, url}) => {
    const id = getPokemonIdFromUrl(url);

    return {
      id,
      picture: getPokemonPictureById(id),
      name,
    };
  });
