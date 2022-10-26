// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IRequestPayload } from "@fsi/appointment-starter-kit";
import { sendRequest } from "./httpPortal.helper";

//Your gateway endpoint URL, here it's the serverless function endpoint example
const endpoint = 'api/FSIConnect';

export const delegator = async (request: IRequestPayload) => {   
    const data = {
        ...request,
    }

    if (data.payload?.body) {
        
            
        //SAMPLE CODE: Get the contact id from a query parameter http://[YOUR URL]/?id=[GUID]
        const queryParams = new URLSearchParams(window.location.search);      
        // This will get the 'id' parameter from the url. This can be used if you use the sample web app in an iFrame
        (data as any).payload.Contact = queryParams.get('id')        
    }

    const result = await sendRequest(endpoint, {
        method: 'POST',
        data
    });
    return result;
}