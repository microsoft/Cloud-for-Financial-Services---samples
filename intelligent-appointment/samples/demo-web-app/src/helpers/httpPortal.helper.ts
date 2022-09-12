// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface AjaxOptions extends RequestInit {
    data?: Object;
}

export const sendRequest = async (url: string, options: AjaxOptions) => {
    const res = await fetch(url, {
        method: options.method,
        headers: options.headers || new Headers({
            'Content-Type': 'application/json',
        }),
        body: options.data ? (typeof options.data === 'object' ? JSON.stringify(options.data) : options.data) : undefined,
    })
        .then(res => {
            if (res.status === 200) {
                const result = res.json();

                return result;
            } 
        })
        .catch(e => {
            throw e;
        });

    return res;
};

export async function get<T>(url: string, data: Object): Promise<T> {
    return sendRequest(url, {
        method: 'GET',
        data
    });
}

export async function post<T>(url: string, data: Object): Promise<T> {
    return sendRequest(url, {
        method: 'POST',
        data,
    });
}

export async function patch<T>(url: string, data: Object): Promise<T> {
    return sendRequest(url, {
        method: 'PATCH',
        data,
    });
}

export async function put<T>(url: string, data: Object): Promise<T> {
    return sendRequest(url, {
        method: 'PUT',
        data,
    });
}
