'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView, TouchableWithoutFeedback} from 'react-native';
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
        return shadow ? styles.cardElevetion : styles.noStyle;
    }

    hasMargin(margin){
        return margin ? { margin } : styles.noStyle ;
    }

    getCardCounter(nr){
        if(nr){
            return (<Text style={styles.cardCounter}>{this.props.nr}</Text>);
        }
        return false;
    }

    render() {
        if(!this.props.render){
            return false;
        }
        if(this.props.onClick){
            return this.doRenderWithClick();
        }
        return this.doRender();
    }

    doRenderWithClick(){
        return (
            <TouchableWithoutFeedback onPress={() => this.props.onClick(this.props.type)}>
                {this.doRender()}
            </TouchableWithoutFeedback>
        );
    }

    doRender(){
        return (
            <View style={[styles.playCard, this.hasShaddow(this.props.shadow), this.hasMargin(this.props.margin)]}>
                {this.getCardCounter(this.props.nr)}
                {this.getCardImage(this.props.type, this.props.renderX)}
            </View>
        );
    }
}
