import { Pressable, StyleSheet, Alert, BackHandler } from 'react-native';
import React,{useEffect, useState} from 'react';
import { Text, View } from '../components/Themed';
import { router } from 'expo-router';
import {divStyles} from '../styles/DivElement';
import {textStyles} from '../styles/TextElement';
import TextInputField from '../components/TextInputField';
import { useAuth } from '../context/AuthContext';
import icon from '../assets/images/icon.png';
import { Image } from 'expo-image';
import { ScaledSheet } from 'react-native-size-matters';

export default function ForgotPassswordScreen() {
  const [username, setUsername] = useState<string>('');
  const [isUsernameWrong, setIsUsernameWrong] =  useState<boolean>(false);
  const [isValidUsername, setIsValidUserName] = useState<boolean>(false);
  const {OnSendPassword,OnValidateUsername} = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const backAction = () => {
      // You can perform any action you want here before the back button is pressed
      router.push('/login');
      return true; // This will prevent the back button press
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Don't forget to remove the event listener when the component unmounts
  }, []);

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
        <Image source={icon} style={divStyles.EntryPageLogo}/>
      </View>
      <Text style={textStyles.PageHeading}>Reset Password</Text>
      <Text style={textStyles.PageSubHeading}>Your Password will be send to your registed Phone Number!</Text>
      <TextInputField 
      FocusColor={isUsernameWrong ? '#ff0000': '#426EB2'}
      NotFocusColor={isUsernameWrong ? '#ff0000': '#c9c9c9'}
      LeftIconColor={username !== '' ? "#000000" : "#C9C9C9"}
      RightIconColor={isValidUsername ? "#008000" : "#C9C9C9"} 
      textValue={username}
      bgcolor='#ffffff'
      placeholder='Username'
      LeftIconName='user'
      RightIconName='check-circle'
      setTextValue={setUsername}
      keyboardType='default'
      />
      {errorMessage!='' && <Text style={textStyles.errormessage}>{errorMessage}</Text>}
      <View style={{width: '100%'}}>
      <Pressable style={divStyles.submitButton} onPress={() => handleForgotPassword()} >
          <Text style={textStyles.buttonText}>Send Password</Text>
      </Pressable>
      </View>
    </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
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
