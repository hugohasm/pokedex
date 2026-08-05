import React, {useEffect} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedValue} from '../hooks/useDebouncedValue';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = React.useState('');

  const debouncedValue = useDebouncedValue(textValue, 500);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue, onDebounce]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textBackground}>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS === 'android' && styles.androidInput,
          ]}
          placeholder="Buscar pokemon"
          accessibilityLabel="Buscar Pokemon por nombre o numero"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon
          name="search-outline"
          size={30}
          color="grey"
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {},
  textBackground: {
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
  androidInput: {
    top: 2,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
