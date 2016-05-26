'use strict';

import React, {Component} from 'react';
import {Text, Image, View, TouchableNativeFeedback} from 'react-native';

import * as Animatable from 'react-native-animatable';
import styles from '../styles/MyCardsStyle';
import Card from './Card';

export default class CardView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            btnPresed: false,
            btnColor: '#FFFFFF',
            btnText: 'Add to lobby'
        };
    }

    press(add, remove, card){
        this.refs.view.swing(500);
        if(!this.state.btnPresed){
            this.setState({
                btnPresed: true,
                btnText: 'Remove',
                btnColor: '#000000'
            });
            add(card);
        }else{
            this.setState({
                btnPresed: false,
                btnText: 'Add to lobby',
                btnColor: '#FFFFFF'
            });
            remove(card);
        }
    }

    viewPastOwnerPress(card){
        this.props.onPressViewOwners(card);
    }

    render() {
        return (
            <View style={styles.cardViewWrap}>
                <View>
                    <Card card={this.props.card} />
                </View>

                <Animatable.View ref="view">


                <View style={[styles.settings, {backgroundColor: this.props.card.backgroundCardImg }]}>

                    <TouchableNativeFeedback
                       onPress={this.press.bind(this, this.props.onPressAddToLobby, this.props.onPressRemoveFromLobby, this.props.card)}
                       background={TouchableNativeFeedback.SelectableBackground()}>

                       <View style={styles.buttonWrap}>
                         <Text style={[styles.buttonText, {color: this.state.btnColor}]}>{this.state.btnText}</Text>
                       </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                      onPress={this.viewPastOwnerPress.bind(this, this.props.card)}
                      background={TouchableNativeFeedback.SelectableBackground()}>

                      <View style={styles.buttonWrap}>
                        <Text style={styles.buttonText}>Past owners</Text>
                      </View>
                    </TouchableNativeFeedback>

                </View>
                </Animatable.View>
            </View>
        );
    }
}
