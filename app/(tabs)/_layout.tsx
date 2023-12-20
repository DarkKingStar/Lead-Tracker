import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Link, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */


export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs  screenOptions={{
      tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tint, 
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].background,
      tabBarInactiveBackgroundColor: Colors[colorScheme ?? 'light'].navbarColor,
      tabBarActiveBackgroundColor: Colors[colorScheme ?? 'light'].navbarColor,
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
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  </Link>
  )
}

function HeaderLeft() {
  return (
    <><Image source={require("../../assets/images/icon.png")} style={{width: 50,height: 50}}/></>
  )
}