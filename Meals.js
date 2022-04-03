import React, { Component } from "react";
import { Alert, Button, Modal, StyleSheet, Text, View, TextInput, FlatList, StatusBar } from "react-native";
import Meal from './Meal';

class Meals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      accesscode: this.props.route.params.accesscode,
      userProfile: this.props.route.params.userProfile,
      modalVisible: false,
      allMeals: [],
      addDate: "",
      addMealName: "",
    }
    this.deleteMeal = this.deleteMeal.bind(this);
    // this.editActivity = this.editActivity.bind(this);
  }
  componentDidMount() {
    this.allMeals();
  }
  componentDidUpdate() {
    // this.allMeals();
  }

  async allMeals() {
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
      let response = await fetch('https://cs571.cs.wisc.edu/meals', requestOptions)
      let res = await response.text();
      console.log(res);
      let { meals } = JSON.parse(res);
      console.log(meals);

      this.setState({
        allMeals: meals,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  async addMeals() {
    var raw = JSON.stringify({
      name: this.state.addMealName,
      date: this.state.addDate,
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
      let response = await fetch('https://cs571.cs.wisc.edu/meals', requestOptions)
      let res = await response.text();
      console.log(res);
    } catch (err) {
      // console.log(err);
    }
    this.allMeals();
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  async deleteMeal(id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", this.state.accesscode);
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };
    try {
      let response = await fetch('https://cs571.cs.wisc.edu/meals/' + id, requestOptions)
      let res = await response.text();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    this.allMeals();
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
    this.allMeals();
  }

  render() {
    const renderItem = ({ item }) => (
      <Meal
        id={item.id}
        name={item.name}
        date={item.date}
        deleteMeal={this.deleteMeal}
        userProfile={this.state.userProfile}
        accesscode={this.state.accesscode}
      />
    );

    return (
      <View style={styles.centeredView}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Meals</Text>

        <View style={styles.container}>
          <FlatList
            data={this.state.allMeals}
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
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Meal Details</Text>
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Meal Name</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                onChangeText={(text) => {
                  this.setState({ addMealName: text });
                }} />


              <Button
                title="Save Meal"
                onPress={async () => {
                  var date = await new Date();
                  var json = await JSON.stringify(date);
                  await this.setState({ addDate: json });
                  await this.addMeals();
                  await this.setState({ addMealName: "" });
                  await this.setState({ addDate: "" });
                  await this.setState({ modalVisible: !this.state.modalVisible })
                  await Alert.alert(
                    "Meal",
                    "Meal added!",
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
          title="Add Meal"
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

export default Meals;