'use strict';

import React, {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',

    },
    card: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#22A7F0',
        borderRadius: 6,
        marginBottom: 8,
        marginTop: 8,
        padding: 16,
        height: 280,
        width: 200
    },

    rightContainer: {
        flex: 1,
    },

    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },

    name: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },

    stats: {
        textAlign: 'left'
    },

    thumbnail: {
        alignSelf: 'center',
        borderRadius: 50,
        width: 100,
        height: 100
    },

    listView: {
        paddingTop: 80,
        paddingBottom: 50,
        backgroundColor: '#F5FCFF'
    },

    statsProperty: {
        flex: 1,
        backgroundColor: '#F7CA18',
        height: 20,
    }

});
