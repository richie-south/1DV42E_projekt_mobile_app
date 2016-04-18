'use strict';

import React, {
    Component,
    Text,
    Image,
    View,
    TouchableNativeFeedback
} from 'react-native';

import styles from '../styles/MyCardsStyle';
import Card from './Card';

export default class LobbyCard extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <TouchableNativeFeedback
               onPress={this.props.onPress.bind(null, this.props.card)}
               background={TouchableNativeFeedback.SelectableBackground()}>

               <View style={styles.lobbyCardWrap}>
                   <Card card={this.props.card}></Card>
               </View>

            </TouchableNativeFeedback>
        );
    }
}
