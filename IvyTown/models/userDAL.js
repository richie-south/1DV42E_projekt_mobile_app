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
    let data = {
        fbId: fbId,
        fbProfileImg: fbProfileImg,
        firstName: firstName,
        lastName: lastName
    };
    return new Promise(function(resolve, reject) {
        fetch(config.url+'/user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/text, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            setTimeout(() => null, 0); // react native bugg workaround
            return response.json(); })
        .then(result => resolve(result))
        .catch(e => reject(e));
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
