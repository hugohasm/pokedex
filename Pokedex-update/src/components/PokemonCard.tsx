import React, {memo, useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ImageColors from 'react-native-image-colors';

import {SimplePokemon} from '../interfaces/pokemonInterface';
import {RootStackParams} from '../navigator/navigationTypes';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: SimplePokemon;
}

type PokemonNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>;

const PokemonCardComponent = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation<PokemonNavigationProp>();
  const {width: windowWidth} = useWindowDimensions();
  const cardWidth = Math.min(windowWidth * 0.4, 260);

  useEffect(() => {
    isMounted.current = true;

    ImageColors.getColors(pokemon.picture, {fallback: 'grey'})
      .then(colors => {
        if (!isMounted.current) {
          return;
        }

        let nextColor = 'grey';

        switch (colors.platform) {
          case 'android':
            nextColor = colors.dominant || colors.vibrant || 'grey';
            break;
          case 'ios':
            nextColor = colors.background || colors.primary;
            break;
          case 'web':
            nextColor = colors.dominant || colors.vibrant || 'grey';
            break;
        }

        setBgColor(nextColor || 'grey');
      })
      .catch(() => {
        if (isMounted.current) {
          setBgColor('grey');
        }
      });

    return () => {
      isMounted.current = false;
    };
  }, [pokemon.picture]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${pokemon.name}, numero ${pokemon.id}`}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: cardWidth,
          backgroundColor: bgColor,
        }}>
        <View style={styles.labelContainer}>
          <Text
            style={styles.name}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}>
            {pokemon.name}
          </Text>
          <Text style={styles.number}>#{pokemon.id}</Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage
          uri={pokemon.picture}
          style={styles.pokemonImage}
          enableFade={false}
        />
      </View>
    </TouchableOpacity>
  );
};

export const PokemonCard = memo(PokemonCardComponent);

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  number: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  labelContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 105,
    height: 105,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
