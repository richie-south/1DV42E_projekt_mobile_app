'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';

import FBLogin from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';
import co from 'co';
import * as userDAL from '../models/userDAL';

const STORAGE_KEY = '@AsyncStorageIvytown:userProps';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

// tokej
// CAAHo1XAZAZAdABAPSQGcRAb2hjZB1KmoGurPHmOaY3KaqTmMs3iaiZCodpNYyQuRVS6ZCUR9G8v63vt0DBuMQ6IrA8UvfEEdp28mKmApvSDBxyZBnF221V0Bgjhud2ywMPlBRjTQOVSLhb6rZAF8vSFEV9Ty4vKfDI2s9ieBvDz1dR1DvyUWgGBnIAeEiUGcA6iSXm7dY2sKAZDZD
// id//const id = '10206232596794517';

export default class Login extends React.Component{

    constructor(props){
        super(props);
    }

    getFbProfileImageUrl(fbId, token) {
        const photoWidth = 480;
        const api = `https://graph.facebook.com/v2.3/${fbId}/picture?width=${photoWidth}&redirect=false&access_token=${token}`;

        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = (e) => {
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {

                    const parsedResponse = JSON.parse(request.responseText);
                    console.log(parsedResponse);
                    return resolve(parsedResponse);
                } else {
                    reject(e);
                }
            };
            console.log(api);
            request.open('GET', api);
            request.send();
        });
    }

    componentDidMount(){
        this.loadUserProps();
    }

    loadUserProps(){
        this._getUserProps()
            .then(result => {
                console.log('user saved props: ', result); // TODO: remove
                if(result !== null){
                    Actions.mycards({ data:result });
                }
            })
            .catch(e => console.log(e));
    }

    _getUserProps(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(STORAGE_KEY)
            .then(result => resolve(JSON.parse(result)))
            .catch(e => reject(e));
        });
    }

    async _removeStorage() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    async _saveUserProps(props){
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(props));
        } catch (error) {
            console.log('AsyncStorage error: ', error.message);
        }
    }

    render() {
        //this.loadUserProps();
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Login plz
                </Text>
                <FBLogin style={{ marginBottom: 10, }}
                    permissions={['public_profile', 'email']}

                    onLogin={(data) => {
                        console.log('Logged in!: ', data);

                        userDAL.getUserCredentials(data.profile.id)
                        .then(result => {
                            if(result === null){
                                this.getFbProfileImageUrl(data.profile.id, data.token)
                                    .then(imageData =>
                                        userDAL.createNewUser(
                                            data.profile.id,
                                            imageData.data.url,
                                            data.profile.first_name,
                                            data.profile.last_name)
                                    ).then(userCredencials => {
                                        this._saveUserProps(userCredencials);
                                        Actions.mycards({ data:userCredencials });
                                    })
                                     .catch(e => {
                                        console.log('error in createNewUser');
                                        console.log(e);
                                     });
                            }else {
                                this._saveUserProps(result);
                                Actions.mycards({ data:result });
                            }
                        })
                        .catch(e => {
                            console.log('error in getUserCredentials');
                            console.log(e);
                        });

                    }}
                    onLogout={() => {
                      console.log('Logged out.');
                      this._removeStorage().done();
                    }}
                    onLoginFound={(data) => {
                        console.log('Existing login found.');
                        console.log(data);
                        Actions.mycards({ data: data });
                    }}
                    onLoginNotFound={() => {
                        console.log('No user logged in.');
                    }}
                    onError={(data) => {
                        console.log('ERROR');
                        console.log(data);
                    }}
                    onCancel={() => {
                        console.log('User cancelled.');
                    }}
                    onPermissionsMissing={(data) => {
                        console.log('Check permissions!');
                        console.log(data);
                    }}
                  />
            </View>);
    }
}
