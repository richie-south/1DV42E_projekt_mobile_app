'use strict';

import config from '../config';

export const getUserCredentials = (fbId) => {
    console.log('getUserCredentials');
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

        request.open('GET', config.url+'/user/'+fbId, true);
        request.send();
    });
};

export const createNewUser = (fbId, fbProfileImg, firstName, lastName) => {
    const data = JSON.stringify({
        fbId: fbId,
        fbProfileImg: fbProfileImg,
        firstName: firstName,
        lastName: lastName
    });
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                const parsedResponse = JSON.parse(request.responseText);
                return resolve(parsedResponse);
            } else if (request.status === 400){
                console.log('invalid parameters');
                reject(e);
            } else if (request.status === 500){
                console.log('server error');
                reject(e);
            } else {
                console.log('error ', e);
                reject(e);
            }
        };

        request.open('POST', config.url+'/user/create', true);
        request.setRequestHeader('Content-type', 'application/text');
        //console.log(data);
        request.send(data);
    });
};

export const getUserCards = (fbId) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                console.log(request.responseText);
                const parsedResponse = JSON.parse(request.responseText);
                return resolve(parsedResponse);
            } else {
                reject(e);
            }
        };

        request.open('GET', config.url+'/user/cards/'+fbId, true);
        request.send();
    });
};
