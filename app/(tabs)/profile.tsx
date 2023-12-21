import { Alert, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { Text, View } from '../../components/Themed';
import { useAuth } from '../../context/AuthContext';
import { divStyles } from '../../styles/DivElement';
import { textStyles } from '../../styles/TextElement';
import { router } from 'expo-router';

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
    <View style={styles.container}>
      <View style={styles.pinklayer}/>
      <View style={styles.avatarholder}>
        <Image 
        source={userData?.imageURL}
        placeholder={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
        contentFit="cover"
        style={styles.avatar}/>
      </View>
      <Pressable style={styles.editiconholder}>
        <Feather name="edit" size={20} color="black" /> 
      </Pressable>
      <View style={{paddingHorizontal: 12}}>
        <View style={styles.itemdiv}>
          <Text style={styles.title}>{"Name: "}</Text>
          <Text style={styles.uservalue}>{userData.fullname}</Text>
          <Text></Text>
        </View>
        <View style={styles.itemdiv}>
          <Text style={styles.title}>{"Designation: "}</Text>
          <Text style={styles.uservalue}>{userData.degname}</Text>
          <Text></Text>
        </View>
        <View style={styles.itemdiv}>
          <Text style={styles.title}>{"Email: "}</Text>
          <Text style={styles.uservalue}>{userData.email}</Text>
          <Text></Text>

        </View>
        <View style={styles.itemdiv}>
          <Text style={styles.title}>{"Phone: "}</Text>
          <Text style={styles.uservalue}>{userData.contactno}</Text>
          <Text></Text>

        </View>

        <Pressable style={[divStyles.submitButton,{marginVertical:5, padding: 8,}]} onPress={()=>{}}>
          <Text style={textStyles.buttonText}>Edit Profile</Text>
        </Pressable>
        <Pressable style={[divStyles.submitButton,{marginVertical:5, padding: 8,}]} onPress={()=>router.push('/ChangePassword')}>
          <Text style={textStyles.buttonText}>Change Password</Text>
        </Pressable>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Pressable style={[divStyles.submitButton,{marginVertical:0, padding: 8, backgroundColor:"#A3B8C5"}]} onPress={()=>handleLogout()}>
          <Text style={[textStyles.buttonText,{color: '#ff0000'}]}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemdiv:{
    flexDirection:'row',
    borderBottomWidth:2,
    alignItems: 'center',
    borderColor: '#0044FF',
    padding: 12,
    borderRadius: 5,
    margin: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '40%',
  },
  uservalue:{
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center',
  },
  pinklayer:{
    backgroundColor:'#FF7EC5',
    height: 90,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
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
    marginTop: -45,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadowColor: '#00000054',
    boxShadowOffset: { width: 4, height: 4 }, 
    boxShadowRadius: 5,
    borderColor:'#000',
    borderWidth: 2,
  },
  avatar:{
    width:100,
    height:100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor:'#000',
    borderWidth: 2,
  },
  editiconholder:{
    padding: 10,    
    alignSelf: 'center',
    marginTop: -40,
  },
});
