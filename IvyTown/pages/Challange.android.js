'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView, AsyncStorage} from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
import { Actions } from 'react-native-router-flux';

import ChallangeCard from '../components/ChallangeCard';
import PlaceholderCard from '../components/PlaceholderCard';
import LifeMeter from '../components/LifeMeter';
import NotificationBoubble from '../components/NotificationBoubble';
import CompleteButton from '../components/CompleteButton';
import * as asyncStorageDAL from '../models/asyncStorageDAL';

import rUpdate from 'react-addons-update';
import styles from '../styles/ChallangeViewStyle';
import config from '../config';

export default class MyCards extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            gameInfo: null,
            gameInfoLoaded: false,
            isPlaying: true,
            disableClick: false,

            // challanger
            challangerCard: null,
            challangerStats: null,
            challangerCardOne: false,
            challangerCardTwo: false,
            challangerCardThree: false,

            challangerCardOneType: null,
            challangerCardTwoType: null,
            challangerCardThreeType: null,

            // opponent
            opponentCard: null,
            opponentStats: null,
            opponentCardOne: false,
            opponentCardTwo: false,
            opponentCardThree: false,

            opponentCardOneType: null,
            opponentCardTwoType: null,
            opponentCardThreeType:null,

            isHidingCardOne: true,
            isHidingCardTwo: true,
            isHidingCardThree: true,
        };
    }

    componentWillMount() {
        this.gameInfo();
        this.opponentPrePlayInfo();
        this.gameRoundResult();
    }

    gameInfo(){
        this.props.data
            .on('gameInfo', (gameInfo) => {
                console.log(gameInfo);
                if(!this.state.gameInfoLoaded){
                    if(this.props.fbId !== gameInfo.id){
                        this.setState({
                            gameInfo,
                            gameInfoLoaded: true,
                            challangerStats: gameInfo.challange.opponentProps,
                            challangerCard: gameInfo.challange.opponentCard,

                            opponentCard: gameInfo.challange.challangerCard,
                            opponentStats: gameInfo.challange.challangerProps
                        });
                    }else{
                        this.setState({
                            gameInfo,
                            gameInfoLoaded: true,
                            challangerStats: gameInfo.challange.challangerProps,
                            challangerCard: gameInfo.challange.challangerCard,

                            opponentCard: gameInfo.challange.opponentCard,
                            opponentStats: gameInfo.challange.opponentProps
                        });
                    }
                }
            });
    }

    opponentPrePlayInfo(){
        const cardPositions = [
            'opponentCardOne',
            'opponentCardTwo',
            'opponentCardThree',
        ];
        this.props.data
            .on('prePlayData', (data) => {
                const whatToUpdate = cardPositions[data.pos];
                let state = {
                    opponentCardOne: this.state.opponentCardOne,
                    opponentCardTwo: this.state.opponentCardTwo,
                    opponentCardThree: this.state.opponentCardThree,
                };
                state[whatToUpdate] = data.add;
                this.setState(state);
            });
    }

    sendCard(pos, type, add){
        this.props.data
            .emit('prePlayData', { add, pos, type});
    }

    addToActiveCards(cardType){
        if(!this.state.challangerCardOne){
            this.setState({
                challangerCardOne: true,
                challangerCardOneType: cardType
            });
            this.sendCard(0, cardType, true);
        } else if(!this.state.challangerCardTwo){
            this.setState({
                challangerCardTwo: true,
                challangerCardTwoType: cardType
            });
            this.sendCard(1, cardType, true);
        } else if(!this.state.challangerCardThree){
            this.setState({
                challangerCardThree: true,
                challangerCardThreeType: cardType
            });
            this.sendCard(2, cardType, true);
        }else{
            return;
        }
        this.updateChallangerStats(
            this.getPropertyByCardType(cardType), false, 1);
    }

    removeFromActiveCards(pos, cardType){
        if(pos === 0 && this.state.challangerCardOne){
            this.setState({
                challangerCardOne: false,
                challangerCardOneType: null
            });
            this.sendCard(pos, cardType, false);
        } else if(pos === 1 && this.state.challangerCardTwo){
            this.setState({
                challangerCardTwo: false,
                challangerCardTwoType: null
            });
            this.sendCard(pos, cardType, false);
        } else if(pos === 2 && this.state.challangerCardThree){
            this.setState({
                challangerCardThree: false,
                challangerCardThreeType: null
            });
            this.sendCard(pos, cardType, false);
        }

        this.updateChallangerStats(
            this.getPropertyByCardType(cardType), true, 1);
    }

    getPropertyByCardType(cardType){
        switch (cardType) {
            case 0:
                return 'healCards';
            case 1:
                return 'attackCards';
            case 2:
                return 'blockCards';
        }
    }

    updateChallangerStats(propertyToChange, remove, nr){
        if(this.state.challangerStats[propertyToChange] <= 0 && !remove){
            return;
        }
        let newState = rUpdate(this.state, {
            challangerStats: { [propertyToChange]: {
                $set: (remove ? this.state.challangerStats[propertyToChange] +nr :
                    this.state.challangerStats[propertyToChange] -nr)} }
        });
        this.setState(newState);
    }

    goBackToLobby(){
        asyncStorageDAL.getUserProps()
            .then(result => {
                if(result !== null){
                    setTimeout(() => {
                        Actions.mycards({ data:result });
                    }, 0);
                }else{
                    this.setState({loaded: true});
                }
            })
            .catch(e => console.log(e));
    }

    gameEnded(){
        this.props.data
            .on('gameEnded', (data) => {
                this.goBackToLobby();
            });
    }

    gameRoundResult(){
        let opponentMap = [
            'isHidingCardOne',
            'isHidingCardTwo',
            'isHidingCardThree',

            'opponentCardOneType',
            'opponentCardTwoType',
            'opponentCardThreeType'
        ];

        this.props.data
            .on('roundResult', data => {

                console.log(data);
                let i = 0;
                let interval = setInterval(() => {
                    if(i === 3){
                        return clearInterval(interval);
                    }
                    let opponentPropsShow = opponentMap[i];
                    let opponentType = opponentMap[i+3];


                    let newState;
                    if(data.challangerFbId === this.props.fbId){ // isChallanger
                        let roundCards = data.roundCards[1];
                        newState = rUpdate(this.state, {
                            challangerStats: {
                                life: {$set: data.roundResult[i].cLife }
                            },

                            [opponentPropsShow]: { $set: false },
                            [opponentType]: { $set: roundCards[i].type },

                            opponentStats: {
                                life: {$set: data.roundResult[i].oLife },
                                healCards: {$set: data.roundResult[i].oHealCards },
                                attackCards: {$set: data.roundResult[i].oAttackCards },
                                blockCards: {$set: data.roundResult[i].oBlockCards }
                            }
                        });

                    } else {
                        let roundCards = data.roundCards[0];

                        newState = rUpdate(this.state, {
                           challangerStats: {
                               life: {$set: data.roundResult[i].oLife }
                           },

                           [opponentPropsShow]: { $set: false },
                           [opponentType]: { $set: roundCards[i].type },

                           opponentStats: {
                               life: {$set: data.roundResult[i].cLife },
                               healCards: {$set: data.roundResult[i].cHealCards },
                               attackCards: {$set: data.roundResult[i].cAttackCards },
                               blockCards: {$set: data.roundResult[i].cBlockCards }
                           }
                        });
                    }

                    this.setState(newState);
                    i++;
                }, 1500);

                setTimeout(() => {
                    console.log(this.state);
                }, 5000);
            });
    }

    completedStage(){
        this.setState({ disableClick: true });
        this.props.data
            .emit('roundResult', {
                cardTypes: [
                    this.state.challangerCardOneType,
                    this.state.challangerCardTwoType,
                    this.state.challangerCardThreeType ],

                fbId: this.props.fbId
            });
    }

    render() {
        if (!this.state.gameInfoLoaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.container}>
                <View style={styles.lifePosOpponent}>
                    <LifeMeter maxLife={this.state.opponentStats.maxLife} life={this.state.opponentStats.life}/>
                </View>
                <View style={styles.opponentCards}>
                    <NotificationBoubble type={[0, 1]} stats={[this.state.opponentCard.stats.heal, `  +${this.state.opponentCard.stats.attackBoost}`]} bottom={true} widthMode={'large'} color={this.state.opponentCard.backgroundCardImg} >
                        <ChallangeCard margin={4} shadow={true} render={true} type={0} nr={this.state.opponentStats.healCards}/>
                    </NotificationBoubble>

                    <NotificationBoubble type={[1]} stats={[this.state.opponentCard.stats.attack]} bottom={true} color={this.state.opponentCard.backgroundCardImg} >
                        <ChallangeCard margin={4} shadow={true} render={true} type={1} nr={this.state.opponentStats.attackCards}/>
                    </NotificationBoubble>

                    <NotificationBoubble type={[2]} stats={[this.state.opponentCard.stats.block]} bottom={true} color={this.state.opponentCard.backgroundCardImg} >
                        <ChallangeCard margin={4} shadow={true} render={true} type={2} nr={this.state.opponentStats.blockCards}/>
                    </NotificationBoubble>
                </View>

                <View style={styles.activeCards}>
                    <View style={styles.opponentPlaceCards}>
                        <PlaceholderCard>
                            <ChallangeCard render={this.state.opponentCardOne} type={this.state.opponentCardOneType} renderX={this.state.isHidingCardOne} />
                        </PlaceholderCard>

                        <NotificationBoubble animate={true} doRender={[this.state.opponentCardOne]} cardBeforeType={[this.state.opponentCardOneType]} childCardType={this.state.opponentCardTwoType} type={[1]} reverse={true} stats={[`+${this.state.opponentCard.stats.attackBoost}`]} color={this.state.opponentCard.backgroundCardImg} >
                            <PlaceholderCard>
                                <ChallangeCard render={this.state.opponentCardTwo} type={this.state.opponentCardTwoType} renderX={this.state.isHidingCardTwo} />
                            </PlaceholderCard>
                        </NotificationBoubble>

                        <NotificationBoubble animate={true} doRender={[this.state.opponentCardTwo, this.state.opponentCardOne]} cardBeforeType={[this.state.opponentCardTwoType, this.state.opponentCardOneType]} childCardType={this.state.opponentCardThreeType} type={[1]} reverse={true} stats={[`+${this.state.opponentCard.stats.attackBoost}`]} color={this.state.opponentCard.backgroundCardImg} >
                            <PlaceholderCard>
                                <ChallangeCard render={this.state.opponentCardThree} type={this.state.opponentCardThreeType} renderX={this.state.isHidingCardThree} />
                            </PlaceholderCard>
                        </NotificationBoubble>
                    </View>

                    <View style={styles.challangerPlaceCards}>
                        <PlaceholderCard>
                            <ChallangeCard render={this.state.challangerCardOne} type={this.state.challangerCardOneType} disableClick={this.state.disableClick} onClick={this.removeFromActiveCards.bind(this, 0)} />
                        </PlaceholderCard>

                        <NotificationBoubble animate={true} doRender={[this.state.challangerCardOne]} cardBeforeType={[this.state.challangerCardOneType]} childCardType={this.state.challangerCardTwoType} type={[1]} bottom={true} reverse={true} stats={[`+${this.state.challangerCard.stats.attackBoost}`]} color={this.state.challangerCard.backgroundCardImg} >
                            <PlaceholderCard>
                                <ChallangeCard render={this.state.challangerCardTwo} type={this.state.challangerCardTwoType} disableClick={this.state.disableClick} onClick={this.removeFromActiveCards.bind(this, 1)} />
                            </PlaceholderCard>
                        </NotificationBoubble>

                        <NotificationBoubble animate={true} doRender={[this.state.challangerCardTwo, this.state.challangerCardOne]} cardBeforeType={[this.state.challangerCardTwoType, this.state.challangerCardOneType]} childCardType={this.state.challangerCardThreeType} type={[1]} bottom={true} reverse={true} stats={[`+${this.state.challangerCard.stats.attackBoost}`]} color={this.state.challangerCard.backgroundCardImg} >
                            <PlaceholderCard>
                                <ChallangeCard render={this.state.challangerCardThree} type={this.state.challangerCardThreeType} disableClick={this.state.disableClick} onClick={this.removeFromActiveCards.bind(this, 2)} />
                            </PlaceholderCard>
                        </NotificationBoubble>
                    </View>
                </View>

                <View style={styles.challangerCards}>
                    <NotificationBoubble type={[0, 1]} stats={[this.state.challangerCard.stats.heal, `  +${this.state.challangerCard.stats.attackBoost}`]} widthMode={'large'} color={this.state.challangerCard.backgroundCardImg} >
                        <ChallangeCard margin={4} shadow={true} render={true} onClick={this.addToActiveCards.bind(this)} type={0} nr={this.state.challangerStats.healCards}/>
                    </NotificationBoubble>

                    <NotificationBoubble type={[1]} stats={[this.state.challangerCard.stats.attack]} color={this.state.challangerCard.backgroundCardImg} >
                        <ChallangeCard margin={4} shadow={true} render={true} onClick={this.addToActiveCards.bind(this)} type={1} nr={this.state.challangerStats.attackCards}/>
                    </NotificationBoubble>

                    <NotificationBoubble type={[2]} stats={[this.state.challangerCard.stats.block]} color={this.state.challangerCard.backgroundCardImg} >
                        <ChallangeCard margin={4} shadow={true} render={true} onClick={this.addToActiveCards.bind(this)} type={2} nr={this.state.challangerStats.blockCards}/>
                    </NotificationBoubble>
                </View>
                <CompleteButton doRender={[
                    this.state.challangerCardOne,
                    this.state.challangerCardTwo,
                    this.state.challangerCardThree ]}

                    onClick={this.completedStage.bind(this)}/>
                <View style={styles.lifePosChallanger}>
                    <LifeMeter maxLife={this.state.challangerStats.maxLife} life={this.state.challangerStats.life}/>
                </View>
            </View>
        );
    }

    renderLoadingView() {
      return (
        <View style={styles.loading}>
            <Text>Loading challange...</Text>
            <ProgressBar color={'#FF5722'}/>
        </View>
      );
    }
}
