import {SimplePokemon} from '../interfaces/pokemonInterface';

export type RootStackParams = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  PokemonScreen: {simplePokemon: SimplePokemon; color: string};
};

export type RootTabParams = {
  Listado: undefined;
  SearchScreen: undefined;
};
