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

    getBorderRadius(bottom, reverse){
        if(bottom && reverse){
            return {
                bottom: -34,
                left:30,
                borderBottomLeftRadius: 44,
                borderBottomRightRadius: 44,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 44,
            };
       } else if(bottom){
           return {
              bottom: -34,
              right:30,
              borderBottomLeftRadius: 44,
              borderBottomRightRadius: 44,
              borderTopLeftRadius: 44,
              borderTopRightRadius: 0,
          };
       } else if(!bottom && !reverse){
           return {
               top: -34,
               right:30,
               borderBottomLeftRadius: 44,
               borderBottomRightRadius: 0,
               borderTopLeftRadius: 44,
               borderTopRightRadius: 44,
           };
       } else if(!bottom && reverse){
           return {
               top: -34,
               left:30,
               borderBottomLeftRadius: 0,
               borderBottomRightRadius: 44,
               borderTopLeftRadius: 44,
               borderTopRightRadius: 44,
           };
       }
    }

    doRender(beforeType, childType){
        if(beforeType[0] === 0 && childType === 1){
            return true;
        }
        if(beforeType.length > 1 && beforeType[1] === 0 && childType === 1){
            return true;
        }
        return false;
    }

    renderNone(){
        return (<View>
                {this.props.children}
            </View>);
    }

    render() {
        if(Array.isArray(this.props.doRender) &&
            ((this.props.doRender[0] === true || this.props.doRender[0] === false) ||
            (this.props.doRender[1] === true || this.props.doRender[1] === false)) &&
            !this.doRender(this.props.cardBeforeType, this.props.childCardType)){
                return this.renderNone();
        }

        return (
            <View>
                {this.isTop(this.props.bottom)}
                <View style={[styles.notificationBoubble, this.getBorderRadius(this.props.bottom, this.props.reverse), this.getWidth(this.props.widthMode), { backgroundColor: this.props.color }]}>
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
                    <Text key={i} style={styles.notificationBoubbleText}>{stats[i]}</Text>);
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
