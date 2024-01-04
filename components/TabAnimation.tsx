import React, { useCallback } from 'react';
import { View, ViewStyle, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface TabAnimationProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const TabAnimation: React.FC<TabAnimationProps> = ({ children, style }) => {
  const opacity = React.useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      return () => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start();
      };
    }, [])
  );

  const animatedStyle = { opacity };

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};
