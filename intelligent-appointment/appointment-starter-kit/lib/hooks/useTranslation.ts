import { useTranslation as usei18Translation } from 'react-i18next';

export const useTranslation = () => {
    return usei18Translation().t;
}