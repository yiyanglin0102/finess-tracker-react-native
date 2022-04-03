import React, { Component, useState } from "react";
import { DatePickerIOS, StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            dateVisible: false,
        };

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
        console.log(this.state.chosenDate);
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Pick Date"
                    onPress={() => this.setState({ dateVisible: !this.state.dateVisible })}
                />
                {this.state.dateVisible && <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});