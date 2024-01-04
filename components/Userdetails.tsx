import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import { useAuth} from '../context/AuthContext';
import { ImageBackground } from 'expo-image';
import toplayerbgimg from '../assets/images/toplayerbgimg.png' 
import { ScaledSheet } from 'react-native-size-matters';

const UserDetails = () => {
   const {userData} = useAuth();
  return (
      <View style={styles.container}>    
      <View style={styles.avatarholder}>
        <Image 
        source={userData?.imageURL}
        placeholder={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
        contentFit="cover"
        style={styles.avatar}/>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.UserName}>HELLO {userData?.fullname?.toUpperCase() }</Text>
        <Text style={styles.UserId}>{userData?.username?.toUpperCase()} #{userData?.userId}</Text>
      </View>
      </View>
  )
}
const styles = ScaledSheet.create({
  container:{
    marginBottom: '20@s'
  },
  detailscontainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userContainer:{
    marginLeft:'10@s',
    display: 'flex',
    alignItems: 'center',
  },
  avatarholder:{
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#183399',
    paddingTop: '30@s',
    paddingHorizontal: '5@s',
    paddingBottom: '5@s',
    borderBottomLeftRadius: '100@s',
    borderBottomRightRadius: '100@s',
  },
  avatar:{
    width:'80@s',
    height:'80@s',
    borderRadius: '100@s',
    backgroundColor: '#fff',
    borderWidth: '3@s',
    borderColor: '#fff',
  },
  UserName:{
    fontSize: '18@s',
    fontFamily: 'RubikExtraBold',
    color: '#183399',
  },
  UserId:{
    fontSize: '12@s',
    fontFamily: 'RubikExtraBold',
    color: '#FF008C',
  },
  middlebox:{
    backgroundColor:'#d2d2d2',
    borderRadius: '100@s',
    position: 'absolute',
    borderWidth: '5@s',
    borderColor: '#e2e2e2',
    width: '190@s',
    height: '50@s',
  }
});

export default UserDetails;
