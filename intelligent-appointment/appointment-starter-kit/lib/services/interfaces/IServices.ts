import { IMeetingResourcesService } from './IMeetingResourcesService';
import { IBookingResourcesService } from './IBookingResourcesService';
import { IMeetingActionsService } from './IMeetingActionsService';

export interface IServices {
    meetingResources: IMeetingResourcesService;
    bookingResources: IBookingResourcesService;
    meetingActions: IMeetingActionsService;
}
