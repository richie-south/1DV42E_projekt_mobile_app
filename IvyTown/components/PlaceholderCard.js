'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import config from '../config';

export default class PlaceholderCard extends Component{
    constructor(props) {
        super(props);

    }

    componentWillMount() {
    }

    getTypeOfCard(){

    }

    render() {
        return (
            <View>
                <Text>Placeholder card</Text>
                {this.props.children}
            </View>
        );
    }
}
