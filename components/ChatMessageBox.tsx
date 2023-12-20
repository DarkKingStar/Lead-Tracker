import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';


const ChatMessageBox = () => {
  return (
    <View>
    {/* { chatmesssage.map((item,index)=>( */}
    
    <View  style={styles.chatbubble}>
        <Text style={styles.chattext}>keqwefr olwrokgrgwt boigtwkge geottgwemgw twepottwgtm4t wetotjwgwe oiqrt m3iq</Text>
        <Text style={styles.time}>12:56</Text>
    </View>
    {/* ))} */}
</View>
  )
}

export default ChatMessageBox

const styles = StyleSheet.create({
    chatbubble:{
        borderRadius: 8,
        marginVertical: 12,
        marginHorizontal: 12,
        paddingVertical: 6, 
        paddingHorizontal: 12,
        backgroundColor: '#DDD',
    },
    time:{
        color: '#382ADD',
        fontSize: 11,
        fontWeight: '800',
        alignSelf: 'flex-end',
    },
    chattext:{
        fontSize: 18,
        color: 'black',
    },
})