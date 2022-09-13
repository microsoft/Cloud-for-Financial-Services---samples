// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const axios = require('axios')

const endPoint = `${process.env.ENVIRONMENT_URL}/api/data/${process.env.ENVIRONMENT_VERSION}`

module.exports = async function (context, req) {
    const url = `${endPoint}/${req.body.fsiCallbackName}`;
    const data = req.body.payload?.body ? { ...req.body.payload?.body } : undefined 

    if (data && req.body.payload?.Contact) {
        data.Contact = req.body.payload?.Contact
    }

    const response = await axios({
        url,
        method: req.body.method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${process.env.AUTHORIZED_TOKEN}`
        },
        data,        
    })

    context.res = {
        status: response.status,
        body: response.data
    }
}