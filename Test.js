import * as React from 'react';
import { Text, View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


function Test({ route, navigation }) {
    /* 2. Get the param */
    const { itemId } = route.params;
    const { otherParam } = route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            navigation.navigate('Test', {
              itemId: Math.floor(Math.random() * 100),
            })
          }
        />
        <Button title="Go to Home" onPress={() => navigation.navigate('Login')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  export default Test;