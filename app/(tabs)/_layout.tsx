import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Link, Tabs } from 'expo-router';
import { useColorScheme, Animated } from 'react-native';
import Colors from '../../constants/Colors';
import icon from '../../assets/images/icon.png';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import { useEffect, useRef } from 'react';



/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const fadeIn = (value:any, duration:any) => {
  return Animated.timing(value, {
    toValue: 1,
    duration: duration,
    useNativeDriver: true,
  });
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const fadeInValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn(fadeInValue, 500).start();
  }, []);
  return (
    <Animated.View style={{ flex: 1, opacity: fadeInValue }}>
    <Tabs  screenOptions={{
      tabBarInactiveTintColor: Colors[colorScheme ?? 'dark'].tint, 
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].background,
      tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].navbarColor,
      tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].navbarColor,
      headerStyle: {backgroundColor: '#ffffff'},
      }}>
      <Tabs.Screen name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} title='HOME'/>,
          headerRight: () => (<HeaderRight/>),
          headerLeft: () => (<HeaderLeft/>),
        }}
      />
      <Tabs.Screen
        name="lead"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="magnet" color={color} title='LEAD' />,
          headerRight: () => (<HeaderRight/>),
          headerLeft: () => (<HeaderLeft/>),
        }}
      />
      <Tabs.Screen
        name="addnewlead"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarMiddleIcon name="plus" color={color} title='ADD'/>,
          headerRight: () => (<HeaderRight/>),
          headerLeft: () => (<HeaderLeft/>),
        }}
      />
      <Tabs.Screen
        name="bufferpage"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} title='SEARCH' />,
          headerRight: () => (<HeaderRight/>),
          headerLeft: () => (<HeaderLeft/>),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
            router.push("/(tabs)/lead/search");
            router.push("/Search") /// your screen without Tab bar
          },
        })}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} title='PROFILE' />,
          headerRight: () => (<HeaderRight/>),
          headerLeft: () => (<HeaderLeft/>),
        }}
      />
    </Tabs>
    </Animated.View>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  title: string;
}) {
  return (<View style={{marginBottom: scale(-15), flex: scale(1), alignItems: 'center', justifyContent: 'center', alignContent:'center'}}>
  <FontAwesome size={24} style={{bottom:0 }} color={props.color} name={props.name} />
  <Text style={{color:`${props.color}`, marginTop:scale(3), fontSize: scale(8)}}>{props.title}</Text>
  </View>);
}
function TabBarMiddleIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  title: string;
}) {
  return (<><View style={{marginTop: scale(-15), display:'flex', justifyContent:'center',borderWidth: scale(2),borderColor:`${props.color=='#fff'?'#FF008C':props.color}`, alignItems: 'center',borderRadius:scale(100),width:scale(55),height:scale(55), backgroundColor:"#ffffff" }}>
  <FontAwesome size={scale(28)} color={props.color=='#fff'?'#FF008C':props.color} name={props.name} /> 
  </View>
  {/* <Text style={{color:`${props.color}`, fontSize: 11,marginTop: 5,}}>{props.title}</Text> */}
  </>);
}

function HeaderRight() {
  const colorScheme = useColorScheme();

  return (
    <Link href="/Notification" asChild>
    <Pressable>
      {({ pressed }) => (
        <FontAwesome
          name="bell"
          size={25}
          color={Colors[colorScheme ?? 'light'].text}
          style={{ marginRight: scale(10), color: pressed ? '#183399': '#000', opacity: pressed? 0.8: 1 }}
        />
      )}
    </Pressable>
  </Link>
  )
}

function HeaderLeft() {
  return (
    <><Image source={icon} style={{marginLeft:scale(10), width: scale(40),height: scale(40)}}/></>
  )
}