import { Stack, Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Stack>
    <Stack.Screen name="index" options={{ presentation: 'transparentModal', headerShown: false, animation: "slide_from_bottom" }} />
    </Stack>
  );
}