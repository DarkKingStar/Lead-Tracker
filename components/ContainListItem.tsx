import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";

interface ContainListItemProps {
    item: any;
    index: number;
    setIsChatVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSettingVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedClientId: React.Dispatch<React.SetStateAction<string>>;
    setClientName: React.Dispatch<React.SetStateAction<string>>;
    setClientPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    setClientPhoneNumber2: React.Dispatch<React.SetStateAction<string>>;
}

  const ContainListItem: React.FC<ContainListItemProps> = ({ item, index, setIsChatVisible, setIsSettingVisible, setSelectedClientId, setClientName,setClientPhoneNumber,setClientPhoneNumber2 }) => {
    const memoizedItem = useMemo(() => {
      return (
        <LinearGradient 
        colors={[
            '#B9D7EA', '#99DDCC',
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        key={index} 
        style={styles.itemcontainer}>
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={styles.itemheading}>
                        <Text style={[styles.name, styles.left]}>
                            {item?.name}
                        </Text>
                    </View>
                    <View style={styles.row}>
                    <View style={[styles.col, styles.left]}>
                        <Ionicons name="briefcase-outline" size={14} color='#EA5455'/>
                        <Text style={styles.labeltext}>{item?.mode_of_business}</Text>
                    </View>
                    <View style={[styles.col, styles.right]}>
                        <Text style={styles.labeltext}>{item?.lead_status}</Text>
                        <AntDesign name="pushpino" size={14} color='#EA5455'/>
                    </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.col, styles.left]}>
                        <Ionicons name="location-outline" size={14} color='#EA5455' />                    
                            <Text style={styles.labeltext}>{item?.lead_location}</Text>
                        </View>
                        <View style={[styles.col, styles.right]}>
                            <Text style={styles.labeltext}>{item?.client_details_id}</Text>
                            <MaterialIcons name="tag" size={14} color='#EA5455'/>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.col, styles.left]}>
                            <AntDesign name="calendar" size={14} color='#EA5455'/>
                            <Text style={styles.labeltext}>{item?.lead_status_date.trim()!='0000-00-00'?item?.lead_status_date:'No date set'}</Text>
                        </View>
                        <View style={[styles.col, styles.right]}>
                            <Text style={styles.labeltext}>{item?.lead_status_time?item?.lead_status_time:'No Time Set'}</Text>
                            <MaterialCommunityIcons name="clock-edit-outline" size={14} color='#EA5455'/>                    
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.dashedHR}></View>
                <View style={styles.btndiv}>
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=>Linking.openURL(`tel:${item?.contact_no}`)}>
                        <Ionicons name="ios-call-sharp" size={16} color='#0f79bd' />
                    </Pressable>
                    </View>
                    {item?.contact_no2 !='' &&
                    <View>
                    <Pressable style={styles.iconholder} onPress={()=>Linking.openURL(`tel:${item?.contact_no2}`)}>
                        <Ionicons name="ios-call-sharp" size={16} color='#00cc00' />   
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
                        setClientPhoneNumber(item?.contact_no2)
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
        </LinearGradient>
        );
    }, [item, index]);
    return memoizedItem;
}

export default ContainListItem 
const styles = ScaledSheet.create({
    itemcontainer:{
        marginHorizontal: '20@s', 
        marginVertical:'8@s', 
        paddingTop:0, 
        borderRadius: '9@s', 
        borderWidth:'2@s',
        borderColor:'#38419D' 
    },
    container:{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',   
    },
    row:{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal:'10@s',
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
        margin:'3@s',
        flex: 1,
    },
    labeltext:{
        fontSize:'12@s',
        marginHorizontal: '4@s',
        fontFamily:'RubikSemiBold',
        textAlign: 'left',
    },
    iconholder:{
        width:'28@s',
        height:'28@s',
        marginHorizontal:'5@s',
        backgroundColor: '#F3F8FF',
        borderWidth:1.5,
        borderColor:'#38419D',
        borderRadius: '8@s',
        alignItems:  'center',
        justifyContent: 'center',
    },
    dashedHR: {
        borderBottomColor: '#1E2022',
        borderBottomWidth: '0.8@s',
        borderStyle: 'dashed',
        marginVertical: '8@s',
    },
    name:{
        color: '#fff',
        fontSize: '15@s',
        fontFamily: 'RubikRegular',
        marginLeft:'6@s',
        padding:'8@s',
    },
    itemheading:{
        marginBottom: '4@s',
        backgroundColor: '#392467',
        borderTopLeftRadius: '7@s',
        borderTopRightRadius:'7@s'
    },
    btndiv:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingHorizontal:'10@s',
        marginBottom:'8@s'
    }
});