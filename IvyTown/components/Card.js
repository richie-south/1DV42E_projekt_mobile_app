'use strict';

import React, {
    Component,
    Text,
    Image,
    View,
    TouchableNativeFeedback
} from 'react-native';

import styles from '../styles/MyCardsStyle';

export default class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statsView: false
        };
    }

    render(card) {
        /*

        How to fix this?
        Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the undefined component.


        const onCardPress = (card) => {
            console.log('hej');
            switch (this.state.statsView) {
                case true:
                    this.setState({statsView: false});
                    break;
                case false:
                    this.setState({statsView: true});
                    break;
                default:
            }
        };*/
        const onCardPress = (card) => {
            console.log(card);
        };

        if(this.state.statsView){
            return (
                <TouchableNativeFeedback
                    onPress={onCardPress.bind(null, this.props.card)}
                    background={TouchableNativeFeedback.SelectableBackground()}>

                    <View style={styles.card} >
                        <Text>bajs</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }

        return (
            <TouchableNativeFeedback
                onPress={onCardPress.bind(null, this.props.card)}
                background={TouchableNativeFeedback.SelectableBackground()}>

                <View style={styles.card} >
                  <Image
                    source={{uri: this.props.card.avatar}}
                    style={styles.thumbnail}
                  />
                  <View style={styles.rightContainer}>
                    <Text style={styles.name}>{this.props.card.name}</Text>
                    <View>
                        <Text style={styles.statsProperty}>Attack: {this.props.card.stats.attack}</Text>
                        <Text style={styles.statsProperty}>Block: {this.props.card.stats.block}</Text>
                        <Text style={styles.statsProperty}>Heal: {this.props.card.stats.heal}</Text>
                    </View>
                  </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
