import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import { useAuth } from '../context/AuthContext'
import { router, useFocusEffect } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { ScrollView } from 'react-native-gesture-handler'
import { fetchMenuData } from '../context/fetchData'
import { ScaledSheet } from 'react-native-size-matters'
import {LinearGradient} from 'expo-linear-gradient';

const convertArray = (data: any) => {
    const newArray = Array.from({ length: Math.ceil(data?.length/2)}, (_,index)=>
    data?.slice(index*2, index * 2 + 2)
    );
    return newArray;
}


const Menu = () => {
    const [dashboard, setDashboard] = useState<any>(null);

    const {userData, authState} = useAuth();

    
    const gotoPage = ( leadid: string, userid: string | null) =>{
        router.push(`/(tabs)/lead/${leadid}/${userid}`)
    }
    const {isPending,isLoading, isError, data, refetch} = useQuery({ 
        queryKey: ['dashboard'],
        queryFn: ()=>fetchMenuData(userData.userId,authState.token),
        enabled: false, // Disable initial fetch
    })

    useEffect(() => {
        refetch();
    }, [refetch,authState.token,userData.userId]);
    useFocusEffect(()=>{
        refetch();
    })
    useEffect(()=>{
        setDashboard(convertArray(data));
    },[data])

    if(isPending || isLoading){
        return(<ActivityIndicator size="large" color="#183399" />)    
    }
    else if(isError){
        return(<View><Text>No data found</Text></View>)
    }
    else{
    return (
    <>
        {dashboard?.map((chunk: any, index: number) => (
            <View key={index} style={styles.row}>
                {chunk?.length==2 && chunk?.map((item: any, itemIndex: number) => (
                    <LinearGradient 
                    colors={[
                        '#B9D7EA', '#99DDCC',
                      ]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                    key={itemIndex} 
                    style={styles.item}>
                        <Pressable onPress={()=>gotoPage(item.lead_status_id, userData.userId)}>{/* {userData.userId} */}
                            <MenuItem heading={item.lead_status} totallead={item.total_lead} taskdone={item.lead_count_status_wise} img={item.image_url}/>
                        </Pressable>
                    </LinearGradient>
                ))}
            </View>
        ))}
      </>
    )}
}

const styles = ScaledSheet.create({
    container: {
      padding: '8@s',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '8@s',
      alignSelf: 'center',
      gap:'8@s',
    },
    item: {
      flex: 0.5,
      borderRadius: '10@s',
      borderWidth: '3@s',
      borderColor: '#fff',
      padding: '8@s',
    },
  });

export default Menu