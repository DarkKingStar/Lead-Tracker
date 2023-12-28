import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import { useAuth } from '../context/AuthContext'
import { router, useFocusEffect } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { ScrollView } from 'react-native-gesture-handler'
import { fetchMenuData } from '../context/fetchData'

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
    const {isPending, isError, data, refetch} = useQuery({ 
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

    if(isPending){
        return(<ActivityIndicator size="large" color="#183399" />)    
    }
    else if(isError){
        return(<View><Text>No data found</Text></View>)
    }
    else{
    return (
    <ScrollView contentContainerStyle={styles.container}>
        {dashboard?.map((chunk: any, index: number) => (
            <View key={index} style={styles.row}>
                {chunk?.map((item: any, itemIndex: number) => (
                    <View key={itemIndex} style={styles.item}>
                        <Pressable onPress={()=>gotoPage(item.lead_status_id, userData.userId)}>{/* {userData.userId} */}
                            <MenuItem heading={item.lead_status} totallead={item.total_lead} taskdone={item.lead_count_status_wise} img={item.image_url}/>
                        </Pressable>
                    </View>
                ))}
            </View>
        ))}
        </ScrollView>
    )}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
      alignSelf: 'center',
      gap:8,
    },
    item: {
      flex: 0.5,
      backgroundColor: '#fcc',
      borderRadius: 10,
      borderWidth: 3,
      borderColor: '#fff',
      shadowOffset: {width: 0, height: 4},
      shadowColor: '#0000002B',
      shadowOpacity: 0.8,
      padding: 14,
    },
  });

export default Menu