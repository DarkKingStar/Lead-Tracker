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
    height: '30@s',
    borderRadius: '5@s',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor:'#183399',
    borderWidth: '1.5@s',
  },
  icon:{
    height:'15@s',
    width:'15@s',
  },
  heading:{
    fontSize: '14@s',
    color:'#183399',
    fontFamily: 'RubikBold',
    textAlign: 'left',
    height: '42@s',
  },
  task:{
  color: '#000',
  fontSize: '20@s',
  fontFamily: 'RubikBold',
  textAlign: 'left',
  },
});

export default MenuItem