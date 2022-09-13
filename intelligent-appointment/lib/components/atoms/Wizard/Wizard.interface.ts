import { IStackProps } from '@fluentui/react';
import { ReactElement } from 'react';
import { Interpreter } from 'xstate';

export interface IWizardConfig {
    headerComp?: ReactElement;
    nextLabel?: string;
    prevLabel?: string;
    doneLabel?: string;
    hideFooter?: boolean;
}

export interface IWizardProps extends IStackProps, IWizardConfig {
    initialStep: number;
    onDone?: () => void;
    id?: string;
}

export interface IWizardCoreProps extends IStackProps, IWizardConfig {
    service: Interpreter<any, any, any>;
}
