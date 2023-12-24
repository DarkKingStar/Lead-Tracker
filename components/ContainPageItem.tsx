import { ActivityIndicator, Pressable, StyleSheet, Text, FlatList, View, Linking } from 'react-native'
import React, { PureComponent, useCallback, useMemo } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign  from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

interface ContainPageItemProps{
    leadlist: any;
    loading : boolean;
    setPagination:React.Dispatch<React.SetStateAction<number>>;
    hasPageNext: boolean;
}
interface ListItemProps {
    item: any;
    index: number;
  }

  const ListItem: React.FC<ListItemProps> = ({ item, index }) => {
    const memoizedItem = useMemo(() => {
      return (
        <View key={index} style={{ marginHorizontal: 20, marginVertical:8, padding: 10, backgroundColor: '#FFEEF7', borderRadius: 8, borderWidth:1, borderColor:'#FF008C' }}>
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{marginBottom: 14}}>
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
                            <Text style={styles.labeltext}>{index}</Text>
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
                <View style={{display: 'flex',flexDirection: 'row'}}>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=>Linking.openURL(`tel:${item?.contact_no}`)}>
                        <FontAwesome name='phone' size={16} color='black' />            
                    </Pressable>
                    </View>
                    <View>
                    <Pressable style={styles.iconholder}  onPress={()=>Linking.openURL(`mailto:${item?.email}`)}>
                        <FontAwesome name='envelope-o' size={16} color='black'/>                
                    </Pressable>
                    </View>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=>Linking.openURL(`https://wa.me/+91${item?.contact_no}`)}>
                        <FontAwesome name='whatsapp' size={16} color='black'/>
                    </Pressable>
                    </View>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=> router.push("/Chatpage")}>
                        <FontAwesome name='comments-o' size={16} color='black'/>
                    </Pressable>
                    </View>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=> router.push("/Setting")}>
                        <FontAwesome name='gear' size={16} color='black'/>
                    </Pressable>
                </View>
            </View>
        </View>
        );
    }, [item, index]);

    return memoizedItem;
    
}

const ContainPageItem: React.FC<ContainPageItemProps> = ({ leadlist, loading , setPagination, hasPageNext }) => {
    const renderItem = useCallback(
        ({ item, index }: { item: any; index: number }) => {
          return <ListItem item={item} index={index} />;
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={leadlist}
            renderItem={renderItem}
            ListEmptyComponent={noDataFound}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={1}
            decelerationRate={0.8}
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
                }else if(leadlist.length){
                    showMessage({
                        message: "End of List",
                        backgroundColor: "#00000066",
                        color: "#ffffff", 
                        position: 'center',
                      })
                }
            }}
            
          />
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
    container:{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',   
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
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
        borderColor:'#FF008C',
        borderRadius: 5,
        alignItems:  'center',
        justifyContent: 'center',
    },
    dashedHR: {
        borderBottomColor: '#FF008C',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        marginVertical: 8,
    },
    name:{
        color:'#FF008C',
        fontSize: 18,
        fontWeight: '700',
        marginTop:5,
    },
    designation:{
        fontSize: 14,
        fontWeight: '600',
        marginTop:8,
    }
});