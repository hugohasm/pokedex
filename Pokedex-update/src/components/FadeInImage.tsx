import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
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
  enableFade?: boolean;
}

export const FadeInImage = ({uri, style, enableFade = true}: Props) => {
  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);

    if (enableFade) {
      fadeIn();
    }
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

      {uri && enableFade ? (
        <Animated.Image
          source={{uri}}
          onError={onError}
          onLoad={finishLoading}
          style={[style, {opacity}]}
        />
      ) : uri ? (
        <Image
          source={{uri}}
          onError={onError}
          onLoad={finishLoading}
          style={style}
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
