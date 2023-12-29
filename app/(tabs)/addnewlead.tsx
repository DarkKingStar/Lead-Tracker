import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageBackground } from 'expo-image'
import bgimg from '../../assets/images/bgimg.png';
import { TabAnimation } from '../../components/TabAnimation';
import AddLeadbyUser from '../../components/AddLeadbyUser';


const leadupdate = () => {
  return (
    <ImageBackground  source={bgimg} style={{flex:1}}>
        <TabAnimation style={{flex:1}}>
          <AddLeadbyUser/>        
        </TabAnimation>
    </ImageBackground>
  )
}

export default leadupdate

const styles = StyleSheet.create({})