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

export default class CardView extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={styles.cardViewWrap}>
                <View>
                    <Card card={this.props.card} />
                </View>
                <View style={styles.settings}>

                    <TouchableNativeFeedback
                       onPress={this.props.onPressAddToLobby.bind(null, this.props.card)}
                       background={TouchableNativeFeedback.SelectableBackground()}>

                       <View style={styles.buttonWrap}>
                         <Text style={styles.buttonText}>Add to lobby</Text>
                       </View>
                   </TouchableNativeFeedback>

                   <TouchableNativeFeedback
                      onPress={this.props.onPressViewOwners.bind(null, this.props.card)}
                      background={TouchableNativeFeedback.SelectableBackground()}>

                      <View style={styles.buttonWrap}>
                        <Text style={styles.buttonText}>Past owners</Text>
                      </View>
                  </TouchableNativeFeedback>

                </View>
            </View>

        );
    }
}
