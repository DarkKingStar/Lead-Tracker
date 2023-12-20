import { Image, StyleSheet, Text, View } from 'react-native'
import { useAuth} from '../context/AuthContext';


const UserDetails = () => {
   const {userData} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.avatarholder}>
        <Image source={{uri : `${userData?.imageURL}` }} style={styles.avatar}/>
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.UserName}>{userData?.fullname || 'User FULL Name'}</Text>
        <Text style={styles.Designation}>{userData?.degname||'Designation'}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#FF7EC5',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: '#C95293',
    shadowOpacity: 1,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    padding: 18,
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
    color: '#000000',
  }
});

export default UserDetails;
