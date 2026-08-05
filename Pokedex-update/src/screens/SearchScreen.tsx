import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  ListRenderItemInfo,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {styles} from '../theme/appTheme';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
import {SimplePokemon} from '../interfaces/pokemonInterface';
import {StateMessage} from '../components/StateMessage';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {width: screenWidth} = useWindowDimensions();
  const {isFetching, errorMessage, simplePokemonList, loadPokemons} =
    usePokemonSearch();

  const [term, setTerm] = useState('');
  const updateTerm = useCallback((value: string) => setTerm(value.trim()), []);
  const searchInputStyle = {
    top: Platform.OS === 'ios' ? top : top + 30,
    width: screenWidth - 40,
  };
  const titleInsets = {
    marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
  };

  const pokemonFiltered = useMemo(() => {
    if (term.length === 0) {
      return [];
    }

    if (isNaN(Number(term))) {
      return simplePokemonList.filter(poke =>
        poke.name.toLocaleLowerCase().includes(term.toLowerCase()),
      );
    }

    const pokemonById = simplePokemonList.find(poke => poke.id === term);
    return pokemonById ? [pokemonById] : [];
  }, [simplePokemonList, term]);
  const renderPokemon = useCallback(
    ({item}: ListRenderItemInfo<SimplePokemon>) => (
      <PokemonCard pokemon={item} />
    ),
    [],
  );

  if (isFetching) {
    return <Loading />;
  }

  if (errorMessage) {
    return (
      <StateMessage
        title="Busqueda no disponible"
        message={errorMessage}
        actionLabel="Reintentar"
        onAction={loadPokemons}
      />
    );
  }

  return (
    <View style={localStyles.container}>
      <SearchInput
        onDebounce={updateTerm}
        style={[localStyles.searchInput, searchInputStyle]}
      />
      <FlatList
        data={pokemonFiltered}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        ListHeaderComponent={
          <Text
            style={[
              styles.title,
              styles.globalMargin,
              localStyles.title,
              titleInsets,
            ]}>
            {term}
          </Text>
        }
        ListEmptyComponent={
          term.length > 0 ? (
            <StateMessage
              title="Sin resultados"
              message="Prueba con otro nombre o numero de Pokemon."
            />
          ) : null
        }
        renderItem={renderPokemon}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  searchInput: {
    position: 'absolute',
    zIndex: 999,
  },
  title: {
    paddingBottom: 10,
  },
});
