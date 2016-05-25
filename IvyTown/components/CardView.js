'use strict';

import React, {Component} from 'react';
import {Text, Image, View, TouchableNativeFeedback} from 'react-native';

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
            <View style={styles.cardViewWrap2}>
                <View>
                    <Card card={this.props.card} />
                </View>

                <View style={[styles.settings2, {backgroundColor: this.props.card.backgroundCardImg }]}>

                    <TouchableNativeFeedback
                       onPress={this.press.bind(this, this.props.onPressAddToLobby, this.props.onPressRemoveFromLobby, this.props.card)}
                       background={TouchableNativeFeedback.SelectableBackground()}>

                       <View style={styles.buttonWrap2}>
                         <Text style={[styles.buttonText2, {color: this.state.btnColor}]}>{this.state.btnText}</Text>
                       </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                      onPress={this.viewPastOwnerPress.bind(this, this.props.card)}
                      background={TouchableNativeFeedback.SelectableBackground()}>

                      <View style={styles.buttonWrap2}>
                        <Text style={styles.buttonText2}>Past owners</Text>
                      </View>
                    </TouchableNativeFeedback>

                </View>

            </View>
        );
    }
}
