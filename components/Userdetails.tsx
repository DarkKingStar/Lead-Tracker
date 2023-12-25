import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import { useAuth} from '../context/AuthContext';
import { ImageBackground } from 'expo-image';
import toplayerbgimg from '../assets/images/toplayerbgimg.png' 

const UserDetails = () => {
   const {userData} = useAuth();
  return (
      <ImageBackground source={toplayerbgimg} imageStyle={styles.bgimage} style={styles.detailscontainer}>    
      <View style={styles.avatarholder}>
        <Image 
        source={userData?.imageURL}
        placeholder={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
        contentFit="cover"
        style={styles.avatar}/>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.UserName}>{userData?.fullname }</Text>
        <Text style={styles.Designation}>{userData?.degname||'Designation'}</Text>
      </View>
      </ImageBackground>
  )
}
const styles = StyleSheet.create({
  detailscontainer:{
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    padding: 18,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#C95293',
    shadowOpacity: 1,
    elevation: 5,
  },
  bgimage:{
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  userContainer:{
    marginLeft:10,
    marginTop:10,
  },
  avatarholder:{
    backgroundColor: '#fff',
    borderRadius: 50,
    width:60,
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:10,
    paddingVertical:4,
    boxShadowColor: '#00000054',
    boxShadowOffset: { width: 4, height: 4 }, 
    boxShadowRadius: 5,
    borderColor:'#fff',
    borderWidth: 5,
  },
  avatar:{
    width:50,
    height:50,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  UserName:{
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
    fontStyle: 'normal',
    textShadowColor: '#00000059',
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 5,
  },
  Designation:{
    textTransform: 'uppercase',
    fontWeight: '800',
    marginLeft: 2.5,
    fontStyle: 'normal',
    fontSize: 16,
    color: '#ffffaa',
  }
});

export default UserDetails;
