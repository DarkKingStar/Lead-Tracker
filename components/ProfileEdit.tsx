import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import FontAwesome  from '@expo/vector-icons/FontAwesome'
import { Image } from 'expo-image'
import { useAuth } from '../context/AuthContext'
import TextInputField from './TextInputField'
import { divStyles } from '../styles/DivElement'
import { textStyles } from '../styles/TextElement'
import { router } from 'expo-router'

import * as ImagePicker from 'expo-image-picker';


const ProfileEdit = () => {
  const {userData, authState, OnProfileUpdate,OnProfileImageUpdate } = useAuth();
  const [name,setName] = useState<string>(userData.fullname!=null?userData.fullname:'');
  const [email,setEmail] = useState<string>(userData.email!=null?userData.email:'');
  const [phone,setPhone] = useState<string>(userData.contactno!=null?userData.contactno:'');
  const [profileImageUri, setProfileimageUri] = useState<string>(userData?.imageURL!=null?userData?.imageURL:'');
  

  useEffect(()=>{
    setProfileimageUri(userData?.imageURL!=null?userData?.imageURL:'');
  },[userData])

  const handleSubmit = async() =>{
    try{
      const flagData =  await OnProfileUpdate(name,email,phone);
      showMessage({
        message: `   ${flagData?.message}`,
        type: flagData?.error?"danger":"success",
        position:"bottom",
        icon: props => flagData?.error?<FontAwesome name="close" size={17} color="#fff" {...props}/>:<FontAwesome name="check" size={17} color="#fff" {...props}/>,
        })
      if(!flagData?.error){
        router.back();
      }
    }catch(err:any){
      console.log(err?.message)
    }
  }
  
  const handleUploadImage = async() =>{
    try{
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if(!result.canceled){
        let type = result.assets[0].uri.split('.').pop() || 'png';
        setProfileimageUri(result.assets[0].uri);
        await updateImage(result.assets[0].uri, type);
      }
    }catch(err:any){
      console.log(err?.message);
    }
  }
  const updateImage = async(imageUri: string, imageType:string) =>{
    try{
        const flagData = await OnProfileImageUpdate(imageUri,imageType);
        showMessage({
        message: `   ${flagData?.message}`,
        type: flagData?.error?"danger":"success",
        position:"center",
        icon: props => flagData?.error?<FontAwesome name="close" size={17} color="#fff" {...props}/>:<FontAwesome name="check" size={17} color="#fff" {...props}/>,
        })
        // let filename = "pg" + '.' + imageType
        // let imguri = FileSystem.documentDirectory + filename;
        // await FileSystem.copyAsync({
        //   from: imageUri,
        //   to: imguri,
        // })
        // const response = await fetch(imguri);
        // const blob = await response.blob();
        
        // const arrayBuffer = await blobToArrayBuffer(blob);
        // console.log(arrayBuffer);

        // if(blob){
        //   const flagData = await OnProfileImageUpdate(blob, filename);
        //   showMessage({
        //   message: `   ${flagData?.message}`,
        //   type: flagData?.error?"danger":"success",
        //   position:"center",
        //   icon: props => flagData?.error?<FontAwesome name="close" size={17} color="#fff" {...props}/>:<FontAwesome name="check" size={17} color="#fff" {...props}/>,
        //   })
        // }
    }catch(err:any){
      console.log(err?.message);
    }
  }
  return (
    <>
      <View style={styles.avatarholder}>
        <Image 
        source={profileImageUri}
        placeholder={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
        contentFit="cover"
        style={styles.avatar}/>
      </View>
      <Pressable style={styles.editimgbtn} onPress={()=>handleUploadImage()}>
        <FontAwesome name='pencil' size={20} color={'black'}/>
      </Pressable>
      <View style={{width:"100%", marginVertical:34}}>
      <TextInputField 
      placeholder='Name'
       FocusColor={ '#426EB2'}
       NotFocusColor={ '#c9c9c9'}
       LeftIconColor={ "#C9C9C9"}
       bgcolor='#ffffff'
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
       bgcolor='#ffffff'
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
       bgcolor='#ffffff'
       RightIconColor={ "#C9C9C9"} 
       textValue={phone}
       setTextValue={setPhone}
      LeftIconName='phone'
      RightIconName='check'
      />
      </View>
      
      <Pressable style={[divStyles.submitButton,{ marginTop: -15 }]} onPress={()=>handleSubmit()}>
                <Text style={[textStyles.buttonText,{paddingHorizontal: 30}]}>Submit</Text>
            </Pressable>
    </>
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
    marginTop: -75,
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  submit:{
    alignSelf: 'center',
    backgroundColor: 'blue',
  }
})