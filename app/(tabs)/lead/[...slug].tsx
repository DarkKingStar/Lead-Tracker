import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import UserDetails from '../../../components/Userdetails';
import ContainPage from '../../../components/ContainPage';
import { useLocalSearchParams } from 'expo-router';


export default function LeadScreen() {
  const { slug } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <UserDetails/>
      <ContainPage leadId={slug[0]} userId={slug[1]}/> 
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