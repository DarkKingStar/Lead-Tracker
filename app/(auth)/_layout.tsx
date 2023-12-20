import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: 'none' ,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="forgotpassword" />
      <Tabs.Screen name="otpverify"/>
    </Tabs>
  );
}