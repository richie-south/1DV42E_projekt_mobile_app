'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/ChallangeViewStyle';
import config from '../config';

const type = [
    (<Image
        source={require('../images/sword_icon.png')}
        style={[styles.cardImage, {tintColor: 'rgba(99, 99, 99, 1)' }]} />),
    (<Image
        source={require('../images/bottle_icon.png')}
        style={[styles.cardImage, {tintColor: 'rgba(99, 99, 99, 1)' }]} />),
    (<Image
        source={require('../images/shield_icon.png')}
        style={[styles.cardImage, {tintColor: 'rgba(99, 99, 99, 1)' }]} />),
    (<Image
        source={require('../images/x.png')}
        style={[styles.cardImage, {tintColor: 'rgba(99, 99, 99, 1)' }]} />),
];

export default class ChallangeCard extends Component{

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    getCardImage(cardType, isX){
        if(isX || (cardType == undefined && !isX)){
            return type[3];
        }
        return type[cardType];
    }

    hasShaddow(shadow){
        if(shadow){
            return styles.cardElevetion;
        }
        return styles.noStyle;
    }

    getCardCounter(nr){
        if(nr){
            return (<Text style={styles.cardCounter}>{this.props.nr}</Text>);
        }
        return false;
    }

    render() {
        return (
            <View style={[styles.playCard, this.hasShaddow(this.props.shadow)]}>
                {this.getCardCounter(this.props.nr)}
                {this.getCardImage(this.props.type, this.props.renderX)}
            </View>
        );
    }
}
