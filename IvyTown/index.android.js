//'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import {Actions, Scene, Router} from 'react-native-router-flux';
import Login from './pages/Login.android';
import MyCards from './pages/MyCards.android';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

/*class IvyTown extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}*/

class IvyTown extends Component {
    render() {
    return (
        <Router>
            <Scene key="root">
                <Scene key='login' component={Login} title='Login' initial={true} hideNavBar={true}/>
                <Scene key='mycards' component={MyCards} title='Deck' type='reset' />
            </Scene>
        </Router>);
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('IvyTown', () => IvyTown);
