import React, { Component } from "react";
import { Alert, Button, Modal, StyleSheet, Text, View, TextInput, FlatList, StatusBar } from "react-native";
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
      // console.log(res);
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
    var requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': this.state.accesscode,
      },
      body: JSON.stringify({
        name: name,
        duration: duration,
        calories: calories,
        date: date
      }),
    };
    await fetch('https://cs571.cs.wisc.edu/activities/' + id, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    this.allActivities();
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
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Exercises</Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Let's get to work!</Text>
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Record your exercises below</Text>

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
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Exercise Details</Text>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Exercise Name</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                onChangeText={(text) => {
                  this.setState({ addName: text });
                }} />
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Duration (minutes)</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                keyboardType='numeric'
                onChangeText={(text) => {
                  this.setState({ addDuration: Number(text) });
                }} />
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Calories Burnt</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                keyboardType='numeric'
                onChangeText={(text) => {
                  this.setState({ addCaloriesBurnt: Number(text) });
                }} />
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Looks good! Ready to save your work?</Text>

              <Button
                title="Save Exercise"
                onPress={async () => {
                  var date = await new Date();
                  var json = await JSON.stringify(date);
                  await this.setState({ addDate: json });
                  await this.addActivity();
                  await this.setState({ addName: "" });
                  await this.setState({ addDuration: 0 });
                  await this.setState({ addCaloriesBurnt: 0 });
                  await this.setState({ addDate: "" });
                  await this.setState({ modalVisible: !this.state.modalVisible })
                  await Alert.alert(
                    "Exercises",
                    "Exercise added!",
                    [
                      { text: "OK" }
                    ]
                  )
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#00b369",
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