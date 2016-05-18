'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/ChallangeViewStyle';
import config from '../config';

export default class PlaceholderCard extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.placeholderCard}>
                <View style={styles.placeholderImageWrap}>
                    <Image
                        source={require('../images/sword_icon.png')}
                        style={[styles.placeholderImage, {tintColor: 'rgba(99, 99, 99, 0.54)' }]} />

                    <Image
                        source={require('../images/bottle_icon.png')}
                        style={[styles.placeholderImage, {tintColor: 'rgba(99, 99, 99, 0.54)' }]} />

                    <Image
                        source={require('../images/shield_icon.png')}
                        style={[styles.placeholderImage, {tintColor: 'rgba(99, 99, 99, 0.54)' }]} />

                </View>

                <View style={styles.cardInPlaceholder}>{this.props.children}</View>
            </View>
        );
    }
}
