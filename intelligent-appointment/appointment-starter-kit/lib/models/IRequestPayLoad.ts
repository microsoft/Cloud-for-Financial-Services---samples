import { CancelMeetingRequestPayload, CreateMeetingPayload } from '../services/interfaces/IMeetingActionsService';
import { TimeSlotSearchRequestPayload } from './ITimeSlot';

export interface IRequestPayload {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    payload: {
        body?: TimeSlotSearchRequestPayload | CreateMeetingPayload | CancelMeetingRequestPayload;
        query?: string;
    };
    fsiCallbackName: string;
    version: string;
}

export type DelegatorFunc = (request: IRequestPayload) => Promise<any>;
