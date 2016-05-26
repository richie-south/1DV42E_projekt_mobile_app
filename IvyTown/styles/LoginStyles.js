'use strict';

import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        left: width/2-70,

    },

    image: {
        marginBottom: 16
    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    carousel: {
        flex: 1,
        backgroundColor: '#FF5722'
    },

    options: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 100,
        bottom: 24,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5722'

    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5722'

    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5722'

    },

    text: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    }
});
