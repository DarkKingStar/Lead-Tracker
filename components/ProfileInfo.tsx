import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import Entypo  from '@expo/vector-icons/Entypo';

import { useAuth } from '../context/AuthContext';
import { ScaledSheet, scale } from 'react-native-size-matters';

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
            <Entypo name="v-card" size={scale(20)} color="#9100ce"/>
          </View>
          <View style={styles.detailsdiv}>
            <Text style={styles.title}>{"Username"}</Text>
            <Text style={styles.uservalue}>{userData.username}</Text>
          </View>
        </View>
        <View style={styles.itemdiv}>
          <View style={styles.icon}>
            <FontAwesome name="briefcase" size={scale(20)} color="#fb7805" />
          </View>
          <View style={styles.detailsdiv}>
          <Text style={styles.title}>{"Designation"}</Text>
          <Text style={styles.uservalue}>{userData.degname}</Text>
          </View>
        </View>
        <View style={styles.itemdiv}>
          <View style={styles.icon}>
            <FontAwesome name="envelope" size={scale(20)} color="#ff0044" />
          </View>
          <View style={styles.detailsdiv}>
          <Text style={styles.title}>{"Email"}</Text>
          <Text style={styles.uservalue}>{userData.email}</Text>
          </View>
        </View>
        <View style={styles.itemdiv}>
        <View style={styles.icon}>
          <FontAwesome name="phone-square" size={scale(20)} color="#08bb0a" />
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
        borderRadius: '8@s',
        marginBottom: '6@s',
        borderColor: '#e1e1e1',
        backgroundColor: '#ffffff',
        borderWidth:1,
      },
      icon:{
        paddingHorizontal:'10@s',
        width: '45@s',
        height: '35@s',
        borderTopLeftRadius: '7@s',
        borderBottomLeftRadius: '7@s',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '5@s',
      },
      detailsdiv:{
        flex:1,
      },
      title: {
        fontSize: '10@s',
        marginBottom: '-4@s',
        fontFamily: 'RubikExtraBold',
        color: '#3559E0'
      },
      uservalue:{
        fontSize: '15@s',
        fontFamily: 'RubikMedium',
      },
})