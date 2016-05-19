'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, ListView} from 'react-native';
import { Actions } from 'react-native-router-flux';

import ChallangeCard from '../components/ChallangeCard';
import PlaceholderCard from '../components/PlaceholderCard';
import LifeMeter from '../components/LifeMeter';
import NotificationBoubble from '../components/NotificationBoubble';

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
            isPlaying: false,

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
        };
    }

    componentWillMount() {
        //this.props.data
        //    .emit('lobby', { test: true, mes: 'in challange room' });
        this.gameInfo();
    }

    gameInfo(){
        this.props.data
            .on('gameInfo', (gameInfo) => {
                console.log(gameInfo);
                if(!this.state.gameInfoLoaded){
                    this.setState({
                        gameInfo,
                        gameInfoLoaded: true,
                        challangerStats: gameInfo.challange.props,
                        challangerCard: gameInfo.challange.challangerCard,

                        opponentCard: gameInfo.challange.opponentCard,
                        opponentStats: gameInfo.challange.props
                    });
                }
            });
    }

    addToActiveCards(cardType){
        if(!this.state.challangerCardOne){
            this.setState({
                challangerCardOne: true,
                challangerCardOneType: cardType
            });
        } else if(!this.state.challangerCardTwo){
            this.setState({
                challangerCardTwo: true,
                challangerCardTwoType: cardType
            });
        } else if(!this.state.challangerCardThree){
            this.setState({
                challangerCardThree: true,
                challangerCardThreeType: cardType
            });
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
        } else if(pos === 1 && this.state.challangerCardTwo){
            this.setState({
                challangerCardTwo: false,
                challangerCardTwoType: null
            });
        } else if(pos === 2 && this.state.challangerCardThree){
            this.setState({
                challangerCardThree: false,
                challangerCardThreeType: null
            });
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
            default:

        }
    }

    updateChallangerStats(propertyToChange, remove, nr){
        if(this.state.challangerStats[propertyToChange] <= 0 && !remove){
            return;
        }
        let newState = rUpdate(this.state, {
            challangerStats: { [propertyToChange]: {$set: (remove ? this.state.challangerStats[propertyToChange] +nr : this.state.challangerStats[propertyToChange] -nr)} }
        });
        this.setState(newState);
    }

    renderNotification(render, type){
        return render && type === 0 ? true : false;
    }

    // props: { maxLife: 100, blockCards: 4, attackCards: 4, healCards: 4 },
    render() {
        if (!this.state.gameInfoLoaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={styles.container}>
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
                            <ChallangeCard render={this.state.opponentCardOne} type={this.state.opponentCardTOneType} renderX={this.state.isPlaying} />
                        </PlaceholderCard>

                        <PlaceholderCard>
                            <ChallangeCard render={this.state.opponentCardTwo} type={this.state.opponentCardTwoType} renderX={this.state.isPlaying} />
                        </PlaceholderCard>

                        <PlaceholderCard>
                            <ChallangeCard render={this.state.opponentCardThree} type={this.state.opponentCardThreeType} renderX={this.state.isPlaying} />
                        </PlaceholderCard>
                    </View>


                    <View style={styles.challangerPlaceCards}>
                        <PlaceholderCard>
                            <ChallangeCard render={this.state.challangerCardOne} type={this.state.challangerCardOneType} onClick={this.removeFromActiveCards.bind(this, 0)} />
                        </PlaceholderCard>

                        <NotificationBoubble doRender={[this.state.challangerCardOne]} cardBeforeType={[this.state.challangerCardOneType]} childCardType={this.state.challangerCardTwoType} type={[1]} bottom={true} reverse={true} stats={[`+${this.state.challangerCard.stats.attackBoost}`]} color={this.state.challangerCard.backgroundCardImg} >
                            <PlaceholderCard>
                                <ChallangeCard render={this.state.challangerCardTwo} type={this.state.challangerCardTwoType} onClick={this.removeFromActiveCards.bind(this, 1)} />
                            </PlaceholderCard>
                        </NotificationBoubble>

                        <NotificationBoubble doRender={[this.state.challangerCardTwo, this.state.challangerCardOne]} cardBeforeType={[this.state.challangerCardTwoType, this.state.challangerCardOneType]} childCardType={this.state.challangerCardThreeType} type={[1]} bottom={true} reverse={true} stats={[`+${this.state.challangerCard.stats.attackBoost}`]} color={this.state.challangerCard.backgroundCardImg} >
                            <PlaceholderCard>
                                <ChallangeCard render={this.state.challangerCardThree} type={this.state.challangerCardThreeType} onClick={this.removeFromActiveCards.bind(this, 2)} />
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

            </View>
        ); // <LifeMeter />
    }

    renderLoadingView() {
      return (
        <View>
          <Text>
              Setting up challange...
          </Text>
        </View>
      );
    }
}
