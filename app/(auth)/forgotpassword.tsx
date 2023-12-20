import { Pressable, StyleSheet, Image } from 'react-native';
import React,{useState} from 'react';
import { Text, View } from '../../components/Themed';
import { router } from 'expo-router';
import {divStyles} from '../../styles/DivElement';
import {textStyles} from '../../styles/TextElement';
import TextInputField from '../../components/TextInputField';
import PasswordInputField from '../../components/PasswordInputField';

export default function ForgotPassswordScreen() {
  const [username, setUsername] = useState<string>('');
  const [isUsernameFocused, setIsUsernameFocused] = useState<boolean>(false);
  const [isUsernameWrong, setIsUsernameWrong] =  useState<boolean>(false);
  const [isValidUsername, setIsValidUserName] = useState<boolean>(false);
  
  return (
    <View style={styles.container}>
      <View style={divStyles.EntryPageContainer}>
      <View>
        <Image source={require('../../assets/images/icon.png')} style={divStyles.EntryPageLogo}/>
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
      <Text style={{marginTop: 10, color: 'red', textAlign: 'center', fontSize: 16}}>
        {isUsernameWrong && 'Incorrect username'}
      </Text>
      
      <View style={{width: '100%'}}>
      <Pressable style={divStyles.submitButton} onPress={() => router.push('/(auth)/')} >
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
