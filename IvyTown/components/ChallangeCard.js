'use strict';


import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';

import { Actions } from 'react-native-router-flux';

import config from '../config';

const healCard = 0;
const attackCard = 1;
const blockCard = 2;

export default class MyCards extends Component{
    constructor(props) {
        super(props);

    }

    componentWillMount() {
    }

    getTypeOfCard(){

    }

    render() {
        let Card;
        
        if(this.props.placedCard){
            Card = this.renderPlacedCard();
        }else{
            Card = this.renderStatsCard();
        }

        return (
            <Card />
        );
    }

    renderStatsCard(type){
        return (
            <View>
                <Text>{this.props.textNr}</Text>
                <Image />
            </View>
        );
    }

    renderPlacedCard(){

    }
}
