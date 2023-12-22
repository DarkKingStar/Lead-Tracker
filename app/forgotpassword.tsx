import { Pressable, StyleSheet, Image, Alert } from 'react-native';
import React,{useEffect, useState} from 'react';
import { Text, View } from '../components/Themed';
import { router } from 'expo-router';
import {divStyles} from '../styles/DivElement';
import {textStyles} from '../styles/TextElement';
import TextInputField from '../components/TextInputField';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassswordScreen() {
  const [username, setUsername] = useState<string>('');
  const [isUsernameWrong, setIsUsernameWrong] =  useState<boolean>(false);
  const [isValidUsername, setIsValidUserName] = useState<boolean>(false);
  const {OnSendPassword,OnValidateUsername} = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(()=>{
    const handleValidateUsername = async() =>{
      const flag = await OnValidateUsername(username);
      if(flag){
        setIsUsernameWrong(false);
        setIsValidUserName(true);
      }else{
        setIsValidUserName(false);
      }
    }
    handleValidateUsername();
  },[username]);
  const handleForgotPassword = async() =>{
    const flagData = await OnSendPassword(username);
    if(!flagData.error){
      setIsUsernameWrong(false);
      Alert.alert(
        'Password Send!',
        `Password has been resent successfully to Your Registed Phone Number`,
        [{ text: 'Go Back To Login', onPress: () => router.push('/login')}]
      );
    }else{
      setIsUsernameWrong(true);
      setErrorMessage(flagData?.message);
    }
  }
  return (
    <View style={styles.container}>
      <View style={divStyles.EntryPageContainer}>
      <View>
        <Image source={require('../assets/images/icon.png')} style={divStyles.EntryPageLogo}/>
      </View>
      <Text style={textStyles.PageHeading}>Reset Password</Text>
      <Text style={textStyles.PageSubHeading}>Your Password will be send to your registed Phone Number!</Text>
      <TextInputField 
      FocusColor={isUsernameWrong ? '#ff0000': '#426EB2'}
      NotFocusColor={isUsernameWrong ? '#ff0000': '#c9c9c9'}
      LeftIconColor={username !== '' ? "#000000" : "#C9C9C9"}
      RightIconColor={isValidUsername ? "#008000" : "#C9C9C9"} 
      textValue={username}
      setTextValue={setUsername}/>
      {errorMessage!='' && <Text style={{margin: 10, color: '#FF007F', fontSize: 16}}>{errorMessage}</Text>}
      <View style={{width: '100%'}}>
      <Pressable style={divStyles.submitButton} onPress={() => handleForgotPassword()} >
          <Text style={textStyles.buttonText}>Send Password</Text>
      </Pressable>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
