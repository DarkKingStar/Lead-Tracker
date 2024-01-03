import { Pressable, BackHandler } from 'react-native';
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
import { StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isUsernameWrong, setIsUsernameWrong] =  useState<boolean>(false);
  const [isPasswordWrong, setIsPasswordWrong] =  useState<boolean>(false);
  const [isValidUsername, setIsValidUserName] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {OnLogin,OnValidateUsername, authState} = useAuth();

  useEffect(() => {
    const backAction = () => {
      // You can perform any action you want here before the back button is pressed
      return true; // This will prevent the back button press
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Don't forget to remove the event listener when the component unmounts
  }, []);

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
      router.push('/otpverify');
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
      setTextValue={setUsername}
      keyboardType='default'
      />
      <PasswordInputField 
      FocusColor={isPasswordWrong ? '#ff0000': '#426EB2'}
      NotFocusColor={isPasswordWrong ? '#ff0000': '#c9c9c9'}
      LeftIconColor={password !== '' ? "#000000" : "#C9C9C9"}
      RightIconColor={password !== '' ? "#000000" : "#C9C9C9"} 
      textValue={password}
      placeholdertext={"Password"}
      setTextValue={setPassword}/>
      {errorMessage!='' && <Text style={textStyles.errormessage}>{errorMessage}</Text>}
      <Pressable style={divStyles.submitButton} onPress={()=> handleLogin()}>
        <Text style={textStyles.buttonText}>Login</Text>
      </Pressable>
      <Pressable onPress={()=> router.replace('/forgotpassword')}>
        <Text style={styles.forgotpass}>Forgot Password?</Text>
      </Pressable>
    </View>
  );
}

const styles = ScaledSheet.create({
  forgotpass:{
    marginTop: '25@s', 
    color: '#FF007F', 
    fontSize: '11@s',
    fontFamily: 'RubikExtraBold'
  }
})