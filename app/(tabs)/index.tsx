import {  ScrollView, View } from 'react-native';
import UserDetails from '../../components/Userdetails'
import Menu from '../../components/Menu';
import React from 'react';
import { ImageBackground } from 'expo-image';
import bgimg from '../../assets/images/bgimg.png';
import { TabAnimation } from '../../components/TabAnimation';
import { ScaledSheet } from 'react-native-size-matters';

export default function HomeScreen() {
  
  return (
    <View style={styles.container}>
      <ImageBackground  source={bgimg} style={{flex:1}}>

        <TabAnimation style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.scrollcontainer}>
          <UserDetails/>
          <Menu/>
        </ScrollView>
        </TabAnimation>
      </ImageBackground>
    </View>
  );
}
HomeScreen.navigationOptions = {
  headerLeft: null, // This will hide the back button
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollcontainer:{
      paddingBottom: '8@s',
      paddingHorizontal: '8@s',  
  },
  title: {
    fontSize: '20@s',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: '30@s',
    height: '1@s',
    width: '100%',
    backgroundColor: '#FF008C',
  },
});
