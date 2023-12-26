import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import FontAwesome  from '@expo/vector-icons/FontAwesome'
import { Image } from 'expo-image'
import { useAuth } from '../context/AuthContext'
import { TextInput } from 'react-native-gesture-handler'
import TextInputField from './TextInputField'
import { divStyles } from '../styles/DivElement'
import { textStyles } from '../styles/TextElement'

const ProfileEdit = () => {
  const {userData} = useAuth();
  const [name,setName] = useState<string>('');
  const [email,setEmail] = useState<string>('');
  const [phone,setPhone] = useState<string>('');
  return (
    <View>
      <View style={styles.avatarholder}>
        <Image 
        source={userData?.imageURL}
        placeholder={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
        contentFit="cover"
        style={styles.avatar}/>
      </View>
      <Pressable style={styles.editimgbtn}>
        <FontAwesome name='pencil' size={20} color={'black'}/>
      </Pressable>
      <View style={{width:"100%", padding:34}}>
      <TextInputField 
      placeholder='Name'
       FocusColor={ '#426EB2'}
       NotFocusColor={ '#c9c9c9'}
       LeftIconColor={ "#C9C9C9"}
       RightIconColor={ "#C9C9C9"} 
       textValue={name}
       setTextValue={setName}
      LeftIconName='user'
      RightIconName='check'
      />
      <TextInputField 
      placeholder='Email'
       FocusColor={ '#426EB2'}
       NotFocusColor={ '#c9c9c9'}
       LeftIconColor={ "#C9C9C9"}
       RightIconColor={ "#C9C9C9"} 
       textValue={email}
       setTextValue={setEmail}
      LeftIconName='envelope'
      RightIconName='check'
      />
      
      <TextInputField 
      placeholder='Phone'
       FocusColor={ '#426EB2'}
       NotFocusColor={ '#c9c9c9'}
       LeftIconColor={ "#C9C9C9"}
       RightIconColor={ "#C9C9C9"} 
       textValue={phone}
       setTextValue={setPhone}
      LeftIconName='phone'
      RightIconName='check'
      />
      </View>
      
      <Pressable style={[divStyles.submitButton,{ marginTop: -15 }]} onPress={()=>showMessage({
            message: "   Successfully Updated!",
            type: "success",
            position:"bottom",
            icon: props => <FontAwesome name="check" size={18} color="#fff" {...props}/>,
            })}>
                <Text style={[textStyles.buttonText,{paddingHorizontal: 30}]}>Submit</Text>
            </Pressable>
    </View>
  )
}

export default ProfileEdit

const styles = StyleSheet.create({
  avatarholder:{
    backgroundColor: '#fff',
    borderRadius: 50,
    width:106,
    height:106,
    alignSelf: 'center',
    marginTop: -50,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadowColor: '#00000054',
    boxShadowOffset: { width: 4, height: 4 }, 
    boxShadowRadius: 5,
    borderColor:'#000',
    borderWidth: 1,
  },
  avatar:{
    width:100,
    height:100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor:'#000',
    borderWidth: 1,
  },
  editimgbtn:{
    alignSelf: 'center',
    marginTop: -50,
  },
  submit:{
    alignSelf: 'center',
    backgroundColor: 'blue',
  }
})