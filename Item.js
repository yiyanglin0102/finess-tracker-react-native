import React, { Component } from "react";
import { Button, Alert, Modal, StyleSheet, Text, View, TextInput, StatusBar } from "react-native";

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

    setDate(date) {
        var d = new Date(date);
        var dateString = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + " " +
            d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        return dateString;
    }

    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>Name: {this.state.name}</Text>
                <Text style={styles.title}>ID: {this.state.id}</Text>
                <Text style={styles.title}>Calories: {this.state.calories}</Text>
                <Text style={styles.title}>Duration: {this.state.duration}</Text>
                {/* <Text style={styles.title}>Date: {new Date(this.state.date).toString()}</Text> */}
                <Text style={styles.title}>Date: {this.setDate(this.state.date.toLocaleString('en-US', { timeZone: 'America/Chicago' }))}</Text>

                <Button
                    title="Edit"
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                />
                <Button
                    title="Delete"
                    onPress={() => {
                        this.props.deleteActivity(this.state.id);
                        console.log(this.state.userProfile.username);
                        console.log("delete " + this.state.id);
                        Alert.alert(
                            "Delete",
                            "Exercise deleted!",
                            [
                                { text: "OK" }
                            ]
                        )
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Exercise Details</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Exercise Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter an input"
                                defaultValue={this.state.name.toString()}
                                onChangeText={(text) => {
                                    this.setState({ editName: text });
                                }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Duration (minutes)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter an input"
                                defaultValue={this.state.duration.toString()}
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    this.setState({ editDuration: Number(text) });
                                }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Calories Burnt</Text>
                            <TextInput
                                style={styles.input}
                                defaultValue={this.state.calories.toString()}
                                placeholder="Enter an input"
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    this.setState({ editCaloriesBurnt: Number(text) });
                                }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Looks good! Ready to save your work?</Text>

                            <Button
                                title="Save Exercise"
                                onPress={async () => {
                                    var date = await new Date();
                                    var json = await date.toISOString(); // date.toISOString
                                    console.log("computer" + json);
                                    await this.setState({ date: json });
                                    await this.setState({ name: this.state.editName });
                                    await this.setState({ duration: this.state.editDuration });
                                    await this.setState({ calories: this.state.editCaloriesBurnt });
                                    await this.props.editActivity(this.state.id, this.state.name, this.state.calories, this.state.duration, this.state.date);
                                    await this.setState({ modalVisible: !this.state.modalVisible })
                                    await Alert.alert(
                                        "Edit",
                                        "Exercise updated!",
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
        backgroundColor: '#f0c07e',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
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

export default Item;
