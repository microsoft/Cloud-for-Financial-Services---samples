// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const axios = require('axios')
const msal = require('@azure/msal-node')

const endPoint = `${process.env.ENVIRONMENT_URL}/api/data/${process.env.ENVIRONMENT_VERSION}`

let token = {};
let timer = 0;

async function getAccessToken() {
    const msalConfig = {
        auth: {
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            authority: `https://login.microsoftonline.com/${process.env.TENANT}`,
        }
    }

    // Create msal application object
    const cca = new msal.ConfidentialClientApplication(msalConfig);

    // With client credentials flows permissions need to be granted in the portal by a tenant administrator.
    // The scope is always in the format "<resource>/.default"
    const clientCredentialRequest = {
        scopes: [`${process.env.ENVIRONMENT_URL}/.default`],
    };

    try {
        const response = await cca.acquireTokenByClientCredential(clientCredentialRequest)

        if (response.accessToken) {
            token = response;

            const expiredOn = (new Date(response.expiresOn)).getTime();
            const now = (new Date()).getTime();
            timer = expiredOn - now;
    
            setTimeout(requestToken, timer)
        }
        return response
    } catch (error) {
        console.log(JSON.stringify(error));
    };
}

module.exports = async function (context, req) {
    if (timer === 0) {
        await getAccessToken()
    }

    if (!token.accessToken) {
        context.res = {
            status: 401,
            body: 'Unauthorized'
        };
        return;
    }

    try {
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
                Authorization: `${token.tokenType} ${token.accessToken}`
            },
            data,        
        })

        context.res = {
            status: response.status,
            body: response.data
        }
    } catch (error) {
        context.res = {
            status: error.status,
            body: error
        }
    };
}