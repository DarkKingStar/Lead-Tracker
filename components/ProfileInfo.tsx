import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import Entypo  from '@expo/vector-icons/Entypo';

import { useAuth } from '../context/AuthContext';
import { ScaledSheet } from 'react-native-size-matters';

const ProfileInfo = () => {
    const {userData} = useAuth();
  return (
    <>
        <View style={styles.itemdiv}>
          <View style={styles.icon}>
            <FontAwesome name="user" size={24} color="#0044ff"/>
          </View>
          <View style={styles.detailsdiv}>
            <Text style={styles.title}>{"Full Name"}</Text>
            <Text style={styles.uservalue}>{userData.fullname}</Text>
          </View>
        </View>
        <View style={styles.itemdiv}>
          <View style={styles.icon}>
            <Entypo name="v-card" size={24} color="#9100ce"/>
          </View>
          <View style={styles.detailsdiv}>
            <Text style={styles.title}>{"Username"}</Text>
            <Text style={styles.uservalue}>{userData.username}</Text>
          </View>
        </View>
        <View style={styles.itemdiv}>
          <View style={styles.icon}>
            <FontAwesome name="briefcase" size={24} color="#fb7805" />
          </View>
          <View style={styles.detailsdiv}>
          <Text style={styles.title}>{"Designation"}</Text>
          <Text style={styles.uservalue}>{userData.degname}</Text>
          </View>
        </View>
        <View style={styles.itemdiv}>
          <View style={styles.icon}>
            <FontAwesome name="envelope" size={24} color="#ff0044" />
          </View>
          <View style={styles.detailsdiv}>
          <Text style={styles.title}>{"Email"}</Text>
          <Text style={styles.uservalue}>{userData.email}</Text>
          </View>
        </View>
        <View style={styles.itemdiv}>
        <View style={styles.icon}>
          <FontAwesome name="phone-square" size={24} color="#08bb0a" />
        </View>
          <View style={styles.detailsdiv}>
          <Text style={styles.title}>{"Phone"}</Text>
          <Text style={styles.uservalue}>{userData.contactno}</Text>
          </View>
          
        </View>
    </>
  )
}

export default ProfileInfo

const styles = ScaledSheet.create({
    
    itemdiv:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '8@s',
        borderRadius: '8@s',
        marginBottom: '6@s',
        marginHorizontal:'20@s',
        borderColor: '#e1e1e1',
        backgroundColor: '#ffffff',
        borderWidth:1,
      },
      icon:{
        marginHorizontal:'10@s',
        width: '25@s',
        alignItems: 'center',
        alignContent: 'center'
      },
      detailsdiv:{
        flex:1,
      },
      title: {
        fontSize: '10@s',
        marginBottom: '-4@s',
        fontWeight: '800',
        color: '#00000066'
      },
      uservalue:{
        fontSize: '15@s',
        fontWeight: '600',
      },
})