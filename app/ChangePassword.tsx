import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import PasswordInputField from '../components/PasswordInputField';
import { divStyles } from '../styles/DivElement';
import { textStyles } from '../styles/TextElement';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { showMessage } from 'react-native-flash-message';

const ChangePassword = () => {
  const [password, setPassword] = useState<string>('');
  const [isPasswordWrong, setIsPasswordWrong] =  useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [isNewPasswordWrong, setIsNewPasswordWrong] =  useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isConfirmPasswordWrong, setIsConfirmPasswordWrong] =  useState<boolean>(false);
  

  const {OnResetPassword} = useAuth()

  const handleSubmitPassword = async():Promise<void> =>{
    if(newPassword == password){
      setIsPasswordWrong(true);
      setIsNewPasswordWrong(true);
      setIsConfirmPasswordWrong(true);
    }
    else if(newPassword != confirmPassword){
      setIsNewPasswordWrong(true);
      setIsConfirmPasswordWrong(true);
      showMessage({
        message: "New Password and Confirm Password mismatched",
        type: "danger",
        color: "#ffffff", 
        position: 'bottom',
      })
    }
    else{
      setIsPasswordWrong(false);
      setIsNewPasswordWrong(false);
      setIsConfirmPasswordWrong(false);
    try{
      const flagData = await OnResetPassword(password, newPassword, confirmPassword);
      if(!flagData?.error){
        setIsPasswordWrong(true);
          Alert.alert(
              'Password Reset Successful!',
              'Please Remember Your New Password for Later Login.',
              [
                {
                  text: 'OK',
                  onPress: () => router.push('/(tabs)/profile'),
                },
              ],
              
            );
      }else{
        showMessage({
          message: "Invalid Current Password",
          type: "danger",
          color: "#ffffff", 
          position: 'bottom',
        })
        setIsPasswordWrong(true);
      }
    }catch(err: any){
      console.error(err.message)
    }
  }
}


  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25}}>
      <Text style={textStyles.PageHeading}>Reset Your Password?</Text>
      <Text style={textStyles.PageSubHeading}>Your New Password Must Be Different from Previously Used Password</Text>
      <PasswordInputField 
        FocusColor={isPasswordWrong ? '#ff0000': '#426EB2'}
        NotFocusColor={isPasswordWrong ? '#ff0000': '#c9c9c9'}
        LeftIconColor={password !== '' ? "#000000" : "#C9C9C9"}
        RightIconColor={password !== '' ? "#000000" : "#C9C9C9"} 
        textValue={password}
        placeholdertext={"Current Password"}
        setTextValue={setPassword}/>
      <PasswordInputField 
        FocusColor={isNewPasswordWrong ? '#ff0000': '#426EB2'}
        NotFocusColor={isNewPasswordWrong ? '#ff0000': '#c9c9c9'}
        LeftIconColor={newPassword !== '' ? "#000000" : "#C9C9C9"}
        RightIconColor={newPassword !== '' ? "#000000" : "#C9C9C9"} 
        textValue={newPassword}
        placeholdertext={"New Password"}
        setTextValue={setNewPassword}/>
      <PasswordInputField 
        FocusColor={isConfirmPasswordWrong ? '#ff0000': '#426EB2'}
        NotFocusColor={isConfirmPasswordWrong ? '#ff0000': '#c9c9c9'}
        LeftIconColor={confirmPassword !== '' ? "#000000" : "#C9C9C9"}
        RightIconColor={confirmPassword !== '' ? "#000000" : "#C9C9C9"} 
        textValue={confirmPassword}
        placeholdertext={"Confirm Password"}
        setTextValue={setConfirmPassword}/>
      <Pressable style={divStyles.submitButton} onPress={()=> handleSubmitPassword()}>
        <Text style={textStyles.buttonText}>Change Password</Text>
      </Pressable>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})