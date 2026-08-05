import {
  getPokemonIdFromUrl,
  getPokemonPictureById,
  mapPokemonList,
} from '../src/utils/pokemonMappers';

describe('pokemon mappers', () => {
  it('extracts the Pokemon id from a PokeAPI URL', () => {
    expect(getPokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(
      '25',
    );
  });

  it('maps API results to the model used by the list', () => {
    expect(
      mapPokemonList([
        {name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/'},
      ]),
    ).toEqual([
      {
        id: '25',
        name: 'pikachu',
        picture: getPokemonPictureById('25'),
      },
    ]);
  });
});
