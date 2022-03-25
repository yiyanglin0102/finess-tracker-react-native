import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
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
    // myHeaders.append("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImJiYWRnZXI4MTciLCJleHAiOjE2NDgwODkwMzh9.NhSz6wQ-4VNhnAQEj1_ULTiDlqksoEfPCmYGdteMoOo");
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));
    console.log(myHeaders);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    try {

      let response = await fetch("https://cs571.cs.wisc.edu/login", requestOptions)
      let reponse = await response.json();
      if (!('message' in reponse)) {
        this.setState({ showProfile: true })
      } else {
        Alert.alert("OOPS!", reponse.message);
      }
      this.setState({ accesscode: JSON.parse(JSON.stringify(reponse.token)) });
      myHeaders.set("x-access-token", reponse.token);
      requestOptions.headers = myHeaders;
      this.setState({ errorMessage: reponse.message });
    } catch (err) {
      this.setState({ errorMessage: "Incorrect username and/or password" });
    }
    try {
      let response2 = await fetch('https://cs571.cs.wisc.edu/users/' + this.state.username, requestOptions)
      let reponse2 = await response2.json();
      this.setState({ userProfile: reponse2 });
      console.log(reponse2);
    } catch (err) {
      this.setState({ errorMessage: "Incorrect username and/or password" });
    }
  };

  async profile() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", "");
    myHeaders.append("Authorization", 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    let response = await fetch('https://cs571.cs.wisc.edu/login', requestOptions);
    let reponse = await response.json();
    console.log(reponse.token);

    // console.log(JSON.parse(JSON.stringify(reponse.token)));
    //   if (!('message' in reponse)) {
    //     this.setState({ showProfile: true })
    //   } else {
    //     Alert.alert("OOPS!", reponse.message);
    //   }
    console.log("acessCode: " + JSON.parse(JSON.stringify(reponse.token)));
    myHeaders.set("x-access-token", reponse.token);
    requestOptions.headers = myHeaders;
    //   this.setState({ errorMessage: reponse.message });
    // } catch (err) {
    //   this.setState({ errorMessage: "Incorrect username and/or password" });
    // }
    // try {
    let response2 = await fetch('https://cs571.cs.wisc.edu/users/' + this.state.username, requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
    console.log(await response2.text());


  };
 


  render() {
    return (
      <View style={styles.container}>
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
            onChangeText={(text) => { this.handlePassword("password") }} // change "password" back to text
          />

          {/* To navigate to another component, use this.props.navigation.navigate().
            See https://reactnavigation.org/docs/navigating for more details.
          */}
          <View style={{ flexDirection: 'row' }}>
            <Button
              title="logIn"
              onPress={() => {this.logIn(); this.profile(); this.props.navigation.navigate('Profile')}}
            />
           
            <Button
              title="Sign Up"
              onPress={() => this.props.navigation.navigate('SignUp')}
            />
           
          </View>
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

export default Login;
