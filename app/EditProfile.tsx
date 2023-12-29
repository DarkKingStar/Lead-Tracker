import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import ProfileEdit from '../components/ProfileEdit';

export default function EditProfile(){
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>
            <ProfileEdit/>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </ScrollView>
    );
}
    
const styles = StyleSheet.create({
    container: {
    height:'100%',
    paddingHorizontal: 30,
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