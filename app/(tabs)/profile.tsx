import { Alert, Pressable, StyleSheet } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import { Text, View } from '../../components/Themed';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { divStyles } from '../../styles/DivElement';
import { textStyles } from '../../styles/TextElement';
import { router } from 'expo-router';
import ProfileInfo from '../../components/ProfileInfo';
import bgimg from '../../assets/images/bgimg.png';
import { ScrollView } from 'react-native-gesture-handler';
import toplayerbgimg from '../../assets/images/toplayerbgimg.png';
import { TabAnimation } from '../../components/TabAnimation';


export default function ProfileScreen() {
  const {OnLogout,userData} = useAuth();
  const handleLogout = () =>{
    Alert.alert(
        'Are you sure',
        'Do you really want to log out?',
        [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'Yes', onPress: async() => await OnLogout() },
        ],
        { cancelable: false }
      );
  }

  return (
    <TabAnimation>
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground  source={bgimg} style={{flex:1}}>
        <ImageBackground source={toplayerbgimg} style={styles.pinklayer}/>
      <View style={styles.avatarholder}>
        <Image 
        source={userData?.imageURL}
        placeholder={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
        contentFit="cover"
        style={styles.avatar}/>
      </View>

        <ProfileInfo/>
        <Pressable style={[divStyles.submitButton, styles.allBtn]} onPress={()=>router.push("/EditProfile")}>
          <Text style={textStyles.buttonText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={[divStyles.submitButton,styles.allBtn]} onPress={()=>router.push('/ChangePassword')}>
          <Text style={textStyles.buttonText}>Change Password</Text>
        </Pressable>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Pressable style={[divStyles.submitButton,styles.allBtn,{marginVertical:0, backgroundColor:"#A3B8C5"}]} onPress={()=>handleLogout()}>
          <Text style={[textStyles.buttonText,{color: '#ff0000'}]}>Logout</Text>
        </Pressable>
        </ImageBackground>
      </ScrollView>
      </TabAnimation>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  allBtn:{
    marginVertical:5, 
    padding: 8,
    borderRadius: 25,
    width: '80%',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
    alignSelf: 'center',
  },
  pinklayer:{
    height: 110,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#C95293',
    shadowOpacity: 1,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    padding: 18,
    justifyContent: 'center',
  },
  
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
 
});
