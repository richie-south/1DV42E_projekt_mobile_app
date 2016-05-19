'use strict';

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const rWindow = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1
    },

    // game card
    playCard: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        height: 78,
        width: 60

    },

    cardElevetion: {
        elevation: 2
    },

    noStyle: {

    },

    cardImage: {
        height: 44,
        width: 44
    },

    cardCounter:{
        position: 'absolute',
        top: 3,
        left: 3,
        color: 'rgba(99, 99, 99, 0.54)',
        fontSize: 11,
        fontWeight: 'bold'
    },

    // position of opponent cards
    opponentCards: {
        position: 'absolute',
        top: 20,
        left: (rWindow.width/2)-104,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // position of avtive cards
    activeCards: {
        flex:1,

        alignItems:'center',
        justifyContent:'center'

    },

    // position of opponent placed cards
    opponentPlaceCards: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // position
    challangerPlaceCards: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // position
    challangerCards: {
        position: 'absolute',
        bottom: 20,
        left: (rWindow.width/2)-104,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },


    // Placeholder
    placeholderCard: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'rgba(99, 99, 99, 0.54)',
        borderRadius: 8,
        margin:4,
        height: 80.5,
        width: 62.5,
    },

    placeholderImage: {
        height: 15,
        width: 15,
        margin: 3
    },

    placeholderImageWrap: {
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardInPlaceholder: {
        position: 'absolute',
        top: 0,
    },

    // notification Boubble
    notificationBoubble: {
        position: 'absolute',
        height: 34
    },

    notificationBoubbleText: {
        fontSize: 13,
        marginRight: 1,
        color: '#FFFFFF'
    },

    notificationInfo: {
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    notificationImage: {
        width: 14,
        height: 14
    },

    // lifeMeter
    lifeMeterWrap: {

        borderRadius: 8,
        width: 40,
        height: 170,
        backgroundColor: '#FFFFFF'
    },

    lifeMeter: {
        borderRadius: 8,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F44336',
        width: 40
    },

    lifeHp: {
        marginTop: 8,
        color: '#FFFFFF',
        fontSize: 10,
        textAlign: 'center'
    },

    lifePosOpponent: {
        position: 'absolute',
        right: 16,
        top: 22
    },

    lifePosChallanger: {
        position: 'absolute',
        right: 16,
        bottom: 22
    },

    doneButton: {
        position: 'absolute',
        left: 16,
        bottom: 22,

        elevation: 2,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',

        height: 50,
        width: 80,
    },

    doneButtonText: {
        height: 50,

        textAlign: 'center',
        textAlignVertical: 'center',

    }

});
