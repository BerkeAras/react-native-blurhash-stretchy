import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { Animated, LayoutChangeEvent, View } from 'react-native';
import { StretchyProps } from '../types';
import { stretchyImageStyles as styles } from './styles';

export interface StretchyImageProps
  extends Omit<StretchyProps, 'backgroundColor' | 'foreground' | 'onScroll'> {
  animation: Animated.Value;
  imageHeight: number;
  blurhash?: string;
  onLayout(event: LayoutChangeEvent): void;
}

export const StretchyImage: React.FC<StretchyImageProps> = ({
  animation,
  image,
  imageResizeMode,
  imageWrapperStyle,
  imageHeight,
  imageOverlay,
  blurhash = '',
  onLayout,
}) => {
  const transformStyles = useMemo(
    () => ({
      transform: [
        {
          translateY: animation.interpolate({
            inputRange: [-imageHeight, 0, imageHeight],
            outputRange: [imageHeight / 2, 0, -imageHeight / 2],
          }),
        },
        {
          scale: animation.interpolate({
            inputRange: [-imageHeight, 0, imageHeight],
            outputRange: [2, 1, 1],
          }),
        },
      ],
    }),
    [animation, imageHeight],
  );

  return (
    <View
      style={[imageWrapperStyle, styles.wrapper, { height: imageHeight }]}
      onLayout={onLayout}>
      <Image
        source={image}
        resizeMode={imageResizeMode}
        style={[styles.animatedImageBackground, transformStyles]}
        placeholder={{
          blurhash: blurhash,
        }}>
        {Boolean(imageOverlay) && imageOverlay}
      </Image>
    </View>
  );
};
