import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";

class SignupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      showProfile: false
    }
  }
  handleUsername(text) {
    this.setState({ username: text })
  }

  handlePassword(text) {
    this.setState({ password: text })
  }

  async SignUp() {
    let obj = {};
    obj.username = this.state.username;
    obj.password = this.state.password;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", "");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(obj),
    };

    let response2 = await fetch('https://cs571.cs.wisc.edu/users', requestOptions)
    let msg = await response2.text();
    console.log(msg);
    this.setState({ errorMessage: JSON.parse(msg) });
  };

  buttonAlert = () =>
    Alert.alert(
      "Sign Up",
      this.state.errorMessage.message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ]
    );


  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 30 }}
          >
            Fitness Tracker
          </Text>
          <Text style={{ marginBottom: 20, fontSize: 15 }}>New here? Let's get started!</Text>
          <Text style={{ marginBottom: 20, fontSize: 15 }}>Please create an account below.</Text>
          <TextInput
            style={{ paddingHorizontal: 5, height: 40, width: 140, borderColor: 'black', borderWidth: 2, marginTop: 20, marginBottom: 15, borderRadius: 5 }}
            placeholderColor="#c4c3cb"
            placeholder="Username"
            onChangeText={(text) => { this.handleUsername(text) }}
          />
          <TextInput
            style={{ paddingHorizontal: 5, height: 40, width: 140, borderColor: 'black', borderWidth: 2, marginBottom: 15, borderRadius: 5 }}
            placeholder="Password"
            placeholderColor="#c4c3cb"
            secureTextEntry={true}
            onChangeText={(text) => { this.handlePassword(text) }}
          />
          <Button
            title="Create Account"
            buttonStyle={{ height: 40, width: 120, fontSize: 40, alignSelf: 'center', alignItems: 'center', backgroundColor: '#aaaaaa', marginTop: 14, marginLeft: 6, justifyContent: 'center', borderRadius: 10 }}
            text={'Create Account'}
            textStyle={{ color: "#4d4a43", fontSize: 19, fontWeight: 'bold' }}
            onPress={() => {
              this.SignUp().then(() => {
                this.buttonAlert();
                if (this.state.errorMessage.message === "User created!") {  // check msg with success word then return true
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
                }
              })
            }}
          />
          <Button
            title="Cancel"
            buttonStyle={{ height: 40, width: 120, fontSize: 40, alignSelf: 'center', alignItems: 'center', backgroundColor: '#aaaaaa', marginTop: 14, marginLeft: 6, justifyContent: 'center', borderRadius: 10 }}
            text={'Cancel'}
            textStyle={{ color: "#4d4a43", fontSize: 19, fontWeight: 'bold' }}
            onPress={() => {
              this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    height: 40,
    marginVertical: 10,
  },
});

export default SignupView;
