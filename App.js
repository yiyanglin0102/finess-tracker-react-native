import 'react-native-gesture-handler';
import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Exercises from "./Exercises";
import Meals from "./Meals";
import Home from "./Home";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator(); // Stack Navigator (https://reactnavigation.org/docs/stack-navigator)
// const Drawer = createDrawerNavigator(); // Drawer Navigator (https://reactnavigation.org/docs/drawer-navigator)
const Tab = createBottomTabNavigator(); // Bottom Tabs Navigator (https://reactnavigation.org/docs/tab-based-navigation)


function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}>
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUp}>
      </Stack.Screen>
      <Stack.Screen name="Home" component={Home}>
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
        <StackNavigator />
      </NavigationContainer>
    );
  }
}

export default App;