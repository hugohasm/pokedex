import {
  getFavoritePokemon,
  removeFavoritePokemon,
  saveFavoritePokemon,
} from '../src/storage/favoritePokemonStorage';

const pikachu = {
  id: '25',
  name: 'pikachu',
  picture: 'https://example.com/pikachu.png',
};

describe('favorite Pokemon storage', () => {
  afterEach(async () => {
    await removeFavoritePokemon();
  });

  it('saves and restores the selected Pokemon', async () => {
    await saveFavoritePokemon(pikachu);

    await expect(getFavoritePokemon()).resolves.toEqual(pikachu);
  });

  it('removes the selected Pokemon', async () => {
    await saveFavoritePokemon(pikachu);
    await removeFavoritePokemon();

    await expect(getFavoritePokemon()).resolves.toBeNull();
  });
});
