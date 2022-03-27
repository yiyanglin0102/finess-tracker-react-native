import React, { Component } from "react";
import { Button, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, FlatList, StatusBar } from "react-native";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title, id }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.textStyle}>{id}</Text>
  </View>
);

class Exercises extends Component {
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

  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    const renderItem = ({ item }) => (
      <Item title={item.title}
        id={item.id}
      />
    );

    return (
      <View style={styles.centeredView}>
        <Button
          title="SAVE PROFILE"
          onPress={() => { console.log("get from SERVER"); }}
        />
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Exercises</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Let's get to work!</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Record your exercises below</Text>


        <View style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>




        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Exercise Details</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Exercise Name</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                // defaultValue={"123"}
                onChangeText={(text) => { console.log(text) }} />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Duration (minutes)</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                // defaultValue={"123"}
                onChangeText={(text) => { console.log(text) }} />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Calories Burnt</Text>
              <TextInput style={styles.input} placeholder="Enter an input"
                // defaultValue={"123"}
                onChangeText={(text) => { console.log(text) }} />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Looks good! Ready to save your work?</Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => { console.log("added exercise"); }}
              >
                <Text style={styles.textStyle}>Save Exercise</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Never Mind</Text>
              </Pressable>
            </View>
          </View>
        </Modal>


        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Add Exercise</Text>
        </Pressable>


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
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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