import React, { Component } from "react";
import { DatePickerIOS, Button, Alert, Modal, StyleSheet, Text, View, TextInput, StatusBar } from "react-native";

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            mealId: this.props.mealId,
            id: this.props.id,
            calories: this.props.calories,
            carbohydrates: this.props.carbohydrates,
            fat: this.props.fat,
            protein: this.props.protein,
            modalVisible: false,

            // userProfile: this.props.userProfile,
            accesscode: this.props.accesscode,
            editName: this.props.name,
            editCalories: this.props.calories,
            editCarbohydrates: this.props.carbohydrates,
            editFat: this.props.fat,
            editProtein: this.props.protein,

        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    async deleteFood(mealId, foodId) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-access-token", this.state.accesscode);
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };
        try {
            let response = await fetch('https://cs571.cs.wisc.edu/meals/' + mealId + '/foods/' + foodId, requestOptions)
            let res = await response.text();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
        // this.allActivities();
    }

    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>Name: {this.state.name}</Text>
                <Text style={styles.title}>ID: {this.state.id}</Text>
                <Text style={styles.title}>Calories: {this.state.calories}</Text>
                <Text style={styles.title}>Carbohydrates: {this.state.carbohydrates}</Text>
                <Text style={styles.title}>Fat: {this.state.fat}</Text>
                <Text style={styles.title}>Protein: {this.state.protein}</Text>
                <Button
                    title="Edit"
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                />
                <Button
                    title="Delete"
                    onPress={() => {
                        console.log("delete meal " + this.state.mealId);
                        console.log("delete food " + this.state.id);
                        this.props.deleteFood(this.state.mealId, this.state.id);
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
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Food Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter an input"
                                defaultValue={this.state.name.toString()}
                                onChangeText={(text) => {
                                    this.setState({ editName: text });
                                }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Calories</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter an input"
                                defaultValue={this.state.calories.toString()}
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    this.setState({ editCalories: Number(text) });
                                }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Carbohydrates</Text>
                            <TextInput
                                style={styles.input}
                                defaultValue={this.state.carbohydrates.toString()}
                                placeholder="Enter an input"
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    this.setState({ editCarbohydrates: Number(text) });
                                }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Fat</Text>
                            <TextInput
                                style={styles.input}
                                defaultValue={this.state.fat.toString()}
                                placeholder="Enter an input"
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    this.setState({ editFat: Number(text) });
                                }} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Protein</Text>
                            <TextInput
                                style={styles.input}
                                defaultValue={this.state.protein.toString()}
                                placeholder="Enter an input"
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    this.setState({ editProtein: Number(text) });
                                }} />
                            <Button
                                title="Save Food"
                                onPress={async () => {
                                    // var date = await new Date();
                                    // var json = await date.toISOString(); // date.toISOString
                                    // await this.setState({ date: json });


                                    await this.setState({ name: this.state.editName });
                                    await this.setState({ calories: this.state.editCalories });
                                    await this.setState({ carbohydrates: this.state.editCarbohydrates });
                                    await this.setState({ fat: this.state.editFat });
                                    await this.setState({ protein: this.state.editProtein });


                                    // connect to api
                                    await this.props.editFoodinMeal(this.state.mealId, this.state.id, this.state.name, this.state.calories, this.state.carbohydrates, this.state.fat, this.state.protein);
                                    await this.setState({ modalVisible: !this.state.modalVisible })
                                    await Alert.alert(
                                        "Edit",
                                        "Food updated!",
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

export default Food;
