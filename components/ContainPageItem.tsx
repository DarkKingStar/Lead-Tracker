import { ActivityIndicator, Pressable, StyleSheet, Text, FlatList, View, Linking, Modal } from 'react-native'
import React, {  useCallback, useEffect, useMemo, useState } from 'react'
import {FontAwesome, Ionicons, MaterialCommunityIcons,MaterialIcons, AntDesign, Entypo} from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import ModalChat from './ModalChat';
import ModalSetting from './ModalSetting';

interface ContainPageItemProps{
    leadlist: any;
    loading : boolean;
    setPagination:React.Dispatch<React.SetStateAction<number>>;
    hasPageNext: boolean;
}
interface ListItemProps {
    item: any;
    index: number;
    setIsChatVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSettingVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedClientId: React.Dispatch<React.SetStateAction<string>>;
    setClientName: React.Dispatch<React.SetStateAction<string>>;
    setClientPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

  const ListItem: React.FC<ListItemProps> = ({ item, index, setIsChatVisible, setIsSettingVisible, setSelectedClientId, setClientName,setClientPhoneNumber }) => {
    const memoizedItem = useMemo(() => {
      return (
        <View key={index} style={styles.itemcontainer}>
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{marginBottom: 10, backgroundColor: '#435585',  borderTopLeftRadius: 7, borderTopRightRadius:7}}>
                        <Text style={[styles.name, styles.left]}>
                            {item?.name}
                        </Text>
                    </View>
                    <View style={styles.row}>
                    <View style={[styles.col, styles.left]}>
                        <FontAwesome name='globe' size={14} color='blue'/>
                        <Text style={styles.labeltext}>{item?.mode_of_business}</Text>
                    </View>
                    <View style={[styles.col, styles.right]}>
                        <Text style={styles.labeltext}>{item?.lead_status}</Text>
                        <FontAwesome name='paperclip' size={14} color='blue'/>
                    </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.col, styles.left]}>
                            <FontAwesome name='comment' size={14} color='blue'/>                    
                            <Text style={styles.labeltext}>{item?.lead_location}</Text>
                        </View>
                        <View style={[styles.col, styles.right]}>
                            <Text style={styles.labeltext}>{item?.client_details_id}</Text>
                            <FontAwesome name='paperclip' size={14} color='blue'/>                    
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.col, styles.left]}>
                            <FontAwesome name='calendar' size={14} color='blue'/>                    
                            <Text style={styles.labeltext}>{item?.lead_status_date.trim()!='0000-00-00'?item?.lead_status_date:'No date set'}</Text>
                        </View>
                        <View style={[styles.col, styles.right]}>
                            <Text style={styles.labeltext}>{item?.lead_status_time?item?.lead_status_time:'No Time Set'}</Text>
                            <FontAwesome name='clock-o' size={14} color='blue'/>                    
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.dashedHR}></View>
                <View style={{display: 'flex',flexDirection: 'row', paddingHorizontal:10,marginBottom:10}}>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=>Linking.openURL(`tel:${item?.contact_no}`)}>
                        <FontAwesome name='phone' size={16} color='#0f79bd' />            
                    </Pressable>
                    </View>
                    {item?.contact_no2 !='' &&
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=>Linking.openURL(`tel:${item?.contact_no2}`)}>
                        <Entypo name='old-mobile' size={16} color='#000000' />            
                    </Pressable>
                    </View>}
                    <View>
                    <Pressable style={styles.iconholder}  onPress={()=>Linking.openURL(`mailto:${item?.email}`)}>
                        <MaterialCommunityIcons name='gmail' size={16} color='#d92724'/>                
                    </Pressable>
                    </View>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=>Linking.openURL(`https://wa.me/+91${item?.contact_no}`)}>
                        <FontAwesome name='whatsapp' size={16} color='#075E54'/>
                    </Pressable>
                    </View>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=> {
                        setSelectedClientId(item?.client_details_id);
                        setClientName(item?.name)
                        setClientPhoneNumber(item?.contact_no)
                        setIsChatVisible(true)}}>
                        <Ionicons name='chatbox-ellipses-sharp' size={16} color='#A020F0'/>
                    </Pressable>
                    </View>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=> {
                        setIsSettingVisible(true);
                        setSelectedClientId(item?.client_details_id);
                        }}>
                        <FontAwesome name='gear' size={16} color='#fabd03'/>
                    </Pressable>
                </View>
            </View>
        </View>
        );
    }, [item, index]);

    return memoizedItem;
    
}

