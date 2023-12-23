import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MenuProgressBar from './MenuProgressBar';
import { Image } from 'expo-image';
import Colors from '../constants/Colors';
import { useColorScheme } from 'react-native';

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
      <Text style={styles.heading}>{heading}</Text>
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

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
  },
  menuDesc:{
    flex: 1,
  },
  iconholder:{
    width: 34,
    height: 30,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'#FF008C',
    borderWidth: 1,
  },
  icon:{
    height:22,
    width:22,
  },
  heading:{
    color: '#FF008C',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'left',
  },
  task:{
  fontSize: 20,
  fontWeight: '700',
  textAlign: 'left',
  },
});

export default MenuItem