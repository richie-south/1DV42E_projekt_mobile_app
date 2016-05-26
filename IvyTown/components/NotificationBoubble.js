'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';
import styles from '../styles/ChallangeViewStyle';
import * as Animatable from 'react-native-animatable';

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

    /**
     * [returns width of boubble, large or normal]
     * @param  {[string]} mode [large to set it to large]
     * @return {[object]}      [object to be used as react style]
     */
    getWidth(mode){
        return mode === 'large' ?
            { width: 90 }:
            { width: 46 };
    }

    /**
     * [determines position of Notification boubble]
     * @param  {[bool]} bottom  [if notification should be bottom]
     * @param  {[bool]} reverse [if notification should be reversed default boubble left]
     * @return {[object]}       [react style object]
     */
    getPosition(bottom, reverse){
        if(bottom && reverse){
            return styles.notificationBottomReverse;
       } else if(bottom){
            return styles.notificationBottom;
       } else if(!bottom && !reverse){
            return styles.notificationTop;
       } else if(!bottom && reverse){
            return styles.notificationTopReverse;
       }
    }

    /**
     * [determines if notification boubble should be renderd on screen]
     * @param  {[number]} beforeType [type if card notification boubble has ahead in render list]
     * @param  {[number]} childType  [type if card notification boubble has as child]
     * @return {[bool]}            [true or false if render]
     */
    doRender(beforeType, childType){
        if(beforeType[0] === 0 && childType === 1){
            return true;
        }
        if(beforeType.length > 1 && beforeType[1] === 0 && childType === 1){
            return true;
        }
        return false;
    }

    /**
     * [renders only child components and not a notification boubble]
     * @return {[react childs]} [only children]
     */
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

        return (<View>
            {this.isTop(this.props.bottom)}
            <View style={[styles.notificationBoubble, this.getPosition(this.props.bottom, this.props.reverse), this.getWidth(this.props.widthMode), { backgroundColor: this.props.color }]}>
                {this.isMultible(this.props.type, this.props.stats)}
            </View>
            {this.isBottom(this.props.bottom)}
        </View>);
    }

    /**
     * [determines if there should be multible items in notification boubble]
     * @param  {[array]}  types [multible typs of numbers representing heal, sword, block]
     * @param  {[array]}  stats [stat of type]
     * @return {component}      [notification component]
     */
    isMultible(types, stats){
        if(types.length > 1 && stats.length > 1){
            let info = [];
            for (let i = 0; i < types.length; i++) {
                info.push(
                    <Text key={i} style={styles.notificationBoubbleText}>{stats[i]}</Text>);
                    info.push(React.cloneElement(type[i], {key: i+'image'} ));
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
