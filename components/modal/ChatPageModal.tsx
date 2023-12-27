import { StyleSheet,ScrollView, Text,Pressable, View, Modal, NativeSyntheticEvent, ModalProps} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import ChatBox from '../ChatBox';
import ChatMessageBox from '../ChatMessageBox';
import { Image } from 'expo-image';



const ChatPageModal= () => {
    return (
      <Modal transparent={true} animationType="fade" visible={true}>
        <View style={styles.container}>
            <View style={styles.topcontainer}>
            <Pressable onPress={()=>handleClose()} style={styles.closebtn}>
              <FontAwesome name="chevron-left" size={18} color="#747574" />
            </Pressable>
            <View style={styles.avaterHolder}>
              {/* <Image style={styles.avater} source={''}/> */}
            </View>
            <Text style={styles.username}>Gautam Mukharjee</Text>
            <Pressable style={styles.callbtn}>
              <FontAwesome name="phone" size={22} color="#000" />
            </Pressable>
          </View>
          <View style={{height: '75%'}}>
          <ScrollView>
            <ChatMessageBox/>
          </ScrollView>
          </View>
          
          <ChatBox/>
      </View>
      </Modal>
  )
}

export default ChatPageModal

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: 'white', 
        marginTop:190, 
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
      paddingVertical: 5,
      borderRadius:5,
      backgroundColor: '#FF85C8',
      alignItems: 'center',
    }
  
  })