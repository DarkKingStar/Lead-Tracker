import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import Entypo  from '@expo/vector-icons/Entypo';

import { useAuth } from '../context/AuthContext';

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

const styles = StyleSheet.create({
    
    itemdiv:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal:30,
        borderColor: '#e2e2e2',
        borderWidth:1,
      },
      icon:{
        marginLeft:10,
        marginRight: 20,
        alignItems: 'center',
      },
      detailsdiv:{
        flex:1,
      },
      title: {
        fontSize: 12,
        marginBottom: -4,
        fontWeight: '800',
        color: '#00000066'
      },
      uservalue:{
        fontSize: 20,
        fontWeight: '600',
      },
})