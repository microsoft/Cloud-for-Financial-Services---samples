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
        //The current logged in user contact id is required for the request with the body payload
        (data as any).payload.Contact = (window as any).currentUser?.id
    }

    const result = await sendRequest(endpoint, {
        method: 'POST',
        data
    });
    return result;
}