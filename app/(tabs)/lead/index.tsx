import { StyleSheet,View  } from 'react-native';
import ContainPage from '../../../components/ContainPage';
import { ImageBackground } from 'expo-image';
import bgimg from '../../../assets/images/bgimg.png';
import { useAuth } from '../../../context/AuthContext';
import { TabAnimation } from '../../../components/TabAnimation';
import { ScaledSheet } from 'react-native-size-matters';

export default function LeadScreen() {
  const {userData} = useAuth();
  return (
    <View style={styles.container}>
      <ImageBackground  source={bgimg} style={{flex:1}}>
        <TabAnimation>
          {userData.userId!=null && <ContainPage leadId={'1'} userId={userData.userId}/>}
        </TabAnimation>
      </ImageBackground>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: '20@s',
    fontFamily: 'RubikBold',
  },
  separator: {
    marginVertical: '30@s',
    height: 1,
    width: '80%',
  },
});
