import React from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

interface ModalAnimationProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ModalAnimation: React.FC<ModalAnimationProps> = ({ children, style }) => {
  const translateY = useSharedValue(Dimensions.get('window').height);

  useFocusEffect(
    React.useCallback(() => {
      translateY.value = withTiming(0, { duration: 300 });

      return () => {
        translateY.value = Dimensions.get('window').height;
      };
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
