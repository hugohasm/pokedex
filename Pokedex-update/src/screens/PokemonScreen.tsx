import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RootStackParams} from '../navigator/navigationTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';
import {StateMessage} from '../components/StateMessage';
import {
  getFavoritePokemon,
  removeFavoritePokemon,
  saveFavoritePokemon,
} from '../storage/favoritePokemonStorage';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {name, id, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  const [isFavorite, setIsFavorite] = useState(false);

  const {isLoading, errorMessage, pokemon, loadPokemon} = usePokemon(id);

  useEffect(() => {
    getFavoritePokemon().then(favoritePokemon => {
      setIsFavorite(favoritePokemon?.id === id);
    });
  }, [id]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeFavoritePokemon();
      setIsFavorite(false);
      return;
    }

    await saveFavoritePokemon(simplePokemon);
    setIsFavorite(true);
  };

  return (
    <View style={styles.screen}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Volver al listado"
          style={{
            ...styles.backButton,
            top: top + 5,
          }}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleFavorite}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? 'Quitar Pokemon favorito' : 'Guardar Pokemon favorito'
          }
          style={{
            ...styles.favoriteButton,
            top: top + 7,
          }}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            color="white"
            size={34}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.name,
            top: top + 40,
          }}>
          {name + '\n'}#{id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={{...styles.pokeball}}
        />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : errorMessage ? (
        <StateMessage
          title="No se pudo cargar"
          message={errorMessage}
          actionLabel="Reintentar"
          onAction={loadPokemon}
        />
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  favoriteButton: {
    position: 'absolute',
    right: 22,
    top: 40,
  },
  name: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.5,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
