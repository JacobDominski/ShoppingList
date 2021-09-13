//import react framework
import React from 'react';
//import home screen and newlist screen
import Home from './screens/Home'
import NewList from './screens/NewList'
//import navigation for stack and drawer
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//create the stack and drawer navigation
const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

//routes for drawer
function DrawerRoutes(){
  //return the navigator for the drawer
  return(
    //initial route set to home
    <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      {/* only shows home Will add more in the future */}
      <Drawer.Screen name="Home" component={Home}/>
      
    </Drawer.Navigator>
  )
}
//main app for stack navigation
export default function App() {
  //returns the stack navigator
  return (
    <NavigationContainer>
      {/* initial route is set to shopping list */}
      <Stack.Navigator initialRouteName="Shopping List">
        {/* shopping list goes to drawer route which is the drawer */}
        <Stack.Screen name="Shopping List" component={DrawerRoutes} />
        {/* shoppinf list goes to new list when plus button is pressed */}
        <Stack.Screen name="New List" component={NewList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

