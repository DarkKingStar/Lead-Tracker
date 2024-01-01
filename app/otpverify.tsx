import { Pressable, TextInput, StyleSheet, Alert, BackHandler } from 'react-native';
import React,{useState,useRef, useEffect} from 'react';
import { Text, View } from '../components/Themed';
import { router } from 'expo-router';
import {divStyles} from '../styles/DivElement';
import {textStyles} from '../styles/TextElement';
import { useAuth } from '../context/AuthContext';
import icon from '../assets/images/icon.png';
import { Image } from 'expo-image';
import { ScaledSheet, scale } from 'react-native-size-matters';

export default function verifyotpScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [displayMessage,  setDisplayMessage] = useState<string>('');
  const refs = useRef<TextInput[]>([]);
  
  const {OnCheckOTP, OnResendOTP, userData} = useAuth();

  useEffect(() => {
    const backAction = () => {
      // You can perform any action you want here before the back button is pressed
      router.push('/login');
      return true; // This will prevent the back button press
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Don't forget to remove the event listener when the component unmounts
  }, []);

  const handleResendOTP = async() =>{
    const resendOtpflag =  await OnResendOTP();
    if (resendOtpflag) {
      Alert.alert(
        'Resend OTP',
        `OTP has been resent successfully to ${userData.contactno}`,
      );
    } else {
      Alert.alert(
        'Resend OTP',
        'Failed to resend OTP. Please try again.',
      );
    }
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
    const OtpData = await OnCheckOTP(otp[0],otp[1],otp[2],otp[3]);
    if(!OtpData?.error){
      setDisplayMessage('');
      router.push('/(tabs)')
    }else{
      setDisplayMessage(OtpData?.message);
      refs.current[0].focus();
    }
    setOtp(['', '', '', '']);
  };
  return (
    <View style={divStyles.EntryPageContainer}>
      <View>
        <Image source={icon} style={divStyles.EntryPageLogo} />
      </View>
      <Text style={textStyles.PageHeading}>Verify OTP</Text>
        <Text style={textStyles.PageSubHeading}>We have to sent the code verification to your mobile number {userData.contactno}</Text>        
        <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => (refs.current[index] = input!)}
            style={styles.otpInput}
            value={digit}

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
      {displayMessage!='' && <Text style={textStyles.errormessage}>{displayMessage}</Text>}
      <Pressable style={[divStyles.submitButton, {marginTop: scale(60)}]} onPress={()=>handleVerifyOtp()}>
        <Text style={textStyles.buttonText}>Verify</Text>
      </Pressable>
      <Pressable onPress={() => handleResendOTP()}>
        <Text style={styles.resendotp}>Resend OTP</Text>
      </Pressable>
    </View>
  );
}

const styles = ScaledSheet.create({
otpContainer: {
  flexDirection: 'row',
},
otpInput: {
  width: '45@s',
  height: '45@s',
  borderWidth: '1@s',
  color: '#000',
  borderColor: 'black',
  backgroundColor: '#E9E9E9',
  borderRadius: '10@s',
  textAlign: 'center',
  marginHorizontal: '10@s',
  fontSize: '22@s',
},
resendotp:{
  marginTop: '25@s',
  color: '#FF007F', 
  fontSize: '11@s',
  fontFamily: 'SeymourOne'
},
phonenumber:{
  marginVertical:'30@s',
  margin: '5@s',
  fontSize:'16@s',
},
});
