import { ActivityIndicator, Text, FlatList, View, Modal } from 'react-native'
import React, {  useCallback,  useEffect,  useState } from 'react'
import { AntDesign} from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import ModalChat from './ModalChat';
import ModalSetting from './ModalSetting';
import { divStyles } from '../styles/DivElement';
import { ScaledSheet, scale } from 'react-native-size-matters';
import ContainListItem from './ContainListItem';

interface ContainPageItemProps{
    leadlist: any;

    setPagination:React.Dispatch<React.SetStateAction<number>>;
    hasPageNext: boolean;
}
const ContainPageItem: React.FC<ContainPageItemProps> = ({ leadlist, setPagination, hasPageNext }) => {
    const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
    const [isSettingVisible,setIsSettingVisible] = useState<boolean>(false);
    const [listProcessingmsg,setListProcessingmsg] = useState<string>('')
    const [selectedClientId,setSelectedClientId] = useState<string>("");
    const [ClientName, setClientName] = useState<string>("");
    const [ClientPhoneNumber,setClientPhoneNumber] = useState<string>("");
    const [ClientPhoneNumber2,setClientPhoneNumber2] = useState<string>("");
    
    useEffect(()=>{
      if(!hasPageNext){
        setListProcessingmsg('- End of List -');
      }
    },[hasPageNext])
    const renderItem = useCallback(
        ({ item, index }: { item: any; index: number }) => {
          return <ContainListItem 
          item={item} 
          index={index} 
          setClientPhoneNumber={setClientPhoneNumber} 
          setClientPhoneNumber2={setClientPhoneNumber2} 
          setClientName={setClientName} 
          setSelectedClientId={setSelectedClientId} 
          setIsChatVisible={setIsChatVisible} 
          setIsSettingVisible={setIsSettingVisible}/>;
        },
        []
      );
    const noDataFound = ()=>{
        return(<>
            {leadlist?.length == 0 &&
            <View style={[divStyles.errordiv,{marginTop: '50%'}]}>
                <AntDesign name="frown" size={54} color="black" />
                <Text style={styles.title}>Oops! no record found</Text>
                <Text>Go to home screen!</Text>
            </View>
            }</>
        )
    }

    return (
      <>
          <FlatList
            data={leadlist}
            renderItem={renderItem}
            ListEmptyComponent={noDataFound}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={3}
            decelerationRate={0.85}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ marginBottom: scale(20), alignContent: 'center',justifyContent: 'center', alignItems: 'center' }}><Text style={{fontSize: scale(14), fontWeight: '700'}}>{listProcessingmsg}</Text></View>}
            onEndReached={()=>{
                if(hasPageNext){
                    setPagination(prev=>prev+1);
                    showMessage({
                        message: "Loading...",
                        backgroundColor: "#00000066",
                        color: "#ffffff", 
                        position: 'center',
                      })
                    setListProcessingmsg('- Loading -');
                }
                else{
                    setListProcessingmsg('');
                }
                
            }}
          />
          {isChatVisible && 
          <Modal 
          transparent={true} 
          animationType="fade" 
          visible={isChatVisible} 
          onRequestClose={()=>setIsChatVisible(false)}>
            <ModalChat ClientPhoneNumber={ClientPhoneNumber} ClientPhoneNumber2={ClientPhoneNumber2} setIsVisible={setIsChatVisible} selectedClientId={selectedClientId} ClientName={ClientName} isSettingVisible={isSettingVisible} setIsSettingVisible={setIsSettingVisible}/>
          </Modal>
          }

          {isSettingVisible &&
          <Modal 
          transparent={true} 
          animationType="fade" 
          visible={isSettingVisible} 
          onRequestClose={()=>setIsSettingVisible(false)}>
            <ModalSetting setIsVisible={setIsSettingVisible} selectedClientId={selectedClientId}/>
          </Modal>
          }
          </>
    )
  };
export default ContainPageItem
const styles = ScaledSheet.create({
    loadingdiv:{
        flex: 1,
        justifyContent: 'center',
        marginTop: '50%',
        alignItems: 'center',
        alignSelf: 'center' 
    },
    title: {
        fontSize: '20@s',
        fontWeight: 'bold',
    },
});