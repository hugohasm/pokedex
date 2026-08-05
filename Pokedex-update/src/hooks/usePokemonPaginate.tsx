import {useCallback, useEffect, useRef, useState} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterface';
import {pokeApiPokemonRepository} from '../repositories/PokeApiPokemonRepository';
import {PokemonRepository} from '../repositories/PokemonRepository';
import {mapPokemonList} from '../utils/pokemonMappers';

export const usePokemonPaginate = (
  repository: PokemonRepository = pokeApiPokemonRepository,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const nextPageUrl = useRef('/pokemon?limit=20');
  const isRequesting = useRef(false);
  const pokemonListLength = useRef(0);

  const loadPokemons = useCallback(async () => {
    if (isRequesting.current || !nextPageUrl.current) {
      return;
    }

    try {
      isRequesting.current = true;
      setErrorMessage('');
      setIsLoading(pokemonListLength.current === 0);
      setIsLoadingMore(pokemonListLength.current > 0);

      const page = await repository.getPokemonPage(nextPageUrl.current);

      nextPageUrl.current = page.next || '';
      setSimplePokemonList(currentList => {
        const nextList = [...currentList, ...mapPokemonList(page.results)];
        pokemonListLength.current = nextList.length;
        return nextList;
      });
    } catch (error) {
      setErrorMessage(
        'No pudimos cargar los Pokemon. Revisa tu conexion e intenta de nuevo.',
      );
    } finally {
      isRequesting.current = false;
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [repository]);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return {
    isLoading,
    isLoadingMore,
    errorMessage,
    simplePokemonList,
    loadPokemons,
  };
};
