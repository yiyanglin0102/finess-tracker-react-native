import React, { Component } from "react";
import { Button, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, FlatList, StatusBar } from "react-native";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            name: this.props.name,
            id: this.props.id,
            calories: this.props.calories,
            date: this.props.date,
            duration: this.props.duration,
            userProfile: this.props.userProfile,
            accesscode: this.props.accesscode,
            modalVisible: false,
            editName: this.props.name,
            editDuration: this.props.duration,
            editCaloriesBurnt: this.props.calories,
        }
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>Name: {this.state.name}</Text>
                <Text style={styles.title}>ID: {this.state.id}</Text>
                <Text style={styles.title}>Calories: {this.state.calories}</Text>
                <Text style={styles.title}>Duration: {this.state.duration}</Text>
                <Text style={styles.title}>Date: {new Date(this.state.date).toString()}</Text>
                <Button
                    title="Edit"
                    onPress={() => {
                        this.setModalVisible(true);
                        console.log(this.state.userProfile.username);
                        console.log("edit " + this.state.id);
                    }}
                />
                <Button
                    title="Delete"
                    onPress={() => {
                        this.props.deleteActivity(this.state.id);
                        console.log(this.state.userProfile.username);
                        console.log("delete " + this.state.id);
                    }}
                />
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
                            <TextInput
                                style={styles.input}
                                placeholder="Enter an input"
                                defaultValue={this.state.name}
                                onChangeText={(text) => {
                                    this.setState({ editName: text });
                                    // console.log(this.state.name);
                                }} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Duration (minutes)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter an input"
                                defaultValue={this.state.duration}
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    this.setState({ editDuration: Number(text) });
                                    // console.log(this.state.duration);
                                }} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Calories Burnt</Text>
                            <TextInput
                                style={styles.input}
                                defaultValue={this.state.calories}
                                placeholder="Enter an input"
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    this.setState({ editCaloriesBurnt: Number(text) });
                                    // console.log(this.state.calories);
                                }} />
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Looks good! Ready to save your work?</Text>

                            <Button
                                title="Save Exercise"
                                onPress={async () => {
                                    var date = await new Date();
                                    // await console.log(date); // Thu Nov 07 2019 11:58:58 GMT-0600 (Central Standard Time)
                                    var json = await JSON.stringify(date); // date.toISOString
                                    // await console.log("97 line date " + json);
                                    await this.setState({ date: json.slice(1, -1) });
                                    await this.setState({ name: this.state.editName });
                                    await this.setState({ duration: this.state.editDuration });
                                    await this.setState({ calories: this.state.editCaloriesBurnt });

                                    // await console.log("---- form ---- ");
                                    // await console.log("editName: " + this.state.name);
                                    // await console.log("editDuration: " + this.state.duration);
                                    // await console.log("editCarBurnt: " + this.state.calories);
                                    // await console.log("editDate: " + this.state.date);
                                    this.props.editActivity(this.state.id, this.state.name, this.state.calories, this.state.duration, this.state.date);
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


            </View>
        )
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

export default Item;
