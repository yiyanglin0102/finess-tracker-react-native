import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import base64 from "base-64";

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
    console.log(await response2.text());
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Create with Username and Password</Text>
          <TextInput
            style={{ paddingHorizontal: 5, height: 40, width: 140, borderColor: 'black', borderWidth: 2, marginTop: 20, marginBottom: 15, borderRadius: 5 }}
            placeholder="Username"
            placeholderColor="#c4c3cb"
          // onChangeText={(text) => {this.handleUsername(text)}}
          />
          <TextInput
            style={{ paddingHorizontal: 5, height: 40, width: 140, borderColor: 'black', borderWidth: 2, marginBottom: 15, borderRadius: 5 }}
            placeholder="Password"
            placeholderColor="#c4c3cb"
            // secureTextEntry={true}
            value={"password"}// lazy to type

          // onChangeText={(text) => {this.handlePassword(text)}}
          />
          <Button
            title="Sign Up"
            buttonStyle={{ height: 40, width: 120, fontSize: 40, alignSelf: 'center', alignItems: 'center', backgroundColor: '#aaaaaa', marginTop: 14, marginLeft: 6, justifyContent: 'center', borderRadius: 10 }}
            text={'Sign Up'}
            textStyle={{ color: "#4d4a43", fontSize: 19, fontWeight: 'bold' }}
            onPress={() => this.SignUp()}
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
