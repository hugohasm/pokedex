import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useAnimation} from '../hooks/useAnimation';

interface Props {
  uri?: string | null;
  style?: StyleProp<ImageStyle & ViewStyle>;
}

export const FadeInImage = ({uri, style}: Props) => {
  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = () => {
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, style]}>
      {uri && isLoading ? (
        <ActivityIndicator
          style={styles.loadingIndicator}
          color="grey"
          size={30}
        />
      ) : null}

      {uri ? (
        <Animated.Image
          source={{uri}}
          onError={onError}
          onLoad={finishLoading}
          style={[style, {opacity}]}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
  },
});
