import {Animated, View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import MenuItem from './MenuItem'


const Menu = () => {
    // const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
    const gotoPage = () =>{
        
    }
    return (
    <View style={styles.container}>
        <View style={styles.row}>
            {/* <AnimatedLinearGradient colors={['#FFEEF7', '#F4BEDC']} style={styles.item}> */}
            <View style={styles.item}>
                <Pressable onPress={()=>gotoPage()}>
                <MenuItem heading='Meetings' totaltask={10} taskdone={10} img='meetings'/>
                </Pressable>
            </View>
            {/* </AnimatedLinearGradient> */}
            {/* <AnimatedLinearGradient colors={['#FFEEF7', '#F4BEDC']} style={styles.item}> */}
            <View style={styles.item}>
                <Pressable onPress={()=>gotoPage()}>
                <MenuItem heading='Total Leads' totaltask={10} taskdone={8} img='totalleads'/>
                </Pressable>
            </View>
            {/* </AnimatedLinearGradient> */}
        </View>
        <View style={styles.row}>
            {/* <AnimatedLinearGradient colors={['#FFEEF7', '#F4BEDC']} style={styles.item}> */}
            <View style={styles.item}>
                <Pressable onPress={()=>gotoPage()}>
                <MenuItem heading='Proposal Seats' totaltask={14} taskdone={5} img='proposalseats'/>
                </Pressable>
            </View>
            {/* </AnimatedLinearGradient> */}
            {/* <AnimatedLinearGradient colors={['#FFEEF7', '#F4BEDC']} style={styles.item}> */}
            <View style={styles.item}>
                <Pressable onPress={()=>gotoPage()}>
                <MenuItem heading='Leads Converted' totaltask={10} taskdone={6} img='leadconverted'/>
                </Pressable>
            </View>
            {/* </AnimatedLinearGradient> */}
        </View>
        <View style={styles.row}>
            {/* <AnimatedLinearGradient colors={['#FFEEF7', '#F4BEDC']} style={styles.item}> */}
            <View style={styles.item}>
                <Pressable onPress={()=>gotoPage()}>
                <MenuItem heading='Meetings' totaltask={15} taskdone={5} img='meetings'/>
                </Pressable>
            </View>
            {/* </AnimatedLinearGradient> */}
            {/* <AnimatedLinearGradient colors={['#FFEEF7', '#F4BEDC']} style={styles.item}> */}
            <View style={styles.item}>            
                <Pressable onPress={()=>gotoPage()}>
                <MenuItem heading='Total Leads' totaltask={10} taskdone={2} img='totalleads'/>
                </Pressable>
            </View>
            {/* </AnimatedLinearGradient> */}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    item: {
      flex: 0.48,
      backgroundColor: '#fcc',
      borderRadius: 10,
      borderWidth: 3,
      borderColor: '#fff',
      shadowOffset: {width: 0, height: 4},
      shadowColor: '#0000002B',
      shadowOpacity: 0.8,
      padding: 16,
    },
  });

export default Menu