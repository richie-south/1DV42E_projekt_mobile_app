'use strict';
import {AsyncStorage} from 'react-native';
const STORAGE_KEY = '@AsyncStorageIvytown:userProps';

/**
 * [gets user information from localstorage in app]
 * @return {[promise]} [object of user infroamtion]
 */
export const getUserProps = () =>
    new Promise((resolve, reject) => {
        AsyncStorage.getItem(STORAGE_KEY)
        .then(result => resolve(JSON.parse(result)))
        .catch(e => reject(e));
    });

/**
 * [removes saved use infromation]
 * @return {[promise]} [resolves to result of remove]
 */
export const removeStorage = () =>
    new Promise(function(resolve, reject) {
        AsyncStorage.removeItem(STORAGE_KEY)
            .then(result => resolve(result))
            .catch(e => reject(e));
    });

/**
 * [saves information in localstorage]
 * @param  {[typevalue]} props [information to be saved, object, array, anny typ value]
 * @return {[promise]}       [resolves to result of save]
 */
export const saveUserProps = (props) =>
    new Promise(function(resolve, reject) {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(props))
            .then(result => resolve(result))
            .catch(e => reject(e));
    });
