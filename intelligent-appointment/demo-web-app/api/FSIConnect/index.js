// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const axios = require('axios')

const endPoint = `${process.env.ENVIRONMENT_URL}/api/data/${process.env.ENVIRONMENT_VERSION}`

let token = '';
let timer = 0;

async function requestToken () {
    const response = await axios({
        url: `https://login.microsoftonline.com/${process.env.TENANT}/oauth2/v2.0/token`, 
        method: 'POST',
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            scope: `${process.env.ENVIRONMENT_URL}/.default`
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: "application/json; charset=UTF-8", 
        }
    })

    if (response.status === 200) {
        token = response.data;
        timer = response.data.expires_in

        setTimeout(requestToken, timer * 1000)
    }
}

module.exports = async function (context, req) {
    
    if (timer === 0) {
        await requestToken()
    }
    
    const url = `${endPoint}/${req.body.fsiCallbackName}`;
    const data = req.body.payload?.body ? { ...req.body.payload?.body } : undefined 
    
    if (data && req.body.payload?.Contact && req.body.fsiCallbackName !== 'msfsi_GetAvailableMeetingTimeSlots') { 
        data.Contact = req.body.payload?.Contact
    }

    const response = await axios({
        url,
        method: req.body.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token.token_type} ${token.access_token}`
        },
        data,        
    })


    context.res = {
        status: response.status,
        body: response.data
    }
}