import {Animated, View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { DASHBOARD } from '../context/BaseConfig'
import { router } from 'expo-router'




const Menu = () => {
    const [menuData,setmenuData] = useState<any>(null);
    const {userData, authState} = useAuth();
    useEffect(()=>{
        const fetchMenuData = async()=>{
            if(userData.userId && authState.token){
                try{
                    const response = await axios.get(`${DASHBOARD}/8/c9f0f895fb98ab9159f51fd0297e236d`); //${userData.userId}/${authState.token}
                    // console.log(JSON.stringify(response?.data?.dashboard,null,2));
                    const newArray = Array.from({ length: Math.ceil(response?.data?.dashboard?.length/2)}, (_,index)=>
                        response?.data?.dashboard?.slice(index*2, index * 2 + 2)
                    );
                    // console.log(JSON.stringify(newArray,null,2));
                    setmenuData(newArray);
                }catch(err){
                    console.log(err);
                }
            }
        }
        fetchMenuData();
    },[])
    const gotoPage = ( leadid: string, userid: string) =>{
        router.push({pathname:'/(tabs)/lead', params:{leadId:leadid, userId: userid}})
    }
    return (
    <View style={styles.container}>
        {menuData?.map((chunk: Array<Array<{}>>, index: number) => (
            <View key={index} style={styles.row}>
                {chunk?.map((item: {}, itemIndex: number) => (
                    <View key={itemIndex} style={styles.item}>
                        <Pressable onPress={()=>gotoPage(item.lead_status_id, '8' )}>{/* {userData.userId} */}
                            <MenuItem heading={item.lead_status} totaltask={item.total_lead} taskdone={item.lead_count_status_wise} img={item.image_url}/>
                        </Pressable>
                    </View>
                ))}
            </View>
        ))}
       
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    item: {
      flex: 1,
      backgroundColor: '#fcc',
      marginHorizontal: 5,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: '#fff',
      shadowOffset: {width: 0, height: 4},
      shadowColor: '#0000002B',
      shadowOpacity: 0.8,
      padding: 16,
    },
  });

export default Menu