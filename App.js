import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home'
import NewList from './screens/NewList'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerRoutes(){
  return(
    <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={Home}/>
      
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Shopping List">
        <Stack.Screen name="Shopping List" component={DrawerRoutes} />
        <Stack.Screen name="New List" component={NewList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
