import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView } from "react-native";
import base64 from "base-64";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      showProfile: false,
      accesscode: "",
      userProfile: "",
    }
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
      else {
        Alert.alert(
          "Login",
          "Incorrect username or password! Please try again.",
          [
            { text: "OK" }
          ]
        )
      }
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{ marginBottom: 20, marginTop: 20, fontWeight: 'bold', fontSize: 30 }}
          >
            Fitness Tracker
          </Text>
          <Text style={{ marginBottom: 20, fontSize: 15 }}>Welcome! Please login or signup to continue.</Text>

          <TextInput style={{ paddingHorizontal: 5, height: 40, width: 140, borderColor: 'black', borderWidth: 2, marginTop: 20, marginBottom: 15, borderRadius: 5 }}
            placeholderColor="#c4c3cb"
            placeholder="Username"
            onChangeText={(text) => { this.setState({ username: text }) }}
          />
          <TextInput style={{ paddingHorizontal: 5, height: 40, width: 140, borderColor: 'black', borderWidth: 2, marginBottom: 15, borderRadius: 5 }}
            placeholderColor="#c4c3cb"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => { this.setState({ password: text }) }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Button
              title="Login"
              onPress={() => {
                this.logIn().then(() => {
                  console.log(this.state.showProfile);
                  if (this.state.showProfile) {
                    this.props.navigation.replace('Home', {
                      screen: 'Exercises',
                      params: {
                        userProfile: this.state.userProfile,
                        accesscode: this.state.accesscode
                      }
                    })
                  }
                }).then(() => {
                  if (this.state.showProfile) {
                    this.props.navigation.navigate('Home', {
                      screen: 'Meals',
                      params: {
                        userProfile: this.state.userProfile,
                        accesscode: this.state.accesscode
                      }
                    })
                  }
                }).then(() => {
                  if (this.state.showProfile) {
                    this.props.navigation.navigate('Home', {
                      screen: 'Profile',
                      params: {
                        userProfile: this.state.userProfile,
                        accesscode: this.state.accesscode
                      }
                    })
                  }
                });
              }}
            />
            <Button
              title="Sign Up"
              onPress={() => this.props.navigation.navigate('SignUp'
              )}
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
