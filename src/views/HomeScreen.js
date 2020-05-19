import React, { Component, useEffect } from 'react'
import { View, Text, Button, StyleSheet, AsyncStorage } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner"

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasPermission: null,
            scanned: false
        };
    }

    async componentDidMount() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        this.setState({hasPermission: status === 'granted'});
    }

    handleBarCodeScanned = ({type, data}) => {
        this.setState({ scanned: true });
        this.props.navigation.navigate('Details', {
            code: data
        })
    };

    render() {
        if (this.state.hasPermission === null) {
            return <Text>Requesting for camera permission</Text>
        }
        if (this.state.hasPermission === false) {
            return <Text>No access to camera</Text>
        }

        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>

                <BarCodeScanner onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
                {this.state.scanned && <Button title={"Tap to scan again"} onPress={() => this.setState({scanned: false})}/>}
            </View>
        )
    }
}