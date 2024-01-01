import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import { useAuth} from '../context/AuthContext';
import { ImageBackground } from 'expo-image';
import toplayerbgimg from '../assets/images/toplayerbgimg.png' 
import { ScaledSheet } from 'react-native-size-matters';

const UserDetails = () => {
   const {userData} = useAuth();
  return (
      <ImageBackground source={toplayerbgimg} style={styles.detailscontainer}>    
      <View style={styles.avatarholder}>
        <Image 
        source={userData?.imageURL}
        placeholder={"LEHLk~WB2yk8pyo0adR*.7kCMdnj"}
        contentFit="cover"
        style={styles.avatar}/>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.UserName}>{userData?.fullname?.toUpperCase() }</Text>
        <Text style={styles.Designation}>{userData?.degname?.toUpperCase()||'Designation'}</Text>
      </View>
      </ImageBackground>
  )
}
const styles = ScaledSheet.create({
  detailscontainer:{
    display: 'flex',
    flexDirection: 'row',
    padding: '12@s',
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#C95293',
    shadowOpacity: 1,
    elevation: 5,
  },
  userContainer:{
    marginLeft:'10@s',
    marginTop:'12@s',
  },
  avatarholder:{
    borderRadius: '100@s',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadowColor: '#00000054',
    boxShadowOffset: { width: 4, height: 4 }, 
    boxShadowRadius: '5@s',
    borderColor:'#fff',
    borderWidth: '5@s',
  },
  avatar:{
    width:'48@s',
    height:'48@s',
    borderRadius: '100@s',
    backgroundColor: '#fff',
  },
  UserName:{
    fontSize: '20@s',
    fontFamily: 'Arbutus',
    color: '#ffffff',
  },
  Designation:{
    textTransform: 'uppercase',
    fontFamily: 'VastShadow',
    marginLeft: '1.5@s',
    fontSize: '11@s',
    color: '#ffffaa',
  }
});

export default UserDetails;
