import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

interface ContainPageItemProps{
    leadlist: any;
    loading : boolean
}

const ContainPageItem: React.FC<ContainPageItemProps> = ({leadlist, loading}) => {
    if(loading){
        return(<Text>Loading</Text>)
    }else{
    return (
        <>
        {leadlist?.["client-list"]?.map((item: any, index: number) => (
        <View  key={index} style={{margin:20, padding: 10, backgroundColor: '#FFEEF7', borderRadius: 8}}>
        <View style={styles.container}>
          <View style={{flex:1}}>
            <View style={{marginBottom: 14}}>
                <Text style={[styles.name, styles.left]}>
                    {item?.name}
                </Text>
            </View>
            <View style={styles.row}>
                <View style={[styles.col, styles.left]}>
                    <FontAwesome name='globe' size={14} color='blue'/>
                    <Text style={styles.labeltext}>{item?.mode_of_business}</Text>
                </View>
                <View style={[styles.col, styles.right]}>
                    <Text style={styles.labeltext}>{item?.lead_status}</Text>
                    <FontAwesome name='paperclip' size={14} color='blue'/>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.col, styles.left]}>
                    <FontAwesome name='comment' size={14} color='blue'/>                    
                    <Text style={styles.labeltext}>{item?.lead_location}</Text>
                </View>
                <View style={[styles.col, styles.right]}>
                    <Text style={styles.labeltext}>{item?.client_details_id}</Text>
                    <FontAwesome name='paperclip' size={14} color='blue'/>                    
                </View>
            </View>
            
            <View style={styles.row}>
                <View style={[styles.col, styles.left]}>
                    <FontAwesome name='calendar' size={14} color='blue'/>                    
                    <Text style={styles.labeltext}>{item?.lead_status_date}</Text>
                </View>
                <View style={[styles.col, styles.right]}>
                    <Text style={styles.labeltext}>{item?.lead_status_time}</Text>
                    <FontAwesome name='clock-o' size={14} color='blue'/>                    
                </View>
            </View>
    
          </View>
          
        </View>
        <View style={styles.dashedHR}></View>
            <View style={{display: 'flex',flexDirection: 'row'}}>
                <View>
                <Pressable style={styles.iconholder}>
                  <FontAwesome name='phone' size={16} color='black'/>            
                </Pressable>
                </View>
                <View>
                <Pressable style={styles.iconholder}>
                    <FontAwesome name='mobile-phone' size={16} color='black'/>                
                </Pressable>
                </View>
                <View>
                <Pressable style={styles.iconholder}>
                    <FontAwesome name='whatsapp' size={16} color='black'/>
                </Pressable>
                </View>
                <View>
                <Pressable style={styles.iconholder} onPress={()=> router.push("/Chatpage")}>
                    <FontAwesome name='comments-o' size={16} color='black'/>
                </Pressable>
                </View>
                <View>
                <Pressable style={styles.iconholder} onPress={()=> router.push("/Setting")}>
                    <FontAwesome name='gear' size={16} color='black'/>
                </Pressable>
                </View>
            </View>
        </View>
        ))}
        </>
        )
    }
}

export default ContainPageItem
const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',   
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    left:{
        textAlign: 'left',
        justifyContent: 'flex-start',
    },
    right:{
        textAlign:  'right',
        justifyContent: 'flex-end',
    },
    col:{
        display: 'flex',
        flexDirection: 'row',
        margin:3,
        flex: 1,
    },
    
    labeltext:{
        fontSize:14,
        marginHorizontal: 4,
        fontWeight: '400',
        textAlign: 'left',
    },
    iconholder:{
        width: 20,
        height: 20,
        backgroundColor: 'white',
        shadowOffset: {width:0, height:4},
        shadowColor: '#00000040',
        shadowOpacity: 1,
        margin:3,
        borderRadius: 5,
        alignItems:  'center',
        justifyContent: 'center',
    },
    dashedHR: {
        borderBottomColor: '#FF008C',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        marginVertical: 8,
    },
    name:{
        color:'#FF008C',
        fontSize: 18,
        fontWeight: '700',
        marginTop:5,
    },
    designation:{
        fontSize: 14,
        fontWeight: '600',
        marginTop:8,
    }
});