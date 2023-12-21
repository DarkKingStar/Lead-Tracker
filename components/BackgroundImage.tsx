import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
interface Props {
  children: React.ReactNode;
}

const BackgroundImage = (props: Props) => {
  return (
      <ImageBackground
        source={require('../assets/images/bgimg.png')}
        style={styles.backgroundImage}
      >
      {props.children}
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', 
  },
});
export default BackgroundImage;
