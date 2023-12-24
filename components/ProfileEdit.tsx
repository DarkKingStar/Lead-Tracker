import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { showMessage } from 'react-native-flash-message'
import FontAwesome  from '@expo/vector-icons/FontAwesome'

const ProfileEdit = () => {
  return (
    <View>
      <Text>ProfileEdit</Text>
      <Pressable onPress={()=>showMessage({
            message: "   Successfully Updated!",
            type: "success",
            position:"bottom",
            icon: props => <FontAwesome name="check" size={18} color="#fff" {...props}/>,
            })}>
                <Text>click me</Text>
            </Pressable>
    </View>
  )
}

export default ProfileEdit

const styles = StyleSheet.create({})