import React from "react";
import { StyleSheet, Text, View, Button, TextInput, StatusBar } from "react-native";
import base64 from "base-64";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      showProfile: false,
      accesscode: this.props.route.params.accesscode,
      userProfile: this.props.route.params.userProfile,
      firstName: "",
      lastName: "",
      goalDailyCalories: "",
      goalDailyProtein: "",
      goalDailyCarbohydrates: "",
      goalDailyFat: "",
      goalDailyActivity: "",
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

    var requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.state.accesscode,
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        goalDailyCalories: Number(this.state.goalDailyCalories),
        goalDailyProtein: Number(this.state.goalDailyProtein),
        goalDailyCarbohydrates: Number(this.state.goalDailyCarbohydrates),
        goalDailyFat: Number(this.state.goalDailyFat),
        goalDailyActivity: Number(this.state.goalDailyActivity),
      }),
    };
    let response2 = await fetch('https://cs571.cs.wisc.edu/users/' + this.state.userProfile.username, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };


  render() {
    return (
      <View style={styles.container}>
        <Text>My userProfile: {this.state.userProfile.firstName}</Text>
        <Text>accessCode: {this.state.accesscode}</Text>


        <Text style={styles.title}>About Me:</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Personal Information</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>First Name</Text>

        <TextInput style={styles.input}
          placeholder="Enter First Name"
          defaultValue={this.state.userProfile.firstName}
          onChangeText={(text) => {
            this.setState({ firstName: text });
            let profileObject = this.state.userProfile;
            profileObject.firstName = text;
            this.setState({ userProfile: profileObject })
          }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Enter Last Name"
          defaultValue={this.state.userProfile.lastName}
          onChangeText={(text) => {
            this.setState({ lastName: text });
            let profileObject = this.state.userProfile;
            profileObject.lastName = text;
            this.setState({ userProfile: profileObject })
          }} />

        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Fitness Goal</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Calories (kal)</Text>
        <TextInput style={styles.input}
          placeholder="Enter an input"
          defaultValue={JSON.stringify(this.state.userProfile.goalDailyCalories)}
          onChangeText={(text) => {
            this.setState({ goalDailyCalories: text });
            let profileObject = this.state.userProfile;
            profileObject.goalDailyCalories = text;
            this.setState({ userProfile: profileObject })
          }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Protein (grams)</Text>
        <TextInput style={styles.input} placeholder="Enter an input"
          defaultValue={JSON.stringify(this.state.userProfile.goalDailyProtein)}
          onChangeText={(text) => {
            this.setState({ goalDailyProtein: text });
            let profileObject = this.state.userProfile;
            profileObject.goalDailyProtein = text;
            this.setState({ userProfile: profileObject })
          }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Carbs (grams)</Text>
        <TextInput style={styles.input} placeholder="Enter an input"
          defaultValue={JSON.stringify(this.state.userProfile.goalDailyCarbohydrates)}
          onChangeText={(text) => {
            this.setState({ goalDailyCarbohydrates: text });
            let profileObject = this.state.userProfile;
            profileObject.goalDailyCarbohydrates = text;
            this.setState({ userProfile: profileObject })
          }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Fat (grams)</Text>
        <TextInput style={styles.input} placeholder="Enter an input"
          defaultValue={JSON.stringify(this.state.userProfile.goalDailyFat)}
          onChangeText={(text) => {
            this.setState({ goalDailyFat: text });
            let profileObject = this.state.userProfile;
            profileObject.goalDailyFat = text;
            this.setState({ userProfile: profileObject })
          }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Daily Activity (mins)</Text>
        <TextInput style={styles.input} placeholder="Enter an input"
          defaultValue={JSON.stringify(this.state.userProfile.goalDailyActivity)}
          onChangeText={(text) => {
            this.setState({ goalDailyActivity: text });
            let profileObject = this.state.userProfile;
            profileObject.goalDailyActivity = text;
            this.setState({ userProfile: profileObject })
          }} />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Looks good! All set?</Text>

        <Button
          title="SAVE PROFILE"
          onPress={() => { this.updateProfile(); console.log("UPDATE TO SERVER"); }}
        />
        <Button
          title="Delete Profile"
          onPress={() => {
            this.deleteProfile();
            this.props.navigation.pop();
            this.props.navigation.replace('Login', {
              screen: 'Login',
              params: {
                userProfile: "",
                accesscode: ""
              }
            })
          }}
        />
        <Button
          title="Log out"
          onPress={() => {
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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