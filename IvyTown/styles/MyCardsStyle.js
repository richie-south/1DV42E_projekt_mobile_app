'use strict';

import React from 'react';
import {StyleSheet} from 'react-native';
//const colors = ['#FF5722', '#4CAF50', '#00BCD4', '#2196F3', '#E91E63', '#9C27B0'];

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    listView: {
        paddingTop: 16,
        paddingBottom: 50,
        paddingLeft: 16
        //backgroundColor: '#FFFFFF'
    },

    title: {
        color: '#626262',
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },

    /*Card styles*/

    card: {
        flex: 1,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 12.4, // 16
        marginBottom: 16,
        height: 216,
        width: 168,
        elevation: 8
    },

    thumbnail: {
        alignSelf: 'center',
        borderRadius: 50,
        width: 95,
        height: 95
    },

    name: {
        color: '#FFFFFF',
        fontSize: 24,
        marginBottom: 4,
        textAlign: 'center'
    },

    rightContainer: {
        flex: 1,
    },

    statsWrap: {
        flex: 1,
        flexDirection:'row',
        marginBottom: 4
    },

    statsImage: {
        height: 16,
        width: 16
    },

    pointsWrap: {
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',

        //backgroundColor: '#D8D8D8',
        //borderWidth: 1,
        //borderColor: '#979797',
        marginLeft: 2,
        padding:1,
        paddingLeft: 2,
        height: 18,
        width: 124, //124
        borderRadius: 10
    },

    prop: {
        width: 23,
        height: 12
    },

    propFirst: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginRight: 1
    },

    propMiddle: {
        marginRight: 1
    },

    propLast: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginRight: 1

    },

    statsProperty: {
        flex: 1,
        backgroundColor: '#F7CA18',
        height: 20,
    },

    /* Card View */
    cardViewWrap: {
        flex: 1,
        flexDirection:'row'
    },

    settings: {
        justifyContent: 'center',
        marginLeft: 8,
        height: 125,
        width: 125,
        elevation: 2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 44,
        borderTopLeftRadius: 44,
        borderTopRightRadius: 44,
    },

    buttonWrap: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 94,
        height: 36
    },

    buttonText: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 14
    },

    /* Lobby card*/
    lobbyListView: {
        paddingTop: 16,
        paddingBottom: 50
        //backgroundColor: '#D5D5D5'
    },

    lobbyCardWrap: {
        marginLeft: 16
    },


});
