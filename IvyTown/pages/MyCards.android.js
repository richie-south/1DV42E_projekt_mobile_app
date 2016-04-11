'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    Image,
    View,
    ListView,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native';

import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';
import { Actions } from 'react-native-router-flux';
import styles from './styles/MyCardsStyle';

/**
 * [handles card presses, had to put this outside of calss]
 * @param  {[object]} card [pressed card object]
 */
const onCardPress = (card) => {
    console.log(card);
};

export default class MyCards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false
        };
    }


    componentDidMount() {
        this.fetchData(this.props.data.fbId);
    }

    /**
     * [retrives card data]
     */
    fetchData(fbId) {
        const url = 'http://194.47.105.68:3334/user/cards/'+fbId;
        new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    const cards = JSON.parse(request.responseText);
                    console.log(cards);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(JSON.parse(request.responseText)),
                        loaded: true
                    });
                } else {
                    reject(e);
                }
            };

            request.open('GET', url);
            request.send();
        }).done();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (

            <SwipeableViews >
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderCard}
                    style={styles.listView}
                />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderCard}
                    style={styles.listView}
                />
            </SwipeableViews>
        );
    }

    renderLoadingView() {
      return (
        <View style={styles.container}>
          <Text>
            Loading cards...
          </Text>
        </View>
      );
    }

    renderCard(card) {
      return (
          <TouchableNativeFeedback
              onPress={onCardPress.bind(null, card)}
              background={TouchableNativeFeedback.SelectableBackground()}>

              <View style={styles.card} >
                <Image
                  source={{uri: card.avatar}}
                  style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                  <Text style={styles.name}>{card.name}</Text>
                  <View>
                      <Text style={styles.statsProperty}>Attack: {card.stats.attack}</Text>
                      <Text style={styles.statsProperty}>Block: {card.stats.block}</Text>
                      <Text style={styles.statsProperty}>Heal: {card.stats.heal}</Text>
                  </View>
                </View>
              </View>

          </TouchableNativeFeedback>
      );
    }
}
