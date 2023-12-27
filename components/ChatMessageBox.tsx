import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

interface ChatMessageBoxProps{
    conversation: any;
    loading: boolean;
}

const ChatMessageBox: React.FC<ChatMessageBoxProps> = ({conversation, loading}) => {
  return (
    <>
    {(!loading && conversation.length>0) ? conversation.map((item:any,index:number)=>(
        <View key={index} style={styles.chatbubble}>
        <Text style={styles.chatby}>{item?.communication_by}</Text>
        <Text style={styles.chattext}>{item?.remarks}</Text>
        <Text style={styles.time}>{item.lead_status_date} | {item?.lead_status_time}</Text>
    </View>
    ))
    :<>
        <View>
        <View style={{display: 'flex',marginTop: '50%', justifyContent: 'center',alignSelf:'center', alignItems: 'center'}}>
                <Text style={styles.title}>No Conversation found</Text>
            </View>
        </View>
    </>}
   
    </>
  )
}

export default ChatMessageBox

const styles = StyleSheet.create({
    chatbubble:{
        borderRadius: 8,
        marginVertical: 6,
        marginHorizontal: 12,
        paddingVertical: 6, 
        paddingHorizontal: 12,
        backgroundColor: '#DDD',
    },
    time:{
        color: '#382ADD',
        fontSize: 11,
        fontWeight: '800',
        alignSelf: 'flex-end',
    },
    chattext:{
        fontSize: 18,
        color: 'black',
    },
    chatby:{
        fontSize: 14,
        fontWeight: '700',
        color: '#FF008C',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})