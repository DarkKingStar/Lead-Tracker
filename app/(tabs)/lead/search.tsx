import { StyleSheet, Text, View } from 'react-native';
import { ImageBackground } from 'expo-image';
import bgimg from '../../../assets/images/bgimg.png';
import ContainPageSearch from '../../../components/ContainPageSearch';
import { useAuth } from '../../../context/AuthContext';
import ContainPage from '../../../components/ContainPage';
import { ScaledSheet } from 'react-native-size-matters';
import { AntDesign } from '@expo/vector-icons';
import { divStyles } from '../../../styles/DivElement';

export default function SearchLeadScreen() {
  const {searchDataValue, userData} = useAuth(); 
  return (
    <View style={styles.container}>
      <ImageBackground  source={bgimg} style={{flex:1}}>
        {searchDataValue.length>0?<ContainPageSearch/>: <><View style={divStyles.errordiv}>
                <AntDesign name="frown" size={54} color="black" />
                <Text style={styles.title}>Oops! no record found</Text>
                <Text>Go to home screen!</Text>
            </View></>}
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
    fontWeight: '800',
  },
  separator: {
    marginVertical: '30@s',
    height: 1,
    width: '80%',
  }
});
