'use strict';

import React, {Component} from 'react';
import {AppRegistry, Text, Image, View, TouchableNativeFeedback} from 'react-native';

import styles from '../styles/MyCardsStyle';
import CardStats from './card/CardStats';

export default class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statsView: false
        };
    }

    render() {
        return (
            <View style={[styles.card, {backgroundColor: this.props.card.backgroundCardImg}]} >
              <Image
                source={{uri: this.props.card.avatar}}
                style={styles.thumbnail}
              />
              <View style={styles.rightContainer}>
                <Text style={styles.name}>{this.props.card.name}</Text>
                {this.renderCardBottomPart()}
              </View>
            </View>
        );
    }

    renderCardBottomPart(){
        return (<View>

            <View style={styles.statsWrap}>
                <Image
                    source={require('../images/sword_icon.png')}
                    style={[styles.statsImage, {tintColor: 'rgba(255,255,255, 0.54)' }]} />
                <CardStats type={'attack'} stats={this.props.card.stats.attack} />
            </View>

            <View style={styles.statsWrap}>
                <Image
                    source={require('../images/bottle_icon.png')}
                    style={[styles.statsImage, {tintColor: 'rgba(255,255,255, 0.54)' }]} />
                <CardStats type={'heal'} stats={this.props.card.stats.heal} />
            </View>

            <View style={styles.statsWrap}>
                <Image
                    source={require('../images/shield_icon.png')}
                    style={[styles.statsImage, {tintColor: 'rgba(255,255,255, 0.54)' }]} />
                <CardStats type={'block'} stats={this.props.card.stats.block} />
            </View>

        </View>);
    }
}
