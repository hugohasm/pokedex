import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PokemonFull} from '../interfaces/pokemonInterface';
import {ScrollView} from 'react-native-gesture-handler';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => {
  const weightInKg = pokemon.weight / 10;
  const heightInMeters = pokemon.height / 10;
  const visibleMoves = pokemon.moves.slice(0, 24);

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={[styles.container, styles.firstSection]}>
        <Text style={styles.title}>Tipos</Text>

        <View style={styles.row}>
          {pokemon.types.map(({type}) => (
            <Text style={styles.spacedText} key={type.name}>
              {type.name}
            </Text>
          ))}
        </View>

        <Text style={styles.title}>Datos base</Text>
        <Text style={styles.regularText}>Peso: {weightInKg} kg.</Text>
        <Text style={styles.regularText}>Altura: {heightInMeters} m.</Text>
        <Text style={styles.regularText}>
          Experiencia base: {pokemon.base_experience}
        </Text>
      </View>

      <View style={[styles.container, styles.spriteSection]}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      <View style={styles.container}>
        <Text style={styles.title}>Habilidades</Text>
        <View style={styles.row}>
          {pokemon.abilities.map(({ability}) => (
            <Text style={styles.spacedText} key={ability.name}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={styles.wrappedRow}>
          {visibleMoves.map(({move}) => (
            <Text style={styles.spacedText} key={move.name}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={styles.row}>
              <Text style={styles.statName}>{stat.stat.name}</Text>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    marginHorizontal: 20,
  },
  firstSection: {
    marginTop: 370,
  },
  spriteSection: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  row: {
    flexDirection: 'row',
  },
  wrappedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  spacedText: {
    fontSize: 19,
    marginRight: 10,
  },
  statName: {
    fontSize: 19,
    marginRight: 10,
    width: 150,
  },
  statValue: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
