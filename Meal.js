import React, { Component } from "react";
import { DatePickerIOS, Button, Alert, Modal, StyleSheet, Text, View, TextInput, FlatList, StatusBar } from "react-native";
import Food from './Food';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            mealId: this.props.id,
            date: this.props.date,
            userProfile: this.props.userProfile,
            accesscode: this.props.accesscode,
            modalVisible: false,
            modalVisible1: false,
            modalVisible2: false,
            foodDetails: [],
            addName: 0,
            addCalories: 0,
            addCarbohydrates: 0,
            addFat: 0,
            addProtein: 0,
            chosenDate: new Date(),
            dateVisible: false,
            totalCalories: 0,
            totalCarbohydrates: 0,
            totalFat: 0,
            totalProtein: 0,
        }
        this.setDate = this.setDate.bind(this);
        this.deleteFood = this.deleteFood.bind(this);
        this.editFoodinMeal = this.editFoodinMeal.bind(this);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        // this.getFoodsOfMeal();
        console.log(this.state.chosenDate);
        console.log(this.state.mealId);
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

    async getFoodsOfMeal() {
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
            let response = await fetch('https://cs571.cs.wisc.edu/meals/' + this.state.mealId + '/foods', requestOptions)
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

    async addFoodsOfMeal() {
        var raw = JSON.stringify({
            name: this.state.addName,
            protein: this.state.addProtein,
            fat: this.state.addFat,
            carbohydrates: this.state.addCarbohydrates,
            calories: this.state.addCalories,
        });
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-access-token", this.state.accesscode);
        var requestOptions = {
            method: 'POST',
            body: raw,
            headers: myHeaders,
            redirect: 'follow'
        };

        try {
            let response = await fetch('https://cs571.cs.wisc.edu/meals/' + this.state.mealId + '/foods', requestOptions)
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
        this.getFoodsOfMeal();
    };

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
        this.getFoodsOfMeal();
    }

    async editFoodinMeal(mealId, foodId, name, calories, carbohydrates, fat, protein) {
        var requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.accesscode,
            },
            body: JSON.stringify({
                name: name,
                calories: calories,
                carbohydrates: carbohydrates,
                fat: fat,
                protein: protein,
            }),
        };
        await fetch('https://cs571.cs.wisc.edu/meals/' + mealId + '/foods/' + foodId, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        await this.getFoodsOfMeal();
    }

    async editMealDate() {
        var requestOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.accesscode,
            },
            body: JSON.stringify({
                date: this.state.chosenDate
            }),
        };
        await fetch('https://cs571.cs.wisc.edu/meals/' + this.state.mealId, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        this.setState({ date: this.state.chosenDate });
        await this.getFoodsOfMeal();
    }
    showTotal() {
        const caloriesSum = this.state.foodDetails.map(item => item.calories).reduce((prev, curr) => prev + curr, 0);
        this.setState({ totalCalories: caloriesSum });
        const carbohydratesSum = this.state.foodDetails.map(item => item.carbohydrates).reduce((prev, curr) => prev + curr, 0);
        this.setState({ totalCarbohydrates: carbohydratesSum });
        const fatSum = this.state.foodDetails.map(item => item.fat).reduce((prev, curr) => prev + curr, 0);
        this.setState({ totalFat: fatSum });
        const proteinSum = this.state.foodDetails.map(item => item.protein).reduce((prev, curr) => prev + curr, 0);
        this.setState({ totalProtein: proteinSum });
    }
    render() {

        const renderItem = ({ item }) => (
            <Food
                id={item.id}
                mealId={this.state.mealId}
                name={item.name}
                calories={item.calories}
                carbohydrates={item.carbohydrates}
                fat={item.fat}
                protein={item.protein}
                accesscode={this.state.accesscode}
                deleteFood={this.deleteFood}
                editFoodinMeal={this.editFoodinMeal}
            />
        );

        return (
            <View style={styles.item}>
                <Text style={styles.title}>Name: {this.state.name}</Text>
                <Text style={styles.title}>ID: {this.state.mealId}</Text>
                <Text style={styles.title}>Date: {this.setDate(this.state.date.toLocaleString('en-US', { timeZone: 'America/Chicago' }))}</Text>
                <View style={styles.container}>
                    <Button
                        title={this.state.dateVisible ? "Collapse" : "Change Date"}
                        onPress={() => this.setState({ dateVisible: !this.state.dateVisible })}
                    />
                    {this.state.dateVisible && <DatePickerIOS
                        date={this.state.chosenDate}
                        onDateChange={async (date) => {
                            await this.setState({ chosenDate: date });
                            await this.editMealDate();
                        }}
                    />}
                </View>
                <Button
                    title="Show All Foods"
                    onPress={async () => {
                        await this.setModalVisible(true);
                        await this.getFoodsOfMeal();
                        await console.log(this.state.foodDetails);
                    }}
                />
                <Button
                    title="Delete"
                    onPress={() => {
                        this.props.deleteMeal(this.state.mealId);
                        console.log(this.state.userProfile.username);
                        console.log("delete " + this.state.mealId);
                        Alert.alert(
                            "Delete",
                            "Meal deleted!",
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
                            <Button
                                title="Total Consumption"
                                onPress={() => {
                                    this.showTotal();
                                    this.setState({ modalVisible2: !this.state.modalVisible2 });
                                }}
                            />
                            <Modal
                                animationType="fade"
                                visible={this.state.modalVisible2}
                                onRequestClose={() => {
                                    this.setModalVisible(!modalVisible2);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total Consumption</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Calories</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.state.totalCalories}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Carbohydrates</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.state.totalCarbohydrates}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Fat</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.state.totalFat}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Protein</Text>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{this.state.totalProtein}</Text>
                                        <Button
                                            title="Close"
                                            onPress={() => {
                                                this.setState({ modalVisible2: !this.state.modalVisible2 });
                                            }}
                                        />
                                    </View>
                                </View>
                            </Modal>
                            <View style={styles.container}>
                                <FlatList
                                    data={this.state.foodDetails}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                            {/* add blank food */}
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.modalVisible1}
                                onRequestClose={() => {
                                    this.setModalVisible(!modalVisible1);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Food Name</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter an input"
                                            onChangeText={(text) => {
                                                this.setState({ addName: text });
                                            }} />
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Calories</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter an input"
                                            keyboardType='numeric'
                                            onChangeText={(text) => {
                                                this.setState({ addCalories: Number(text) });
                                            }} />
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Carbohydrates</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter an input"
                                            keyboardType='numeric'
                                            onChangeText={(text) => {
                                                this.setState({ addCarbohydrates: Number(text) });
                                            }} />
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Fat</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter an input"
                                            keyboardType='numeric'
                                            onChangeText={(text) => {
                                                this.setState({ addFat: Number(text) });
                                            }} />
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Protein</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter an input"
                                            keyboardType='numeric'
                                            onChangeText={(text) => {
                                                this.setState({ addProtein: Number(text) });
                                            }} />

                                        <Button
                                            title="Add Food"
                                            onPress={async () => {
                                                // var date = await new Date();
                                                // var json = await date.toISOString(); // date.toISOString
                                                // await this.setState({ date: json });

                                                await this.setState({ addName: this.state.addName });
                                                await this.setState({ addCalories: this.state.addCalories });
                                                await this.setState({ addCarbohydrates: this.state.addCarbohydrates });
                                                await this.setState({ addFat: this.state.addFat });
                                                await this.setState({ addProtein: this.state.addProtein });

                                                // connect to api
                                                await this.addFoodsOfMeal();
                                                await this.setState({ modalVisible1: !this.state.modalVisible1 })
                                                await this.setState({ addName: "" });
                                                await this.setState({ addCalories: 0 });
                                                await this.setState({ addCarbohydrates: 0 });
                                                await this.setState({ addFat: 0 });
                                                await this.setState({ addProtein: 0 });

                                                await Alert.alert(
                                                    "Add",
                                                    "Food Added!",
                                                    [
                                                        { text: "OK" }
                                                    ]
                                                )
                                            }}
                                        />
                                        <Button
                                            title="Never Mind"
                                            onPress={() => this.setState({ modalVisible1: !this.state.modalVisible1 })}
                                        />
                                    </View>
                                </View>
                            </Modal>
                            <Button
                                title="Add"
                                onPress={() => {
                                    console.log(this.state.mealId);
                                    this.setState({ modalVisible1: !this.state.modalVisible1 });
                                    // this.addFoodsOfMeal();
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
