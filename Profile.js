import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import base64 from "base-64";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      showProfile: false,
      accesscode: this.props.route.params.accesscode,
      userProfile: this.props.route.params.userProfile,
    }
  }

  async deleteProfile() {
    var myDeleteHeaders = new Headers();
    myDeleteHeaders.append("Content-Type", "application/json");
    myDeleteHeaders.append("x-access-token", this.state.accesscode);

    var deleteOptions = {
      method: 'DELETE',
      headers: myDeleteHeaders,
      redirect: 'follow',
    };
    let deleteResponse = await fetch('https://cs571.cs.wisc.edu/users/' + this.state.userProfile.username, deleteOptions)
    let deleteMessage = await deleteResponse.json();
    console.log(deleteMessage.message);
  }


  async updateProfile() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.accesscode);
    var raw = JSON.stringify({
      firstName: "bBucky",
      lastName: "bBadger",
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    let response2 = fetch('https://cs571.cs.wisc.edu/users/' + this.props.route.params.userProfile.username, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };


  render() {
    return (
      <View style={styles.container}>
        <Text>My userProfile: {JSON.stringify(this.state.userProfile.firstName)}</Text>
        <Text>acessCode: {this.state.accesscode}</Text>


        <Text style={styles.title}>About Me:</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Personal Information</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>First Name</Text>

        <TextInput style={styles.input}
          placeholder="Enter First Name"
          defaultValue={JSON.stringify(this.state.userProfile.firstName)}
          onChangeText={(text) => { this.setState({ firstName: text }) }} />

        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Enter Last Name"
          defaultValue={JSON.stringify(this.state.userProfile.lastName)}
          onChangeText={(text) => { this.setState({ lastName: text }) }} />

        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Fitness Goal</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Calories (kal)</Text>

        <TextInput style={styles.input}
          placeholder="Enter an input"
          defaultValue={JSON.stringify(this.state.userProfile.goalDailyCalories)} />

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
          onPress={() => { this.updateProfile(); console.log("UPDATE TO SERVER"); }}
        />
        <Button
          title="Delete Profile"
          onPress={() => { this.deleteProfile() }}
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
