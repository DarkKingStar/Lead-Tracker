import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface MenuProgressBarProps{
    progress: number;
}

const MenuProgressBar: React.FC<MenuProgressBarProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    marginTop: '12@s',
    backgroundColor: '#ffffff',
    borderRadius: '8@s',
    overflow: 'hidden',
  },
  progressBar: {
    height: '15@s',
    backgroundColor: '#0047FF',
    overflow: 'hidden',
  },
  progressText: {
    marginTop: '8@s',
    textAlign: 'center',
    color: 'black',
  },
});

export default MenuProgressBar;