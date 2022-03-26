import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView } from "react-native";
import base64 from "base-64"; // Use this library to encode `username:password` to base64

class Login extends React.Component {
  // Use Basic access authentication (https://en.wikipedia.org/wiki/Basic_access_authentication) to authenticate the user.
  // React Native 1 lecture covered a good example of how to do this.

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      showProfile: false,
      accesscode: "",
      userProfile: "",
      showProfile: false,
    }
  }
  handleUsername(text) {
    this.setState({ username: text })
  }

  handlePassword(text) {
    this.setState({ password: text })
  }

  async logIn() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));
    console.log(myHeaders);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let response = await fetch("https://cs571.cs.wisc.edu/login", requestOptions)
    let reponse = await response.json();
    this.setState({ accesscode: reponse.token });

    myHeaders.set("x-access-token", reponse.token);
    requestOptions.headers = myHeaders;

    try {
      let response2 = await fetch('https://cs571.cs.wisc.edu/users/' + this.state.username, requestOptions)
      let res = await response2.text();
      console.log(res);

      this.setState({ userProfile: JSON.parse(res) });
      if (!("Token is invalid!" === JSON.parse(res).message)) {
        this.setState({ showProfile: true })
      }
    } catch (err) {
      // console.log(err);
    }
  };

  profile() {
    console.log(this.state.userProfile);
    console.log(this.state.accesscode);

  };



  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Text
          style={{ color: "#C5050C", marginBottom: 20, fontWeight: 'bold', fontSize: 25 }}
        >
          Fitness Tracker
        </Text>
        <Text style={styles.body}>Welcome! Please login or signup to continue.</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Enter your Username and Password</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <TextInput style={{ paddingHorizontal: 5, height: 40, width: 140, borderColor: 'black', borderWidth: 2, marginTop: 20, marginBottom: 15, borderRadius: 5 }}
            placeholderColor="#c4c3cb"
            placeholder="Username"
            onChangeText={(text) => { this.handleUsername(text) }}
          />
          <TextInput style={{ paddingHorizontal: 5, height: 40, width: 140, borderColor: 'black', borderWidth: 2, marginBottom: 15, borderRadius: 5 }}
            placeholderColor="#c4c3cb"
            placeholder="Password"
            onChangeText={(text) => { this.handlePassword(text) }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Button
              title="logIn"
              onPress={() => {
                this.logIn().then(() => {

                  console.log(this.state.showProfile);
                  if (this.state.showProfile) {
                    this.profile();

                    this.props.navigation.navigate('Home', {
                      screen: 'Profile',
                      params: {
                        user: 123,
                      }
                    })
                  }
                });
              }}
            />
            <Button
              title="Sign Up"
              onPress={() => this.props.navigation.navigate('SignUp', {
                itemId: 86,
                otherParam: 'anything you want here',
              })}
            />
            <Button
              title="Test"
              onPress={() => this.props.navigation.navigate('Test', {
                itemId: 86,
                otherParam: 'anything you want here',
              })}
            />
          </View>
        </View>
      </ScrollView>
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
  scrollView: {
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    height: 40,
    marginVertical: 10,
  },
});

export default Login;
