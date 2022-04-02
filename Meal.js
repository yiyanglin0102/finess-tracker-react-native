import React, { Component } from "react";
import { Button, Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, FlatList, StatusBar } from "react-native";
import Food from './Food';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            id: this.props.id,
            date: this.props.date,
            userProfile: this.props.userProfile,
            accesscode: this.props.accesscode,
            modalVisible: false,
            foodDetails: [],
            // calories: 0,
            // carbohydrates: 0,
            // fat: 0,
            // protein: 0,
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

    async foodsOfMeal() {
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
            let response = await fetch('https://cs571.cs.wisc.edu/meals/' + this.state.id + '/foods', requestOptions)
            let res = await response.text();
            // console.log(res);
            let { foods } = JSON.parse(res);
            // console.log(foods);

            this.setState({
                foodDetails: foods,
            });
        } catch (err) {
            // console.log(err);
        }
    };



    render() {

        const renderItem = ({ item }) => (
            <Food
                id={item.id}
                name={item.name}
                calories={item.calories}
                carbohydrates={item.carbohydrates}
                fat={item.fat}
                protein={item.protein}
            />
        );

        return (
            <View style={styles.item}>
                <Text style={styles.title}>Food Name: {this.state.name}</Text>
                <Text style={styles.title}>ID: {this.state.id}</Text>
                <Text style={styles.title}>Date: {this.setDate(this.state.date.toLocaleString('en-US', { timeZone: 'America/Chicago' }))}</Text>
                <Button
                    title="Show All Foods"
                    onPress={async () => {
                        await this.setModalVisible(true);
                        await this.foodsOfMeal();
                        await console.log(this.state.foodDetails);
                    }}
                />
                <Button
                    title="Delete"
                    onPress={() => {
                        this.props.deleteMeal(this.state.id);
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
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Food Details</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Food Name</Text>
                            <View style={styles.container}>
                                <FlatList
                                    data={this.state.foodDetails}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                            <Button
                                title="Add"
                                onPress={() => {
                                    // this.setState({ modalVisible: !this.state.modalVisible }
                                }}
                            />
                            <Button
                                title="Close"
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