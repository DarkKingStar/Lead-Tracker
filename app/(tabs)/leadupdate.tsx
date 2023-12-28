import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'expo-image'
import bgimg from '../../assets/images/bgimg.png';


const leadupdate = () => {
  return (
    <ImageBackground  source={bgimg} style={{flex:1}}>
        <View style={{flex:1}}>
            <Text>leadupdate</Text>
        </View>
    </ImageBackground>
  )
}

export default leadupdate

const styles = StyleSheet.create({})