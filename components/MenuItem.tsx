import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import MenuProgressBar from './MenuProgressBar';

interface MenuItemProps {
    heading: string; // Assuming 'heading' should be a string, adjust the type accordingly
    totaltask: number;
    taskdone: number;
    img: string; // Assuming 'img' should be a string, adjust the type accordingly
  }

  const MenuItem: React.FC<MenuItemProps> = ({ heading, totaltask, taskdone, img }) => {
//   const imagefile = {
//     leadconverted : require('../assets/icons/leadconverted.png'),
//     meetings : require('../assets/icons/meetings.png'),
//     proposalseats : require('../assets/icons/proposalseats.png'),
//     totalleads : require('../assets/icons/totalleads.png'),
//   }
  return (
    <View>
    <View style={styles.container}>
    <View style={styles.menuDesc}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.task}>{taskdone} of {totaltask}</Text>
    </View>
    <View style={styles.iconholder}>
     {/* {img == "meetings" && <Image style={styles.icon} source={imagefile.meetings} />}
     {img == "leadconverted" && <Image style={styles.icon} source={imagefile.leadconverted} />}
     {img == "proposalseats" && <Image style={styles.icon} source={imagefile.proposalseats} />}
     {img == "totalleads" && <Image style={styles.icon} source={imagefile.totalleads} />} */}
    </View>
    </View>
    <MenuProgressBar progress={(Number(taskdone)/Number(totaltask))*100}/>
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
    backgroundColor: '#fff',
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