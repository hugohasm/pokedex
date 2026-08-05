import {SimplePokemon} from '../interfaces/pokemonInterface';
import {localStorage} from './localStorage';

const FAVORITE_POKEMON_KEY = 'favorite_pokemon';

export const getFavoritePokemon = async () => {
  const favoritePokemon = await localStorage.getItem(FAVORITE_POKEMON_KEY);

  if (!favoritePokemon) {
    return null;
  }

  try {
    const parsedPokemon = JSON.parse(favoritePokemon) as Partial<SimplePokemon>;

    if (
      typeof parsedPokemon.id === 'string' &&
      typeof parsedPokemon.name === 'string' &&
      typeof parsedPokemon.picture === 'string'
    ) {
      return parsedPokemon as SimplePokemon;
    }
  } catch {
    // Invalid persisted data is cleared below so the app can recover safely.
  }

  await removeFavoritePokemon();
  return null;
};

export const saveFavoritePokemon = async (pokemon: SimplePokemon) => {
  await localStorage.setItem(FAVORITE_POKEMON_KEY, JSON.stringify(pokemon));
};

export const removeFavoritePokemon = async () => {
  await localStorage.removeItem(FAVORITE_POKEMON_KEY);
};
