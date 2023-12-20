import { Image, Pressable, TextInput, StyleSheet } from 'react-native';
import React,{useEffect, useState,useRef} from 'react';
import { Text, View } from '../../components/Themed';
import { router } from 'expo-router';
import {divStyles} from '../../styles/DivElement';
import {textStyles} from '../../styles/TextElement';

export default function verifyotpScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [displayMessage,  setDisplayMessage] = useState(null);
  const refs = useRef<TextInput[]>([]);
  


  const handleResendOTP = async() =>{
    // const resendOtpflag =  await resendOTP();
    // if (resendOtpflag) {
    //   Alert.alert(
    //     'Resend OTP',
    //     `OTP has been resent successfully to ${userData?.contact_no}`,
    //   );
    // } else {
    //   Alert.alert(
    //     'Resend OTP',
    //     'Failed to resend OTP. Please try again.',
    //   );
    // }
  }
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    if (value !== '') {
     newOtp[index] = value;
      if (index < 3) {
        refs.current[index + 1].focus();
      }
    } else {
      if (index > 0) {
        refs.current[index - 1].focus();
      }
      newOtp[index] = '';
    }
    setOtp(newOtp);
  };
  const handleBackspace = (index: number) => {
    if (index > 0) {
      refs.current[index - 1].focus();
    }
  };
  
        
  const handleVerifyOtp = async() => {
    // const Otpflag = await checkOTP(otp[0],otp[1],otp[2],otp[3]);
    // setDisplayMessage(Otpflag);
    setOtp(['', '', '', '']);
  };
  return (
    <View style={divStyles.EntryPageContainer}>
      <View>
        <Image source={require('../../assets/images/icon.png')} style={divStyles.EntryPageLogo} />
      </View>
      <Text style={textStyles.PageHeading}>Verify OTP</Text>
        <Text style={textStyles.PageSubHeading}>We have to sent the code verification to your mobile number</Text>        
        <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => (refs.current[index] = input!)}
            style={styles.otpInput}
            value={digit}
            secureTextEntry

            autoComplete="sms-otp" // android
            textContentType="oneTimeCode" // ios

            onChangeText={(value) => handleOtpChange(index, value)}
            onKeyPress={(event) => {
              if (event.nativeEvent.key === 'Backspace' && otp[index]=='') {
                handleBackspace(index);
              }
            }}
            maxLength={1}
            keyboardType="numeric"
            autoFocus={index === 0}
          />
        ))}
      </View>
      <Pressable style={[divStyles.submitButton, {marginTop: 60}]} onPress={()=>router.push('/(tabs)')}>
        <Text style={textStyles.buttonText}>Verify</Text>
      </Pressable>
      <Pressable onPress={() => handleResendOTP()}>
        <Text style={{marginTop: 25, color: '#FF007F', fontSize: 16, textAlign: 'center'}}>Resend OTP</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
},
otpInput: {
  width: 50,
  height: 50,
  borderWidth: 1,
  borderColor: 'black',
  backgroundColor: '#E9E9E9',
  borderRadius: 10,
  textAlign: 'center',
  marginHorizontal: 10,
  fontSize: 22,
},
phonenumber:{
  marginVertical:30,
  margin: 5,
  fontSize:16,
},
});
