import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';


export default function TabLayout() {
  return (
    <View style={{flex: 1}} collapsable={false}>
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: 'none' ,
        },
        headerShown: false,
      }}
    >
    <Tabs.Screen name="index" />
    <Tabs.Screen name="search" />
    </Tabs>
    </View>
  );
}