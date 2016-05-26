'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, AsyncStorage, Dimensions} from 'react-native';
import ProgressBar from 'ProgressBarAndroid';
import FBLogin from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';
import co from 'co';
import * as userDAL from '../models/userDAL';
import Swiper from 'react-native-swiper';
import styles from '../styles/LoginStyles';
import * as asyncStorageDAL from '../models/asyncStorageDAL';

const {width, height} = Dimensions.get('window');
const STORAGE_KEY = '@AsyncStorageIvytown:userProps';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            size: {width: width, height: height}
        };
    }

    componentDidMount(){
        this.loadUserProps();
    }

    loadUserProps(){
        asyncStorageDAL.getUserProps()
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
                                      userDAL.getFbProfileImageUrl(data.profile.id, data.token)
                                          .then(imageData =>
                                              userDAL.createNewUser(
                                                  data.profile.id,
                                                  imageData.data.url,
                                                  data.profile.first_name,
                                                  data.profile.last_name))
                                          .then(userCredencials => {
                                              asyncStorageDAL.saveUserProps(userCredencials)
                                                .then(a => Actions.mycards({ data:userCredencials }))
                                                .catch(e => console.log('saveUserProps error: ', e));
                                          })
                                          .catch(e => {
                                              console.log('error in createNewUser');
                                              console.log(e);
                                          });
                                  }else {
                                      asyncStorageDAL.saveUserProps(result)
                                        .then(a => Actions.mycards({ data:result }))
                                        .catch(e => console.log('saveUserProps error: ', e));
                                  }
                              })
                              .catch(e => {
                                  console.log('error in getUserCredentials');
                                  console.log(e);
                              });

                          }}
                          onLogout={() => {
                            asyncStorageDAL.removeStorage().done();
                          }}
                          onLoginFound={(data) => {
                              console.log('Existing login found.');
                              console.log(data);
                              Actions.mycards({ data: data });
                          }}
                        />
                  </View>

            </View>);
    }
}
