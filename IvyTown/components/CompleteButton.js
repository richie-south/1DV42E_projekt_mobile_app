'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView, TouchableNativeFeedback} from 'react-native';
import styles from '../styles/ChallangeViewStyle';
import * as Animatable from 'react-native-animatable';

export default class CompleteButton extends Component{

    constructor(props) {
        super(props);
        this.state = {
            btnText: 'Done',
            render: true
        };
    }

    /**
     * [removes button from screen]
     */
    removeBtn(){
        this.setState({
            render: false
        });
    }

    /**
     * [if complete button should be renderd on screen]
     * @param  {[array]} array [array of bools]
     * @return {[bool]}       [true/false]
     */
    doRender(array){
        const isTrue = array.filter(a => a);
        return isTrue.length === array.length;
    }

    render() {
        if(!this.doRender(this.props.doRender) || !this.state.render){
            return false;
        }

        return (
            <TouchableNativeFeedback
                onPress={() => {
                    this.removeBtn();
                    this.props.onClick();
                }}>

                <View style={styles.doneButton}>
                    <Text style={styles.doneButtonText}>{this.state.btnText}</Text>
                </View>
            </TouchableNativeFeedback>

        );
    }
}
