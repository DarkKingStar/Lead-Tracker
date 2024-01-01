import React from 'react';
import {  ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

interface TabAnimationProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const TabAnimation: React.FC<TabAnimationProps> = ({ children, style }) => {
   const opacity = useSharedValue(0);

  useFocusEffect(
    React.useCallback(() => {
      opacity.value = withTiming(1, { duration: 800 });

      return () => {
        opacity.value = 0;
      };
    }, [])
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}