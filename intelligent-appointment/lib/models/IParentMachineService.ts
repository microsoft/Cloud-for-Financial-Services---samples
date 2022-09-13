import { Interpreter } from 'xstate';
import { IBranch } from './IBranch';
import { IMeetingTopic } from './IMeetingTopic';
import { IMeetingType } from './IMeetingType';
import { ITimeSlot } from './ITimeSlot';

export interface IParentServiceMachineContext {
    meetingTopic: IMeetingTopic;
    meetingType: IMeetingType;
    branch?: IBranch;
    isVirtual?: boolean;
    timeSlot?: ITimeSlot;
}
export type IParentServiceMachineService = Interpreter<
    IParentServiceMachineContext,
    any,
    | {
          type: 'NEXT';
          data: any;
      }
    | {
          type: 'PREV';
          data: any;
      }
    | any
>;
