import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { showMessage } from 'react-native-flash-message';

export default function EditProfile(){
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>
          <Pressable onPress={()=>showMessage({
            message: "Simple message",
            type: "info",})}>
                <Text>click me</Text>
            </Pressable>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    title: {
    fontSize: 20,
    fontWeight: 'bold',
    },
    separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    },
});