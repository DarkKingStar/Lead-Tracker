import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import ProfileEdit from '../components/ProfileEdit';
import { ScaledSheet } from 'react-native-size-matters';

export default function EditProfile(){
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>
            <ProfileEdit/>
          <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </ScrollView>
    );
}
    
const styles = ScaledSheet.create({
    container: {
    height:'100%',
    paddingHorizontal: '30@s',
    alignItems: 'center',
    justifyContent: 'center',
    },
    title: {
    fontSize: '20@s',
    fontWeight: 'bold',
    },
    separator: {
    marginVertical: '30@s',
    height: '1@s',
    width: '80%',
    },
});