import React, { Component } from "react";
import { Button, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, FlatList, StatusBar } from "react-native";
import Item from './Item';

class Exercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      accesscode: this.props.route.params.accesscode,
      userProfile: this.props.route.params.userProfile,
      modalVisible: false,
      allActivities: [],
      addName: "",
      addDuration: 0,
      addCaloriesBurnt: 0,
      addDate: 0,
    }
    this.deleteActivity = this.deleteActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
  }
  componentDidMount() {
    this.allActivities();
  }
  componentDidUpdate() {
    // this.allActivities();
  }

  async allActivities() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.accesscode);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      let response = await fetch('https://cs571.cs.wisc.edu/activities', requestOptions)
      let res = await response.text();
      console.log(res);
      let { activities } = JSON.parse(res);
      this.setState({
        allActivities: activities,
      });

    } catch (err) {
      // console.log(err);
    }
  };

  async addActivity() {
    var raw = JSON.stringify({
      name: this.state.addName,
      duration: this.state.addDuration,
      date: this.state.addDate,
      calories: this.state.addCaloriesBurnt,
    });

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.accesscode);
    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      let response = await fetch('https://cs571.cs.wisc.edu/activities', requestOptions)
      let res = await response.text();
      console.log(res);

    } catch (err) {
      // console.log(err);
    }
    this.allActivities();
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  async deleteActivity(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.accesscode);
    // myHeaders.append("Access-Control-Allow-Origin", "*");

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };
    try {
      let response = await fetch('https://cs571.cs.wisc.edu/activities/' + id, requestOptions)
      let res = await response.text();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    this.allActivities();
  }


  async editActivity(id, name, calories, duration, date) {
    // var requestOptions = {
    //   method: 'PUT',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'x-access-token': this.state.accesscode,
    //   },
    //   body: JSON.stringify({
    //     firstName: this.state.firstName,
    //     lastName: this.state.lastName,
    //     goalDailyCalories: this.state.goalDailyCalories,
    //     goalDailyProtein: this.state.goalDailyProtein,
    //     goalDailyCarbohydrates: this.state.goalDailyCarbohydrates,
    //     goalDailyFat: this.state.goalDailyFat,
    //     goalDailyActivity: this.state.goalDailyActivity,
    //   }),
    // };
    // let response2 = await fetch('https://cs571.cs.wisc.edu/users/' + this.state.userProfile.username, requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));





    console.log(id);
    console.log(name);
    console.log(calories);
    console.log(duration);
    console.log(date);
  }






  render() {
    const renderItem = ({ item }) => (
      <Item title={item.title}
        id={item.id}
        name={item.name}
        calories={item.calories}
        duration={item.duration}
        date={item.date}
        userProfile={this.state.userProfile}
        accesscode={this.state.accesscode}
        deleteActivity={this.deleteActivity}
        editActivity={this.editActivity}
      />
    );

    return (
      <View style={styles.centeredView}>
        <Text>My userProfile: {this.state.userProfile.firstName}</Text>
        <Text>acessCode: {this.state.accesscode}</Text>
        <Button
          title="Test"
          onPress={() => {
            console.log("get from SERVER");
            console.log("addName: " + this.state.addName);
            console.log("addDuration: " + this.state.addDuration);
            console.log("addDate: " + this.state.addDate);
          }}
        />
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Exercises</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Let's get to work!</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Record your exercises below</Text>

        <View style={styles.container}>
          <FlatList
            data={this.state.allActivities}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Exercise Details</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Exercise Name</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                onChangeText={(text) => {
                  this.setState({ addName: text });
                }} />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Duration (minutes)</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                keyboardType='numeric'
                onChangeText={(text) => {
                  this.setState({ addDuration: Number(text) });
                }} />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Calories Burnt</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                keyboardType='numeric'
                onChangeText={(text) => {
                  this.setState({ addCaloriesBurnt: Number(text) });
                }} />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Looks good! Ready to save your work?</Text>

              <Button
                title="Save Exercise"
                onPress={async () => {
                  var date = await new Date();
                  // await console.log(date); // Thu Nov 07 2019 11:58:58 GMT-0600 (Central Standard Time)
                  var json = await JSON.stringify(date);
                  await this.setState({ addDate: json });
                  // await console.log("---- form ---- ");
                  // await console.log("addName: " + this.state.addName);
                  // await console.log("addDuration: " + this.state.addDuration);
                  // await console.log("addCarBurnt: " + this.state.addCaloriesBurnt);
                  // await console.log("addDate: " + this.state.addDate);
                  await this.addActivity();
                  // await console.log("added exercise"); //api
                  await this.setState({ addName: "" });
                  await this.setState({ addDuration: 0 });
                  await this.setState({ addCaloriesBurnt: 0 });
                  await this.setState({ addDate: "" });
                  await this.setState({ modalVisible: !this.state.modalVisible })
                }}
              />
              <Button
                title="Never Mind"
                onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
              />

            </View>
          </View>
        </Modal>

        <Button
          title="Add Exercise"
          onPress={() => { this.setModalVisible(true) }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "blue",
  },
  textStyle: {
    color: "black",
    // fontWeight: "bold",
    // textAlign: "center"
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    padding: 8,
    height: 40,
    marginVertical: 10,
  },
});

export default Exercises;