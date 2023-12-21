import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#0047FF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
    color: 'black',
  },
});

export default MenuProgressBar;