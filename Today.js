import React, { Component } from "react";
import { Alert, Button, Modal, StyleSheet, Text, View, TextInput, FlatList, StatusBar } from "react-native";
import Item from './Item';

class Today extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accesscode: this.props.route.params.accesscode,
      userProfile: this.props.route.params.userProfile,
      allActivities: "",
      totalCalories: 0,
      totalDuration: 0,
      visible: false,
    }
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
      // console.log(res);
      let { activities } = JSON.parse(res);
      this.setState({
        allActivities: activities,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  calTotal() {
    const caloriesSum = this.state.allActivities.map(item => item.calories).reduce((prev, curr) => prev + curr, 0);
    this.setState({ totalCalories: caloriesSum });
    const durationSum = this.state.allActivities.map(item => item.duration).reduce((prev, curr) => prev + curr, 0);
    this.setState({ totalDuration: durationSum });
  }

  render() {
    return (
      <View style={styles.centeredView}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Goal Daily Activity Duration {this.state.userProfile.goalDailyActivity} Minutes</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Goal Daily Calories {this.state.userProfile.goalDailyCalories} Kals</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Goal Daily Carbohydrates {this.state.userProfile.goalDailyCarbohydrates} Grams</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Goal Daily Fat {this.state.userProfile.goalDailyFat} Grams</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Goal Daily Protein {this.state.userProfile.goalDailyProtein} Grams</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>------------------------</Text>

        <View style={styles.container}>
          {this.state.visible &&
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Today's Exercise Calories {this.state.totalCalories} Kals</Text>}
          {this.state.visible &&
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Today's Exercise Duration {this.state.totalDuration}  Minutes</Text>}
        </View>

        <Button
          title="Compare Today's Exercise"
          onPress={async () => {
            await this.allActivities();
            await this.calTotal();
            console.log(this.state.allActivities);
            console.log(this.state.totalCalories);
            console.log(this.state.totalDuration);
            this.setState({ visible: !this.state.visible })
          }
          }
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

export default Today;