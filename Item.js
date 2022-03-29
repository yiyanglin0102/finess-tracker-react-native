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
        }
    }


    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>Name: {this.state.name}</Text>
                <Text style={styles.title}>ID: {this.state.id}</Text>
                <Text style={styles.title}>Calories: {this.state.calories}</Text>
                <Text style={styles.title}>Duration: {this.state.duration}</Text>
                <Text style={styles.title}>Date: {this.state.date}</Text>
                <Button
                    title="Edit"
                    onPress={() => {
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
            </View>
        )
    }
}



// const Item = ({ name, id, calories, date, duration, userProfile, accesscode, update }) => (
//     <View style={styles.item}>
//         <Text style={styles.title}>Name: {name}</Text>
//         <Text style={styles.title}>ID: {id}</Text>
//         <Text style={styles.title}>Calories: {calories}</Text>
//         <Text style={styles.title}>Duration: {duration}</Text>
//         <Text style={styles.title}>Date: {date}</Text>
//         <Button
//             title="Edit"
//             onPress={() => {
//                 console.log(userProfile.username);
//                 console.log("edit " + id);
//             }}
//         />
//         <Button
//             title="Delete"
//             onPress={() => {
//                 deleteActivity(userProfile.username, id, accesscode);
//                 update();
//                 console.log(userProfile.username);
//                 console.log("delete " + id);
//             }}
//         />
//     </View>
// );


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
