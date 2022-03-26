import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

class Profile extends React.Component {
  async deleteProfile() {
    var myDeleteHeaders = new Headers();
    myDeleteHeaders.append("Content-Type", "application/json");
    myDeleteHeaders.append("x-access-token", this.state.accesscode);

    var deleteOptions = {
      method: 'DELETE',
      headers: myDeleteHeaders,
      redirect: 'follow',
    };
    try {
      let deleteResponse = await fetch('https://cs571.cs.wisc.edu/users/' + this.state.username, deleteOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      // let deleteMessage = await deleteResponse.json();
      // console.log("acessCode: " + JSON.parse(JSON.stringify(deleteMessage.token)));

      this.setState({ errorMessage: deleteMessage.message });
    } catch (err) {
      this.setState({ errorMessage: "Cannot Delete User" });
    }
    this.setState({
      username: "",
      password: "",
      userProfile: {},
      accesscode: "",
      errorMessage: "",
      showProfile: false,
    });
    Alert.alert("Thank you for joining us!!!", this.state.errorMessage);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>About Me</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Personal Information</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>First Name</Text>
        <TextInput style={styles.input} placeholder="Enter First Name" />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Enter Last Name" />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Fitness Goal</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Calories (kal)</Text>
        <TextInput style={styles.input} placeholder="Enter an input" />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Protein (grams)</Text>
        <TextInput style={styles.input} placeholder="Enter an input" />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Carbs (grams)</Text>
        <TextInput style={styles.input} placeholder="Enter an input" />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Fat (grams)</Text>
        <TextInput style={styles.input} placeholder="Enter an input" />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Activity (mins)</Text>
        <TextInput style={styles.input} placeholder="Enter an input" />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Looks good! All set?</Text>

        <Button
          title="SAVE PROFILE"
          onPress={() => console.log("UPDATE TO SERVER")}
        />
        <Button
          title="Delete"
          onPress={() => this.deleteProfile()}
        />
        <Button
          title="Log out"
          onPress={() => {
            this.props.navigation.replace('Login');
          }}
        />
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
    fontSize: 25,
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    height: 40,
    marginVertical: 10,
  },
});

export default Profile;
