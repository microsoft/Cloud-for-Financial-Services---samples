import { ITimeSlots, ITimeSlotSearchConfiguration } from '../../models/ITimeSlot';
export interface IBookingResourcesService {
    getTimeSlots: (configurations: ITimeSlotSearchConfiguration) => Promise<ITimeSlots>;
}
