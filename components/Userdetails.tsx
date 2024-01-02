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
      <View>
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
    alignItems: 'center',
    flexDirection: 'row',
    padding: '12@s',   
  },
  userContainer:{
    marginLeft:'10@s',
    display: 'flex',
    flexDirection: 'column',
  },
  avatar:{
    width:'48@s',
    height:'48@s',
    borderRadius: '100@s',
    backgroundColor: '#fff',
    borderWidth: '3@s',
    borderColor: '#fff',
  },
  UserName:{
    fontSize: '20@s',
    fontFamily: 'RubikBold',
    color: '#ffffff',
  },
  Designation:{
    textTransform: 'uppercase',
    fontFamily: 'RubikSemiBold',
    fontSize: '12@s',
    color: '#ffffaa',
  }
});

export default UserDetails;
