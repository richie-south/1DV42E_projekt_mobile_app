'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, AsyncStorage, Dimensions} from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
import FBLogin from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';
import co from 'co';
import * as userDAL from '../models/userDAL';
import Swiper from 'react-native-swiper';
const {width, height} = Dimensions.get('window');

const STORAGE_KEY = '@AsyncStorageIvytown:userProps';
const styles = StyleSheet.create({
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

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            size: {width: width, height: height}
        };
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
                    setTimeout(() => {
                        Actions.mycards({ data:result });
                    }, 0);

                }else{
                    this.setState({loaded: true});
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

    render(){
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return this.renderLogin();
    }

    renderLoadingView(){
        return (
            <View style={styles.container}>
                <ProgressBar color={'#FF5722'}/>
            </View>
        );
    }

    _onLayoutDidChange(e) {
        var layout = e.nativeEvent.layout;
        this.setState({size: {width: layout.width, height: layout.height}});
    }

    renderLogin() {
        return (
            <View style={styles.carousel} onLayout={this._onLayoutDidChange.bind(this)}>
                <Swiper style={styles.wrapper} loop={false} autoplay={true} autoplayTimeout={4}>
                    <View style={styles.slide1}>
                        <Image
                            source={require('../images/sword_icon.png')}
                            style={[styles.image, {tintColor: '#FFFFFF' }]} />
                        <Text style={styles.text}>- Damages opponent's life.</Text>
                        <Text style={styles.text}>- Cancels opponent’s heal card.</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Image
                            source={require('../images/bottle_icon.png')}
                            style={[styles.image, {tintColor: '#FFFFFF' }]} />
                      <Text style={styles.text}>- Heals your life.</Text>
                      <Text style={styles.text}>- Boost coming attack card.</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Image
                            source={require('../images/shield_icon.png')}
                            style={[styles.image, {tintColor: '#FFFFFF' }]} />
                        <Text style={styles.text}>- Blocks attack card.</Text>

                    </View>
                  </Swiper>
                  <View style={styles.container}>
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
                  </View>

            </View>);
    }
}
