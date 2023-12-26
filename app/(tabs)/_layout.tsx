import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Link, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import icon from '../../assets/images/icon.png';
import { Image } from 'expo-image';


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs  screenOptions={{
      tabBarInactiveTintColor: Colors[colorScheme ?? 'dark'].tint, 
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].background,
      tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].navbarColor,
      tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].navbarColor,
      headerStyle: {backgroundColor: '#ffffff'}
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
            router.push("/(tabs)/lead");
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
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  title: string;
}) {
  return (<View style={{marginTop: 5, flex: 1, alignItems: 'center'}}>
  <FontAwesome size={24} style={{ marginBottom: -3 }} color={props.color} name={props.name} />
  <Text style={{color:`${props.color}`, fontSize: 11,marginTop: 5,}}>{props.title}</Text>
  </View>);
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
          style={{ marginRight: 15, color: pressed ? '#183399': '#000', opacity: pressed? 0.8: 1 }}
        />
      )}
    </Pressable>
  </Link>
  )
}

function HeaderLeft() {
  return (
    <><Image source={icon} style={{marginLeft:5, width: 50,height: 50}}/></>
  )
}