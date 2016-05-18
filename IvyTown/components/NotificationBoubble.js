'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';
import styles from '../styles/ChallangeViewStyle';

const type = [
    (<Image
        source={require('../images/bottle_icon.png')}
        style={[styles.notificationImage, {tintColor: 'rgba(255, 255, 255, 1)' }]} />),
    (<Image
        source={require('../images/sword_icon.png')}
        style={[styles.notificationImage, {tintColor: 'rgba(255, 255, 255, 1)' }]} />),
    (<Image
        source={require('../images/shield_icon.png')}
        style={[styles.notificationImage, {tintColor: 'rgba(255, 255, 255, 1)' }]} />),
];

export default class NotificationBoubble extends Component{

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    getWidth(mode){
        return mode === 'large' ?
            { width: 90 }:
            { width: 46 };
    }

    getBorderRadius(bottom){
        return bottom ? {
            bottom: -34,
            right:30,
            borderBottomLeftRadius: 44,
            borderBottomRightRadius: 44,
            borderTopLeftRadius: 44,
            borderTopRightRadius: 0,
        }: {
            top: -34,
            right:30,
            borderBottomLeftRadius: 44,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 44,
            borderTopRightRadius: 44,
        };
    }

    render() {
        return (
            <View>
                {this.isTop(this.props.bottom)}
                <View style={[styles.notificationBoubble, this.getBorderRadius(this.props.bottom), this.getWidth(this.props.widthMode), { backgroundColor: this.props.color }]}>
                    {this.isMultible(this.props.type, this.props.stats)}

                </View>
                {this.isBottom(this.props.bottom)}
            </View>
        );
    }

    isMultible(types, stats){
        if(types.length > 1 && stats.length > 1){
            let info = [];
            for (let i = 0; i < types.length; i++) {
                info.push(
                    <Text style={styles.notificationBoubbleText}>{stats[i]}</Text>);
                info.push(type[i]);
            }

            return (<View style={styles.notificationInfo}>
                {info}
            </View>);
        }

        return (
            <View style={styles.notificationInfo}>
                <Text style={styles.notificationBoubbleText}>{stats[0]}</Text>
                {type[types[0]]}
            </View>
        );
    }

    isBottom(bottom){
        return bottom ?
            false :
            (<View>{ this.props.children }</View>);
    }

    isTop(bottom){
        return bottom ?
            (<View>{ this.props.children }</View>) :
            false;
    }
}
