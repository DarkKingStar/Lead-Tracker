import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface ChatMessageBoxProps{
    conversation: any;
    loading: boolean;
}

const ChatMessageBox: React.FC<ChatMessageBoxProps> = ({conversation, loading}) => {
  return (
    <>
    {(!loading && conversation.length>0) ? conversation.reverse().map((item:any,index:number)=>(
        <View key={index} style={styles.chatbubble}>
        <View style={styles.flexContainer}>
            <Text style={styles.chattext}>{item?.remarks}</Text>
            <Text  ellipsizeMode='tail' style={styles.chatheading}>{item?.lead_status}</Text>
        </View>
        <View style={[styles.flexContainer,{marginTop:12}]}>
            <Text>Date: {item.lead_status_date}</Text>
            <Text>Time: {item?.lead_status_time}</Text>
        </View>
        <View style={styles.flexContainer}>
            <Text style={styles.chatby}>by {item?.communication_by}</Text>
            <Text style={styles.updatedatetime}>XX/XX/XXXX | XX:XX ZY</Text>
        </View>
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
    flexContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chatheading:{
        color: '#FF008C',
        fontWeight: '800',
        width: "30%",
        textAlign: 'right',
        
    },
    updatedatetime:{
        color: '#382ADD',
        fontSize: 11,
        fontWeight: '800',
        alignSelf: 'flex-end',
    },
    chattext:{
        fontSize: 18,
        color: 'black',
        width:'70%',
    },
    
    chatby:{
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})