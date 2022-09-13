import React, { createContext, FC } from 'react';
import { IAClientMachines } from '../../machines';
import { useI18nService } from '../../locales';
import { InitOptions } from 'i18next';

export const FSIAppointmentClientContext = createContext<IAClientMachines>({} as any);

export const FSIAppointmentClientProvider: FC<{ stateMachines: IAClientMachines; localizeOptions?: InitOptions }> = ({ children, stateMachines, localizeOptions }) => {
    useI18nService(localizeOptions);

    return <FSIAppointmentClientContext.Provider value={stateMachines}>{children}</FSIAppointmentClientContext.Provider>;
};

export default FSIAppointmentClientProvider;