const ContainPageItem: React.FC<ContainPageItemProps> = ({ leadlist, loading , setPagination, hasPageNext }) => {
    const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
    const [isSettingVisible,setIsSettingVisible] = useState<boolean>(false);

    const [selectedClientId,setSelectedClientId] = useState<string>("");
    const [ClientName, setClientName] = useState<string>("");
    const [ClientPhoneNumber,setClientPhoneNumber] = useState<string>("");
    
    const renderItem = useCallback(
        ({ item, index }: { item: any; index: number }) => {
          return <ListItem item={item} index={index} setClientPhoneNumber={setClientPhoneNumber} setClientName={setClientName} setSelectedClientId={setSelectedClientId} setIsChatVisible={setIsChatVisible} setIsSettingVisible={setIsSettingVisible}/>;
        },
        []
      );
    const noDataFound = ()=>{
        return(<>
            {leadlist.length == 0 &&
            <View style={{display: 'flex',marginTop: '50%', justifyContent: 'center',alignSelf:'center', alignItems: 'center'}}>
                <AntDesign name="frown" size={54} color="black" />
                <Text style={styles.title}>Oops! no record found</Text>
                <Text>Go to home screen!</Text>
            </View>
            }</>
        )
    }

    return (
      <>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center',marginTop: '50%', alignItems: 'center', alignSelf: 'center' }}>
            <ActivityIndicator size="large" color="#183399" />
          </View>
        ) : (<>
          <FlatList
            data={leadlist}
            renderItem={renderItem}
            ListEmptyComponent={noDataFound}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={3}
            decelerationRate={0.9}
            showsVerticalScrollIndicator={false}
            onEndReached={()=>{
                if(hasPageNext){
                    setPagination(prev=>prev+1);
                    showMessage({
                        message: "Loading...",
                        backgroundColor: "#00000066",
                        color: "#ffffff", 
                        position: 'center',
                      })
                }else if(leadlist.length>0){
                    showMessage({
                        message: "End of List",
                        backgroundColor: "#00000066",
                        color: "#ffffff", 
                        position: 'center',
                      })
                }
            }}
          />
          {isChatVisible && 
          <Modal 
          transparent={true} 
          animationType="fade" 
          visible={isChatVisible} 
          onRequestClose={()=>setIsChatVisible(false)}>
            <ModalChat ClientPhoneNumber={ClientPhoneNumber} setIsVisible={setIsChatVisible} selectedClientId={selectedClientId} ClientName={ClientName} isSettingVisible={isSettingVisible} setIsSettingVisible={setIsSettingVisible}/>
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
        )}
      </>
    );
  };
export default ContainPageItem
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemcontainer:{
        marginHorizontal: 20, 
        marginVertical:8, 
        paddingTop:0, 
        backgroundColor: '#FFEEF7', 
        borderRadius: 8, 
        borderWidth:1,
        borderColor:'#435585' 
    },
    container:{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',   
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal:10,
        justifyContent: 'space-around',
    },
    left:{
        textAlign: 'left',
        justifyContent: 'flex-start',
    },
    right:{
        textAlign:  'right',
        justifyContent: 'flex-end',
    },
    col:{
        display: 'flex',
        flexDirection: 'row',
        margin:3,
        flex: 1,
    },
    labeltext:{
        fontSize:14,
        marginHorizontal: 4,
        fontWeight: '400',
        textAlign: 'left',
    },
    iconholder:{
        width:30,
        height:30,
        marginHorizontal:5,
        backgroundColor: 'white',
        shadowOffset: {width:0, height:4},
        shadowColor: '#00000040',
        shadowOpacity: 1,
        margin:3,
        borderWidth:1,
        borderColor:'#435585',
        borderRadius: 5,
        alignItems:  'center',
        justifyContent: 'center',
    },
    dashedHR: {
        borderBottomColor: '#435585',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        marginVertical: 8,
    },
    name:{
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginLeft:6,
        padding:8,
    },
    designation:{
        fontSize: 14,
        fontWeight: '600',
        marginTop:8,
    }
});