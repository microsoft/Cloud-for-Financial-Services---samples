// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IRequestPayload } from "@fsi/appointment-starter-kit";
import { sendRequest } from "./httpPortal.helper";

//Your gateway endpoint URL, here it's the serverless function endpoint example
const endpoint = 'your-gateway-endpoint-url';

export const delegator = async (request: IRequestPayload) => {   
    const data = {
        ...request,
    }

    if (data.payload?.body) {
        (data as any).payload.Contact = (window as any).currentUser.id
    }

    const result = await sendRequest(endpoint, {
        method: 'POST',
        data
    });
    return result;
}