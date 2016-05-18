'use strict';

import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },

    // game card
    playCard: {
        flex:1,

        alignItems:'center',
        justifyContent:'center',
        //flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        /*padding: 12.4, // 16
        marginBottom: 16,*/
        height: 78,
        width: 60

    },

    cardElevetion: {
        elevation: 8
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
        top: 22,
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
        bottom: 22,

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
    }

});
