import 'react-native-gesture-handler';
import React from "react";

import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Exercises from "./Exercises";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator(); // Stack Navigator (https://reactnavigation.org/docs/stack-navigator)
// const Drawer = createDrawerNavigator(); // Drawer Navigator (https://reactnavigation.org/docs/drawer-navigator)
const Tab = createBottomTabNavigator(); // Bottom Tabs Navigator (https://reactnavigation.org/docs/tab-based-navigation)

function CreateBottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        name="Exercises"
        component={Exercises}
      />
    </Tab.Navigator>
  );
}

function CreateStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}>
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp}>
      </Stack.Screen>
      <Stack.Screen name="Home" component={CreateBottomTabNavigator}>
      </Stack.Screen>
    </Stack.Navigator>
  );
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      accessToken: undefined,
    };
  }

  // Set the access token
  setAccessToken = (newAccessToken) => {
    this.setState({ accessToken: newAccessToken });
  };

  render() {
    return (
      <NavigationContainer>
        <CreateStackNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
// We can also nest another navigator (e.g. Bottom Tabs, Drawer, etc.) inside a stack navigator.
// See https://reactnavigation.org/docs/nesting-navigators on how to nest navigators.    
// (props) => <Profile {...props} />
// If you do not need to pass props, you can pass a component as a `component` prop to Screens like below
// <Stack.Screen name="SignUp" component={SignUp} /> 
// This is how you pass props (e.g. setAccessToken) to another component
// We only want to show Login and Signup View when the user is not logged in.
// When the user is logged in, we want to show the Profile View and the Exercises View.            
// How do we do this? See https://reactnavigation.org/docs/auth-flow
