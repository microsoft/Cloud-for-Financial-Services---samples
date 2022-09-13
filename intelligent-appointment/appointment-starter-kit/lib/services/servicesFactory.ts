import { DelegatorFunc } from '../models/IRequestPayLoad';
import createMeetingServices from './meetingActions.service';
import { createBookingResourceService } from './bookingResources.service';
import { createMeetingResourceService } from './meetingResources.service';
import { IServices } from './interfaces/IServices';

export const createServices = ({ delegator }: { delegator: DelegatorFunc }): IServices => {
    if (!delegator) {
        throw new Error('No delegator provided!');
    }

    return {
        meetingResources: createMeetingResourceService(delegator),
        bookingResources: createBookingResourceService(delegator),
        meetingActions: createMeetingServices(delegator),
    };
};
