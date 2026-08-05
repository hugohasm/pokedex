import {useCallback, useEffect, useState} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterface';
import {pokeApiPokemonRepository} from '../repositories/PokeApiPokemonRepository';
import {PokemonRepository} from '../repositories/PokemonRepository';
import {mapPokemonList} from '../utils/pokemonMappers';

export const usePokemonSearch = (
  repository: PokemonRepository = pokeApiPokemonRepository,
) => {
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const loadPokemons = useCallback(async () => {
    try {
      setIsFetching(true);
      setErrorMessage('');
      const page = await repository.getPokemonPage('/pokemon?limit=2000');

      setSimplePokemonList(mapPokemonList(page.results));
    } catch (error) {
      setErrorMessage(
        'No pudimos preparar la busqueda. Revisa tu conexion e intenta de nuevo.',
      );
    } finally {
      setIsFetching(false);
    }
  }, [repository]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return {
    isFetching,
    errorMessage,
    simplePokemonList,
    loadPokemons,
  };
};
