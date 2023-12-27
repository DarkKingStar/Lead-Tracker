import { StyleSheet, Text,Pressable, View, TextInput, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React,{ useEffect, useState } from 'react';
import ChatMessageBox from './ChatMessageBox';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import axios from 'axios';
import { CHAT_MSG } from '../context/BaseConfig';

interface ModalChatProps{
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSettingVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedClientId: string;
    ClientName: string;
}

const ModalChat:React.FC<ModalChatProps> = ({setIsVisible, setIsSettingVisible, selectedClientId, ClientName}) => {
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
    },[selectedClientId])

    return (
        <View style={styles.container}>
            <View style={styles.topcontainer} >
            <Pressable onPress={()=>setIsVisible(false)} style={styles.closebtn}>
              <FontAwesome name="chevron-left" size={18} color="#747574" />
            </Pressable>
            <View style={styles.avaterHolder}>
              <Image style={styles.avater} source={'https://www.w3schools.com/howto/img_avatar.png'}/>
            </View>
            <Text style={styles.username}>{ClientName}</Text>
            <Pressable style={styles.callbtn}>
              <FontAwesome name="phone" size={22} color="#000" />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{paddingBottom:45,flex:1, backgroundColor:"#fff"} }>
            <ChatMessageBox conversation={conversation} loading={loading}/>
          </ScrollView>
          
          <Pressable onPress={()=>setIsSettingVisible(true)}
            style={{
            borderWidth: 1,
            backgroundColor: '#000',
            borderColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform:[{translateX: -50}],
            borderRadius: 50,
            }}
        >
        <Text style={{color: 'white', paddingVertical:6, paddingHorizontal:14}}>Conversation</Text>
        </Pressable>
      </View>
   
  )
}

export default ModalChat

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor:'rgba(0,0,0,0.5)', 
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    topcontainer:{
      display:'flex',
      flexDirection:'row',
      backgroundColor: '#f0f0f0',
      padding: 6,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    closebtn:{
      paddingHorizontal: 12,
      paddingVertical: 20,
    },
    avater:{
      width:50,
      height:50,
      borderRadius: 50,
    },
    avaterHolder:{
      borderRadius: 50,
      borderWidth:4,
      borderColor: 'white',
      shadowOffset: {width:0,height: 4},
      shadowColor: '#00000040'
    },
    username:{
      fontSize:22,
      fontWeight: '600',
      width: '60%',
    },
    callbtn:{
      paddingHorizontal: 10,
      paddingTop: 8,
      marginRight: 6,
      paddingVertical: 5,
      borderRadius:50,
      backgroundColor: '#FF85C8',
      alignItems: 'center',
    }
  
  })