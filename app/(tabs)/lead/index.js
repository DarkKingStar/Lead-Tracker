import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import UserDetails from '../../../components/Userdetails';
import ContainPage from '../../../components/ContainPage';


export default function LeadScreen() {
  return (
    <View style={styles.container}>
      <UserDetails/>
      
        <ContainPage leadId={'1'} userId={'8'}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
