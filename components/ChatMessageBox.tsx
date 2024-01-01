import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';

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
            <Text style={styles.dateandtime}>Date: {item?.lead_status_date}</Text>
            <Text style={styles.dateandtime}>Time: {item?.lead_status_time}</Text>
        </View>
        {/* <View style={styles.flexContainer}>
            <Text style={styles.chatby}>by {item?.communication_by}</Text>
            <Text style={styles.updatedatetime}>XX/XX/XXXX | XX:XX ZY</Text>
        </View> */}
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

const styles = ScaledSheet.create({
    chatbubble:{
        borderRadius: '8@s',
        marginVertical: '6@s',
        marginHorizontal: '12@s',
        paddingVertical: '6@s', 
        paddingHorizontal: '12@s',
        backgroundColor: '#DDE6ED',
    },
    flexContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    chatheading:{
        color: '#FF008C',
        fontWeight: '800',
        textAlign: 'right',
        fontSize: '11@s',
    },
    dateandtime:{
        fontSize: '10@s',
        fontWeight: '600',
    },
    updatedatetime:{
        color: '#382ADD',
        fontSize: '11@s',
        fontWeight: '800',
        alignSelf: 'flex-end',
    },
    chattext:{
        fontSize: '15@s',
        color: 'black',
        width:'70%',
    },
    
    chatby:{
        fontSize: '14@s',
        fontWeight: '700',
        color: '#000',
    },
    title: {
        fontSize: '18@s',
        fontWeight: 'bold',
    },
})