import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { router } from 'expo-router';
import ChatMessageBox from './ChatMessageBox';

const ChatBox = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={()=>router.replace('/Setting')}>
        <View style={styles.inputarea}>
          <View style={styles.inputholder}>
              <Text style={styles.inputtext}>Write a Message</Text>
              <View style={styles.sendIconHolder}>
                  <FontAwesome  name="paper-plane" size={16} color={'#FFFFFF'} />
              </View>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default ChatBox

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    messagearea:{
        padding: 12,
        backgroundColor: 'red',
        flex: 1,
    },
    inputarea:{
        backgroundColor: '#D9D9D9',
        padding: 16,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    inputholder:{
        backgroundColor:'white',
        margin: 8,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    inputtext:{
        width: '88%',
        paddingLeft: 18,
        fontSize: 18,
        color: '#B3B7BF',
    },
    sendIconHolder:{
        backgroundColor: '#547AFF',
        padding: 8,
        margin: 4,
        borderRadius: 50,
        alignItems: 'center'
    }
})