import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MenuProgressBar from './MenuProgressBar';
import { Image } from 'expo-image';
import Colors from '../constants/Colors';
import { useColorScheme } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

interface MenuItemProps {
    heading: string; 
    totallead: number;
    taskdone: number;
    img: string; 
  }

  const MenuItem: React.FC<MenuItemProps> = ({ heading, totallead, taskdone, img }) => {
    const colorScheme = useColorScheme();
  return (
    <View>
    <View style={styles.container}>
    <View style={styles.menuDesc}>
      <Text numberOfLines={1} ellipsizeMode='tail' style={styles.heading}>{heading}</Text>
      <Text style={styles.task}>{taskdone} of {totallead}</Text>
    </View>
    <View style={[styles.iconholder,{backgroundColor: `${Colors[colorScheme ?? 'light'].white}`}]}>
     <Image style={styles.icon} source={img} />
    </View>
    </View>
    <MenuProgressBar progress={(Number(taskdone)/Number(totallead))*100}/>
    </View>
  )
}

const styles = ScaledSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
  },
  menuDesc:{
    flex: 1,
  },
  iconholder:{
    width: '35@s',
    height: '28@s',
    borderRadius: '5@s',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'#4942E4',
    borderWidth: '1.5@s',
  },
  icon:{
    height:'20@s',
    width:'20@s',
  },
  heading:{
    color: '#4942E4',
    fontSize: '17@s',
    fontFamily: 'BebasNeur',
    textAlign: 'left',
  },
  task:{
  fontSize: '16@s',
  fontFamily: 'NotoSerif',
  textAlign: 'left',
  },
});

export default MenuItem