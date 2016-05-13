'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';

import { Actions } from 'react-native-router-flux';
import ChallangeCard from '../components/ChallangeCard';
import styles from '../styles/ChallangeViewStyle';

import config from '../config';


export default class MyCards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentWillMount() {
        this.props.data
            .emit('lobby', { test: true, mes: 'in challange room' });
    }

    render() {

        return (
            <View>
                <ChallangeCard textNr={4} placedCard={false} cardType={0}/>
            </View>
        );
    }

    renderLoadingView() {
      return (
        <View>
          <Text>
              Loading your cards...
          </Text>
        </View>
      );
    }


}
