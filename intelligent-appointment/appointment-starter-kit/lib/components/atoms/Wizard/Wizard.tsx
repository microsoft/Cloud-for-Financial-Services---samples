import { DefaultButton, PrimaryButton, Stack, NeutralColors } from '@fluentui/react';
import { useActor, useInterpret } from '@xstate/react';
import React, { ReactElement, ReactNode, FC, useMemo } from 'react';
import { createMachine, FinalStateNodeConfig, Interpreter } from 'xstate';
import { IWizardCoreProps, IWizardProps } from './Wizard.interface';
import { useTranslation } from '../../../hooks/useTranslation';

export const WIZARD_EVENTS = {
    DONE: 'DONE',
    NEXT: 'NEXT',
    PREV: 'PREV',
} as const;

const wizardFooterStyles = { root: { borderBlockStart: `1px solid ${NeutralColors.gray30}`, padding: '16px 32px' } };

const wizardViewStyles = { root: { height: '100%', overflow: "auto" } } as any;

const wizardViewTokens = { childrenGap: 8 };

export const WizardCore: FC<IWizardCoreProps> = ({ service, children, headerComp, nextLabel, prevLabel, doneLabel, hideFooter, ...props }) => {
    const [state, send] = useActor(service);
    const t = useTranslation();

    return (
        <Stack {...props} grow>
            <Stack styles={wizardViewStyles} grow>
                {headerComp && React.cloneElement(headerComp, { state, send })}
                {React.Children.toArray(children)[state.value as any]}
            </Stack>
            {!hideFooter && (
                <Stack
                    horizontal
                    tokens={wizardViewTokens}
                    horizontalAlign={state.matches('0') || state.done ? 'end' : 'space-between'}
                    styles={wizardFooterStyles}
                >
                    {!state.matches('0') && !state.done && (
                        <DefaultButton
                            text={prevLabel || t(WIZARD_EVENTS.PREV)}
                            onClick={() => send(WIZARD_EVENTS.PREV)}
                            data-testid="wizard-back-btn"
                        />
                    )}
                    <PrimaryButton
                        text={!state.done ? nextLabel || t(WIZARD_EVENTS.NEXT) : doneLabel || t(WIZARD_EVENTS.DONE)}
                        onClick={() => send(state.done ? WIZARD_EVENTS.DONE : WIZARD_EVENTS.NEXT)}
                        disabled={!state.done && !state.can(WIZARD_EVENTS.NEXT)}
                        data-testid="wizard-next-btn"
                    />
                </Stack>
            )}
        </Stack>
    );
};

export const WizardStep: FC<{ validateStep?: () => boolean; onPrev?: () => void; onNext?: () => void }> = ({ children, ...props }) => {
    return <div {...props}>{children}</div>;
};

export const Wizard: FC<IWizardProps> = ({ children, initialStep, onDone, headerComp, id = 'wizard', ...props }) => {
    const machine = useMemo(() => {
        const wizardMachineConfig = {
            id,
            initial: `${initialStep}`,
            states: {
                done: {
                    type: 'final',                    
                } as FinalStateNodeConfig<any, any>,
            },
        };

        if (onDone) {
            wizardMachineConfig.states.done.invoke = {
                src: onDone as any
            }
        }

        React.Children.forEach(children, (child: ReactNode, index: number) => {
            const length = React.Children.count(children);
            const states = wizardMachineConfig.states as any;

            states[index] = {
                on: {
                    NEXT: {
                        target: index === length - 1 ? 'done' : `${index + 1}`,
                        cond: (child as ReactElement).props.validateStep || null,
                        actions: (child as ReactElement).props.onNext,
                    },
                },
            };

            if (index) {
                states[index] = {
                    on: {
                        ...(states[index]?.on || {}),
                        PREV: {
                            target: `${index - 1}`,
                            actions: (child as ReactElement).props.onPrev,
                        },
                    },
                };
            }
        });

        return createMachine(wizardMachineConfig);
    }, [children, id, initialStep, onDone]);

    const wizardService = useInterpret(machine) as unknown as Interpreter<any, any, any> ;

    return (
        <WizardCore service={wizardService} headerComp={headerComp} {...props}>
            {children}
        </WizardCore>
    );
};
