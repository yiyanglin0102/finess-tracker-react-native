import 'react-native-gesture-handler';
import React, { Component } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Exercises from "./Exercises";
import Meals from "./Meals";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: "",
      accesscode: "",
    }
  }
  render() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{
            userProfile: this.state.userProfile,
            accesscode: this.state.accesscode,
          }}
        />
        <Tab.Screen
          name="Exercises"
          component={Exercises}
          initialParams={{
            userProfile: this.state.userProfile,
            accesscode: this.state.accesscode,
          }}
        />
        <Tab.Screen
          name="Meals"
          component={Meals}
          initialParams={{
            userProfile: this.state.userProfile,
            accesscode: this.state.accesscode,
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default Home;