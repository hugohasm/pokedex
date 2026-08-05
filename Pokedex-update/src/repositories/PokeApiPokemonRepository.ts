import {pokemonApi} from '../api/pokemonApi';
import {
  PokemonFull,
  PokemonPaginatedResponse,
} from '../interfaces/pokemonInterface';
import {PokemonRepository} from './PokemonRepository';

class PokeApiPokemonRepository implements PokemonRepository {
  async getPokemonPage(resource: string) {
    const response = await pokemonApi.get<PokemonPaginatedResponse>(resource);
    return response.data;
  }

  async getPokemonById(id: string) {
    const response = await pokemonApi.get<PokemonFull>(`/pokemon/${id}`);
    return response.data;
  }
}

export const pokeApiPokemonRepository = new PokeApiPokemonRepository();
