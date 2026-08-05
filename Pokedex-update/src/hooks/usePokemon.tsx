import {useCallback, useEffect, useState} from 'react';
import {PokemonFull} from '../interfaces/pokemonInterface';
import {pokeApiPokemonRepository} from '../repositories/PokeApiPokemonRepository';
import {PokemonRepository} from '../repositories/PokemonRepository';

const pokemonCache: Record<string, PokemonFull> = {};

export const usePokemon = (
  id: string,
  repository: PokemonRepository = pokeApiPokemonRepository,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  const loadPokemon = useCallback(async () => {
    const cachedPokemon = pokemonCache[id];

    if (cachedPokemon) {
      setPokemon(cachedPokemon);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      const pokemonDetail = await repository.getPokemonById(id);
      pokemonCache[id] = pokemonDetail;
      setPokemon(pokemonDetail);
    } catch (error) {
      setErrorMessage(
        'No pudimos cargar el detalle de este Pokemon. Intenta de nuevo.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [id, repository]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  return {
    isLoading,
    errorMessage,
    pokemon,
    loadPokemon,
  };
};
