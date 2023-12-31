import { Text, View } from 'react-native'
import { useAuth} from '../context/AuthContext';

import { ScaledSheet } from 'react-native-size-matters';

interface UserDetailsLeadPageProps{
  leadStatus:string;
  leadCount:string;
}

const UserDetailsLeadPage: React.FC<UserDetailsLeadPageProps> = ({leadStatus, leadCount}) => {
   const {userData} = useAuth();
  return (
      <View style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={styles.UserName}>{leadStatus.toUpperCase() }</Text>
        <Text style={styles.UserId}>Lead Count: {leadCount.toUpperCase()}</Text>
      </View>
      </View>
  )
}
const styles = ScaledSheet.create({
  container:{
    marginVertical: '20@s'
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

export default UserDetailsLeadPage;
