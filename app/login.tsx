import { Pressable } from 'react-native';
import React,{useEffect, useState} from 'react';
import { Text, View } from '../components/Themed';
import { router } from 'expo-router';
import {divStyles} from '../styles/DivElement';
import {textStyles} from '../styles/TextElement';
import TextInputField from '../components/TextInputField';
import PasswordInputField from '../components/PasswordInputField';
import { useAuth } from '../context/AuthContext';
import icon from '../assets/images/icon.png';
import { Image } from 'expo-image';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isUsernameWrong, setIsUsernameWrong] =  useState<boolean>(false);
  const [isPasswordWrong, setIsPasswordWrong] =  useState<boolean>(false);
  const [isValidUsername, setIsValidUserName] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {OnLogin,OnValidateUsername} = useAuth();

  useEffect(()=>{
    const handleValidateUsername = async() =>{
      const flag = await OnValidateUsername(username);
      if(flag){
        setIsValidUserName(true);
      }else{
        setIsValidUserName(false);
      }
    }
    handleValidateUsername();
  },[username]);
  
  const handleLogin = async() =>{
    const flag = await OnLogin(username, password);
    if(flag){
      setErrorMessage("");
      setIsUsernameWrong(false);
      setIsPasswordWrong(false);
    } 
    else{
      if(!isValidUsername){
        setErrorMessage("Invalid Username");
        setIsPasswordWrong(true);
        setIsUsernameWrong(true);
      }else{
        setErrorMessage("Invalid Password");
        setIsPasswordWrong(true);
        setIsUsernameWrong(false);
      }
    }
  }
  return (
    <View style={divStyles.EntryPageContainer}>
      <View>
        <Image source={icon} style={divStyles.EntryPageLogo} />
      </View>
      <Text style={textStyles.PageHeading}>Hello Again!</Text>
      <Text style={textStyles.PageSubHeading}>Hi! Welcome Back! You've been missed.</Text>
      <TextInputField 
      FocusColor={isUsernameWrong ? '#ff0000': '#426EB2'}
      NotFocusColor={isUsernameWrong ? '#ff0000': '#c9c9c9'}
      LeftIconColor={username !== '' ? "#000000" : "#C9C9C9"}
      RightIconColor={isValidUsername ? "#008000" : "#C9C9C9"}
      bgcolor='#ffffff' 
      textValue={username}
      LeftIconName='user'
      RightIconName='check-circle'
      placeholder='Username'
      setTextValue={setUsername}/>
      <PasswordInputField 
      FocusColor={isPasswordWrong ? '#ff0000': '#426EB2'}
      NotFocusColor={isPasswordWrong ? '#ff0000': '#c9c9c9'}
      LeftIconColor={password !== '' ? "#000000" : "#C9C9C9"}
      RightIconColor={password !== '' ? "#000000" : "#C9C9C9"} 
      textValue={password}
      placeholdertext={"Password"}
      setTextValue={setPassword}/>
      {errorMessage!='' && <Text style={{margin: 10, color: '#FF007F', fontSize: 16}}>{errorMessage}</Text>}
      <Pressable style={divStyles.submitButton} onPress={()=> handleLogin()}>
        <Text style={textStyles.buttonText}>Login</Text>
      </Pressable>
      <Pressable onPress={()=> router.replace('/forgotpassword')}>
        <Text style={{marginTop: 25, color: '#FF007F', fontSize: 16}}>Forgot Password?</Text>
      </Pressable>
    </View>
  );
}