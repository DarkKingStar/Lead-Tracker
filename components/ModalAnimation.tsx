import React, { useCallback } from 'react';
import { View, ViewStyle, Animated, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface ModalAnimationProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const ModalAnimation: React.FC<ModalAnimationProps> = ({ children, style }) => {
  const translateY = React.useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      return () => {
        Animated.timing(translateY, {
          toValue: Dimensions.get('window').height,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };
    }, [])
  );

  const animatedStyle = { transform: [{ translateY }] };

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};
