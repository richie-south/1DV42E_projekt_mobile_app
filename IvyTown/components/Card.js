'use strict';

import React, {
    Component,
    Text,
    Image,
    View,
    TouchableNativeFeedback
} from 'react-native';

import styles from '../styles/MyCardsStyle';

class CardStats extends Component{
    constructor(props) {
        super(props);
    }

    getAttackColor(val, nr) {
        if(val >= 40 && nr === 0){
            return '#636363';

        }else if(val >= 42 && nr === 1){
            return '#636363';

        }else if(val >= 44 && nr === 2){
            return '#636363';

        }else if(val >= 46 && nr === 3){
            return '#636363';

        }else if(val >= 48 && nr === 4){
            return '#636363';

        }else{
            return '#ECECEC';
        }
    }

    getBlockColor(val, nr) {
        if(val >= 30 && nr === 0){
            return '#636363';

        }else if(val >= 32 && nr === 1){
            return '#636363';

        }else if(val >= 34 && nr === 2){
            return '#636363';

        }else if(val >= 36 && nr === 3){
            return '#636363';

        }else if(val >= 38 && nr === 4){
            return '#636363';

        }else{
            return '#ECECEC';
        }
    }

    getHealColor(val, nr) {
        if(val >= 20 && nr === 0){
            return '#636363';

        }else if(val >= 22 && nr === 1){
            return '#636363';

        }else if(val >= 24 && nr === 2){
            return '#636363';

        }else if(val >= 26 && nr === 3){
            return '#636363';

        }else if(val >= 28 && nr === 4){
            return '#636363';
        }else{
            return '#ECECEC';
        }
    }

    getColor(type, val, nr){
        switch (type) {
            case 'attack':
                return this.getAttackColor(val, nr);
            case 'block':
                return this.getBlockColor(val, nr);
            case 'heal':
                return this.getHealColor(val, nr);
            default:

        }
    }

    render() {
        return (
            <View style={styles.pointsWrap}>
                <View style={[styles.prop, styles.propFirst,
                        {
                            backgroundColor: this.getColor(this.props.type, this.props.stats, 0)
                        } ]}></View>
                <View style={[styles.prop, styles.propMiddle,
                        {
                            backgroundColor: this.getColor(this.props.type, this.props.stats, 1)
                        } ]}></View>
                <View style={[styles.prop, styles.propMiddle,
                        {
                            backgroundColor: this.getColor(this.props.type, this.props.stats, 2)
                        } ]}></View>
                <View style={[styles.prop, styles.propMiddle,
                        {
                            backgroundColor: this.getColor(this.props.type, this.props.stats, 3)
                        } ]}></View>
                <View style={[styles.prop, styles.propLast,
                        {
                            backgroundColor: this.getColor(this.props.type, this.props.stats, 4)
                        } ]}></View>
            </View>
        );
    }
}

export default class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statsView: false
        };
    }

    render() {
        return (
            <View style={styles.card} >
              <Image
                source={{uri: this.props.card.avatar}}
                style={styles.thumbnail}
              />
              <View style={styles.rightContainer}>
                <Text style={styles.name}>{this.props.card.name}</Text>
                <View>

                    <View style={styles.statsWrap}>
                        <Image
                            source={require('../images/sword_icon.png')}
                            style={[styles.statsImage, {tintColor: '#636363' }]} />
                        <CardStats type={'attack'} stats={this.props.card.stats.attack} />
                    </View>

                    <View style={styles.statsWrap}>
                        <Image
                            source={require('../images/shield_icon.png')}
                            style={[styles.statsImage, {tintColor: '#636363' }]} />
                        <CardStats type={'block'} stats={this.props.card.stats.block} />
                    </View>

                    <View style={styles.statsWrap}>
                        <Image
                            source={require('../images/bottle_icon.png')}
                            style={[styles.statsImage, {tintColor: '#636363' }]} />
                        <CardStats type={'heal'} stats={this.props.card.stats.heal} />
                    </View>
                </View>
              </View>
            </View>
        );
    }
}
