import React, {useCallback} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  ListRenderItemInfo,
  Platform,
} from 'react-native';
import {styles} from '../theme/appTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginate} from '../hooks/usePokemonPaginate';
import {PokemonCard} from '../components/PokemonCard';
import {Loading} from '../components/Loading';
import {StateMessage} from '../components/StateMessage';
import {SimplePokemon} from '../interfaces/pokemonInterface';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const titleInsets = {
    marginBottom: top + 20,
    top: top + 20,
  };
  const {
    isLoading,
    isLoadingMore,
    errorMessage,
    simplePokemonList,
    loadPokemons,
  } = usePokemonPaginate();
  const renderPokemon = useCallback(
    ({item}: ListRenderItemInfo<SimplePokemon>) => (
      <PokemonCard pokemon={item} />
    ),
    [],
  );

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage && simplePokemonList.length === 0) {
    return (
      <StateMessage
        title="Algo salio mal"
        message={errorMessage}
        actionLabel="Reintentar"
        onAction={loadPokemons}
      />
    );
  }

  if (simplePokemonList.length === 0) {
    return (
      <StateMessage
        title="Sin Pokemon"
        message="No encontramos Pokemon para mostrar por ahora."
      />
    );
  }

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      <View style={localStyles.listContainer}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={5}
          removeClippedSubviews={Platform.OS === 'android'}
          //header
          ListHeaderComponent={
            <Text
              style={[
                styles.title,
                styles.globalMargin,
                localStyles.title,
                titleInsets,
              ]}>
              Pokedex
            </Text>
          }
          renderItem={renderPokemon}
          //Infnite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            errorMessage ? (
              <StateMessage
                compact
                title="No se pudo cargar mas"
                message={errorMessage}
                actionLabel="Reintentar"
                onAction={loadPokemons}
              />
            ) : isLoadingMore ? (
              <ActivityIndicator
                style={localStyles.footer}
                size={20}
                color="grey"
              />
            ) : null
          }
        />
      </View>
    </>
  );
};

const localStyles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
  title: {
    paddingBottom: 10,
  },
  footer: {
    height: 100,
  },
});
