'use strict';

import {Actions, Scene, Router} from 'react-native-router-flux';
import Login from './pages/Login.android';
import MyCards from './pages/MyCards.android';
import Challange from './pages/Challange.android';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

class IvyTown extends Component {
    render() {
    return (
        <Router>
            <Scene key="root">
                <Scene key='login' component={Login} title='Login' initial={true} hideNavBar={true}/>
                <Scene key='mycards' component={MyCards} title='My Cards' type='reset' hideNavBar={true}/>
                <Scene key='challange' component={Challange} title='Challange' type='reset' hideNavBar={true}/>
            </Scene>
        </Router>);
    }
}

AppRegistry.registerComponent('IvyTown', () => IvyTown);
