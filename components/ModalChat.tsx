import { StyleSheet, Text,Pressable, View, ScrollView, Linking } from 'react-native';
import { ImageBackground } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React,{ useEffect, useState } from 'react';
import ChatMessageBox from './ChatMessageBox';
import { Image } from 'expo-image';
import axios from 'axios';
import { CHAT_MSG } from '../context/BaseConfig';
import { ScaledSheet, scale } from 'react-native-size-matters';
import bgimg from '../assets/images/chatbackbg.png';

interface ModalChatProps{
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSettingVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isSettingVisible: boolean;
    selectedClientId: string;
    ClientName: string;
    ClientPhoneNumber: string;
    ClientPhoneNumber2: string;
}

const ModalChat:React.FC<ModalChatProps> = ({setIsVisible, setIsSettingVisible, isSettingVisible, selectedClientId, ClientName,ClientPhoneNumber,ClientPhoneNumber2}) => {
    const [conversation,setConversation] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(()=>{
        const fetchConversation = async() =>{
            setLoading(true);
            const jsonData = await axios.get(`${CHAT_MSG}\\${selectedClientId}`);
            if(!jsonData?.data?.message){
                setConversation(jsonData?.data);
            }else{
                setConversation([]);
            }
            setLoading(false);
        }
        fetchConversation();
    },[selectedClientId, isSettingVisible])

    return (
        <View style={styles.container}>
            <View style={styles.topcontainer} >
            <Pressable onPress={()=>setIsVisible(false)} style={styles.closebtn}>
              <FontAwesome name="chevron-left" size={scale(18)} color="#fff" />
            </Pressable>
            <Text style={styles.username}>{ClientName}</Text>
            <Pressable style={styles.callbtn1} onPress={()=>Linking.openURL(`tel:${ClientPhoneNumber}`)}>
              <FontAwesome name="phone" size={scale(20)} color="#000" />
            </Pressable>
            <Pressable style={styles.callbtn2} onPress={()=>Linking.openURL(`tel:${ClientPhoneNumber2}`)}>
              <FontAwesome name="phone" size={scale(20)} color="#000" />
            </Pressable>
          </View>
          <ImageBackground source={bgimg} style={{flex:1}} >
          <ScrollView contentContainerStyle={styles.messageboxdiv}>
            <ChatMessageBox conversation={conversation} loading={loading}/>
          </ScrollView>
          <Pressable onPress={()=>setIsSettingVisible(true)}
            style={styles.floatingbtn}
            >
        <Text style={styles.btntext}>Conversation</Text>
        </Pressable>
          </ImageBackground>
      </View>
   
  )
}

export default ModalChat

const styles = ScaledSheet.create({
    container:{
      flex: 1, 
      backgroundColor:'#fff', 
    },
    topcontainer:{
      display:'flex',
      flexDirection:'row',
      backgroundColor: '#27374D',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: '10@s'
    },
    closebtn:{
      paddingHorizontal: '10@s',
      paddingVertical: '15@s',
    },
    avater:{
      width:'45@s',
      height:'45@s',
      borderRadius: '50@s',
    },
    avaterHolder:{
      borderRadius: '100@s',
      borderWidth:'4@s',
      borderColor: 'white',
      shadowOffset: {width:0,height: 4},
      shadowColor: '#00000040'
    },
    username:{
      fontSize:'18@s',
      fontFamily: 'RubikMedium',
      color: '#fff',
      width: '60%',
    },
    callbtn1:{
      width: '30@s',
      height: '30@s',
      marginRight: '6@s',
      paddingVertical: '5@s',
      borderRadius:'100@s',
      backgroundColor: '#6096B4',
      alignItems: 'center',
    },
    callbtn2:{
      width: '30@s',
      height: '30@s',
      marginRight: '6@s',
      paddingVertical: '5@s',
      borderRadius:'100@s',
      backgroundColor: '#7360DF',
      alignItems: 'center',
    },
    messageboxdiv:{
      paddingBottom:'45@s',
      backgroundColor:"#transparent"
    },
    floatingbtn:{
      borderWidth: '1@s',
      backgroundColor: '#000',
      borderColor: 'rgba(255,255,255,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: '10@s',
      left: '50%',
      transform:[{translateX: -50}],
      borderRadius: '50@s',
    },
    btntext:{
      color: 'white',
      paddingVertical:'6@s',
      paddingHorizontal:'14@s'
    }
  })