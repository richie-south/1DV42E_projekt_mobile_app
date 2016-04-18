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


import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/MyCardsStyle';

//import Card from '../components/Card';
import LobbyCard from '../components/LobbyCard';
import CardView from '../components/CardView';
import GridView from 'react-native-grid-view';


import config from '../config';

// socket config fix
if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: {userAgent: 'ReactNative'}});
}

import io from 'socket.io-client/socket.io';
const socket = io(config.url, {
    transports: ['websocket'], forceNew: true
});

const onPress = (e) => {
    console.log(e);
};

const onCardLobbyPress = (e) => {
    console.log('cardLobby', e);
};

export default class MyCards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            myCards: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            lobbyCards: [],
            loaded: false
        };
    }

    componentDidMount() {
        this.fetchData(this.props.data.fbId)
            .then(() => {
                this.socketLobby();
            })
            .catch((e) => {
                console.log('Fetch error', e);
            });

    }

    /**
     * [retrives card data]
     */
    fetchData(fbId) {
        const url = config.url+'/user/cards/'+fbId;
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    const cards = JSON.parse(request.responseText);
                    console.log(cards);
                    this.setState({
                        myCards: this.state.myCards.cloneWithRows(JSON.parse(request.responseText)),
                        loaded: true
                    });
                    resolve(true);
                } else {
                    reject(e);
                }
            };

            request.open('GET', url);
            request.send();
        });
    }

    socketJoinLobby(){
        socket.emit('room','lobby');
    }

    socketLobbyUpdate(){
        socket.on('update', (cards) => {
            console.log('cards', cards);
            let c = cards.map((card, index) => {
                card.key = index+'c';
                return card;
            });
            this.setState({
                lobbyCards: c
            });
        });
    }

    addCardToLobby(card){
        const mockCard = {
            _id: '5703b3bbd61b52010ec3f591',
            _creator: '5703b3bbd61b52010ec3f590',
            name: 'Richard',
            avatar: 'richards bild',
            pastUsers: [],
            stats: {
                blockBoost: 0,
                healBoost: 0,
                attackBoost: 10,
                heal: 20,
                block: 30,
                attack: 40,
                xp: 0,
                lvl: 0
            },
            backgroundCardImg: 'defaultCardImg'
        };

        socket.emit('lobby', { add: true, card});
    }

    socketLobby(){
        console.log('socketLobby');
        this.socketJoinLobby();
        this.socketLobbyUpdate();
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ScrollableTabView initialPage={2} renderTabBar={false}>

                <ListView
                    tabLabel="deck"
                    dataSource={this.state.myCards}
                    renderRow={this.renderCard}
                    contentContainerStyle={styles.listView}
                />

                <GridView
                    items={this.state.lobbyCards}
                    itemsPerRow={2}
                    renderItem={this.renderLobbyCards}
                    style={styles.lobbyListView}
                  />

            </ScrollableTabView>
        );

        /*<ListView
              tabLabel="lobby"
              dataSource={this.state.lobbyCards}
              renderRow={this.renderLobbyCards}
              contentContainerStyle={styles.lobbyListView}
          />*/
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

    renderLobbyCards(card){
        return (
            <LobbyCard key={card.key} onPress={onCardLobbyPress} card={card}/>
        );
    }

    renderCard(card) {
      return (
          <CardView
              onPressAddToLobby={onPress}
              onPressViewOwners={onPress}
              card={card}/>
      );
    }
}
