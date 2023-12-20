import { Pressable, StyleSheet, Image } from 'react-native';
import React,{useState} from 'react';
import { Text, View } from '../../components/Themed';
import { router } from 'expo-router';
import {divStyles} from '../../styles/DivElement';
import {textStyles} from '../../styles/TextElement';
import TextInputField from '../../components/TextInputField';
import PasswordInputField from '../../components/PasswordInputField';

export default function LoginScreen() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isUsernameWrong, setIsUsernameWrong] =  useState<boolean>(false);
  const [isPasswordWrong, setIsPasswordWrong] =  useState<boolean>(false);
  const [isValidUsername, setIsValidUserName] = useState<boolean>(false);
  return (
    <View style={divStyles.EntryPageContainer}>
      <View>
        <Image source={require('../../assets/images/icon.png')} style={divStyles.EntryPageLogo} />
      </View>
      <Text style={textStyles.PageHeading}>Hello Again!</Text>
      <Text style={textStyles.PageSubHeading}>Hi! Welcome Back! You've been missed.</Text>
      <TextInputField 
      FocusColor={isUsernameWrong ? '#ff0000': '#426EB2'}
      NotFocusColor={isUsernameWrong ? '#ff0000': '#c9c9c9'}
      LeftIconColor={username !== '' ? "#000000" : "#C9C9C9"}
      RightIconColor={isValidUsername ? "#008000" : "#C9C9C9"} 
      textValue={username}
      setTextValue={setUsername}/>
      <PasswordInputField 
      FocusColor={isPasswordWrong ? '#ff0000': '#426EB2'}
      NotFocusColor={isPasswordWrong ? '#ff0000': '#c9c9c9'}
      LeftIconColor={password !== '' ? "#000000" : "#C9C9C9"}
      RightIconColor={password !== '' ? "#000000" : "#C9C9C9"} 
      textValue={password}
      setTextValue={setPassword}/>
      <Pressable style={divStyles.submitButton} onPress={()=> router.push('/(auth)/otpverify')}>
        <Text style={textStyles.buttonText}>Login</Text>
      </Pressable>
      <Pressable onPress={()=> router.push('/(auth)/forgotpassword')}>
        <Text style={{marginTop: 25, color: '#FF007F', fontSize: 16}}>Forgot Password?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
