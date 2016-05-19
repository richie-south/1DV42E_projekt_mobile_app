'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';
import styles from '../styles/ChallangeViewStyle';

export default class LifeMeter extends Component{

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    renderHeight(max, life){
        const height = (1 - ((max - life) / max )) * 170 ;
        return {
            height
        };
    }

    render() {

        return (
            <View style={styles.lifeMeterWrap}>
                <View style={[styles.lifeMeter, this.renderHeight(this.props.maxLife, this.props.life)]}>
                    <Text style={styles.lifeHp}>{this.props.life}hp</Text>
                </View>
            </View>
        );
    }
}
