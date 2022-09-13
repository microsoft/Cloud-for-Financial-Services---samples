// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './resource.en-US.json';

export const resources = {
    'en-US': {
        translation: en,
    },
}

export const useI18nService = (options: InitOptions = {}) => {
    i18n.use(initReactI18next).init({
        lng: 'en-US',
        fallbackLng: 'en-US',
        resources,
        ...options,
    });

    return i18n;
}