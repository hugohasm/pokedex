import {
  PokemonFull,
  PokemonPaginatedResponse,
} from '../interfaces/pokemonInterface';

export interface PokemonRepository {
  getPokemonPage: (resource: string) => Promise<PokemonPaginatedResponse>;
  getPokemonById: (id: string) => Promise<PokemonFull>;
}
