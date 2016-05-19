'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/MyCardsStyle';

import LobbyCard from '../components/LobbyCard';
import CardView from '../components/CardView';
import GridView from 'react-native-grid-view';
import config from '../config';

const lobby = 'lobby';

// socket config fix
if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: {userAgent: 'ReactNative'}});
}

const io = require('socket.io-client/socket.io'); // need to require it do to react native bugg..
let socket = io(config.url, {
    transports: ['websocket'], forceNew: true
});

socket.on('connect', () => {
    //console.log('id1: ', socket.io.engine.id);
});

export default class MyCards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            myCards: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            myCardsList: [],
            lobbyCards: [],
            loaded: false
        };
    }

    componentWillMount() {
        this.fetchData(this.props.data.fbId);
    }

    /**
     * [retrives card data]
     */
    fetchData(fbId) {
        const url = config.url+'/user/cards/'+fbId;
        fetch(url)
            .then(response => {
                setTimeout(() => null, 0); // react native bugg workaround
                return response.json();})
            .then((myCards) => {
                console.log('my cards', myCards);
                this.setState({
                    myCards: this.state.myCards.cloneWithRows(myCards),
                    myCardsList: myCards,
                    loaded: true
                });
                this.socketLobby();
            })
            .catch((e) => console.log(e));
    }

    socketJoinLobby(){
        socket.emit('room', {room: lobby, fbId: this.props.data.fbId});
    }

    socketLobbyUpdate(){
        socket.on('update', (cards) => {
            console.log('lobbyCards ', cards);
            this.setState({
                lobbyCards: cards.map((card, index) => {
                    card.key = card._id;
                    return card;
                }).slice(0)
            });
        });
    }

    socketLobby(){
        this.socketJoinLobby();
        this.socketLobbyUpdate();
        this.onNewGame();
    }

    /**
     * [add card to lobby]
     * @param  {[object]} card [object of card pressed]
     */
    onAddLobbyCard(card) {
        socket.emit(lobby, { add: true, card });
    }

    /**
     * [remove card from lobby]
     * @param  {[object]} card [object of card pressed]
     */
    onRemoveLobbyCard(card) {
        socket.emit(lobby, { add: false, card });
    }

    /**
     * [Pressed on card past owner btn]
     * @param  {[object]} card [object of card pressed]
     */
    onPassCardOwner(card) {
        console.log('past owners', card);
    }

    /**
     * [press on card in lobby]
     * @param  {[object]} card [object of card pressed]
     */
    onCardLobbyPress(card) {
        let ownCards = this.state.myCardsList
            .filter(c => {
        		if(c._id.toString() === card._id.toString()){
        			this.onRemoveLobbyCard(card);
                    return true;
        		}
        	});
        if(ownCards.length > 0){
            return;
        }

        socket.emit(lobby, {
            challange: true,
            joinNew: true,
            challangeUserFbId: this.props.data.fbId,
            challangerCard: this.state.myCardsList[0],
            opponentCard: card });

        Actions.challange({ data: socket, fbId: this.props.data.fbId });
    }

    onNewGame(){
        socket.on('newGame', (gameProps) => {
            socket.emit(lobby, {
                challange: true,
                joinNew: false,
                opponentUserFbId: this.props.data.fbId,
                room: gameProps.roomId
            });
            Actions.challange({ data: socket });
        });
    }


    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ScrollableTabView renderTabBar={false} initialPage={2}>

                <ListView
                    tabLabel="deck"
                    dataSource={this.state.myCards}
                    renderRow={this.renderMyCard.bind(this)}
                    contentContainerStyle={styles.listView}
                />

                <GridView
                    key={this.state.lobbyCards}
                    items={this.state.lobbyCards}
                    itemsPerRow={2}
                    renderItem={this.renderLobbyCards.bind(this)}
                    style={styles.lobbyListView}
                  />

            </ScrollableTabView>
        );
    }

    renderLoadingView() {
      return (
        <View style={styles.container}>
          <Text>
              Loading your cards...
          </Text>
        </View>
      );
    }

    renderLobbyCards(card){
        return (
            <LobbyCard key={card.key} onPress={this.onCardLobbyPress.bind(this)} card={card}/>
        );
    }

    renderMyCard(card) {
      return (
          <CardView
              key={card.key}
              onPressAddToLobby={this.onAddLobbyCard.bind(this)}
              onPressRemoveFromLobby={this.onRemoveLobbyCard.bind(this)}
              onPressViewOwners={this.onPassCardOwner.bind(this)}
              card={card}/>
      );
    }
}
