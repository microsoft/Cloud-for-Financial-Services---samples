import { IBranch } from '../models/IBranch';
import { IMeetingType } from '../models/IMeetingType';
import {
    BranchResponse,
    IMeetingResourcesService,
    MeetingResources,
    SchedulingPropertiesRawResponse,
    MeetingTopicResponse,
    MeetingTypeResponse,
} from './interfaces/IMeetingResourcesService';
import { DelegatorFunc } from '../models/IRequestPayLoad';
import { IMeetingTopic } from '../models/IMeetingTopic';
import { getRequestPayload, GET_SCHEDULE_PROPERTIES } from './constants';

const resources = {};

const initializeResources = async (delegator: DelegatorFunc) => {
    if (!!(resources as MeetingResources).topics) return;

    const properties = await getSchedulingProperties(delegator);

    (resources as MeetingResources).topics = properties.topics;
    (resources as MeetingResources).meetingTypes = properties.meetingTypes;
    (resources as MeetingResources).meetingTypesEdges = properties.meetingTypesEdges;
    (resources as MeetingResources).branches = properties.branches;
    (resources as MeetingResources).branchesEdges = properties.branchesEdges;
}

export function mapMeetingTypeFields(meetingType: MeetingTypeResponse): IMeetingType {
    return {
        id: meetingType.Id,
        name: meetingType.Name,
        description: meetingType.Description,
        duration: meetingType.Duration,
        channelLimitation: meetingType.Channel?.Value as any,
        customerInstructions: meetingType.Notes,
    };
}

export function mapMeetingTopicFields(meetingTopic: MeetingTopicResponse): IMeetingType {
    return {
        id: meetingTopic.Id,
        name: meetingTopic.Name,
        description: meetingTopic.Description,
    };
}

export function mapSchedulingProperties(properties: SchedulingPropertiesRawResponse):MeetingResources {
    const topics = new Map<string, IMeetingTopic>();
    const meetingTypes = new Map<string, IMeetingType>();
    const branches = new Map<string, IBranch>();
    const meetingTypesEdges = new Map<string, string[]>();
    const branchesEdges = new Map<string, string[]>();

    properties.Topics.forEach(topic => {
        topics.set(topic.Id, mapMeetingTopicFields(topic));
    })

    properties.MeetingTypes.forEach(meetingType => {
        meetingTypes.set(meetingType.Id, mapMeetingTypeFields(meetingType));

        if (meetingType.Locations) {
            branchesEdges.set(meetingType.Id, meetingType.Locations);
        }

        if (meetingType.Topics) {
            meetingType.Topics.forEach(topicId => {
                if (!meetingTypesEdges.has(topicId)) {
                    meetingTypesEdges.set(topicId, []);
                }

                const topicEdges = meetingTypesEdges.get(topicId) as string[];
                topicEdges.push(meetingType.Id);
            })            
        }
    })

    properties.Locations.forEach(location => {
        branches.set(location.Id, mapBranchFields(location));
    })

    return {
        topics,
        meetingTypes,
        branches,
        meetingTypesEdges,
        branchesEdges,
    };
}

export function mapBranchFields(branch: BranchResponse): IBranch {
    return {
        id: branch.Id,
        name: branch.Name,
        address: {
            streetOne: branch.Address1,
            state: branch.City,
            postcode: branch.PostalCode,
            countryOrRegion: branch.CountryOrRegion,
            phoneNumber: branch.Telephone,
            city: branch.City,
        },
    } as IBranch;
}

export const doesBranchMatchSearchTerm = (branch: IBranch, searchTerm: string) => {
    const { name, address } = branch;
    const isNameMatched = name.toLowerCase().includes(searchTerm);
    const isAddressMatched = address.streetOne?.toLowerCase().includes(searchTerm) 
                        || address.streetTwo?.toLowerCase().includes(searchTerm)
                        || address.city?.toLowerCase().includes(searchTerm)
                        || address.state?.toLowerCase().includes(searchTerm)
                        || address.postcode?.toLowerCase().includes(searchTerm);

    return isNameMatched || isAddressMatched;
}

export const SELECT_MEETING_TYPE_FIELDS = `$select=msfsi_meetingtypeid,msfsi_name,msfsi_description,msfsi_meetingchannellimitation,msfsi_customerinstructions,msfsi_isenabledforselfservice`;
export const SELECT_MEETING_TOPIC_FIELDS = `$select=msfsi_name,msfsi_description,msfsi_meetingtopicid`;

export async function getSchedulingProperties(delegator: DelegatorFunc): Promise<MeetingResources> {
    const payload = getRequestPayload({
        method: 'POST',
        fsiCallbackName: GET_SCHEDULE_PROPERTIES,
    });

    const response = await delegator(payload);
    
    if (!response) throw new Error('Unable to get scheduling properties');

    return mapSchedulingProperties(response);
}

export async function getMeetingTopics(delegator: DelegatorFunc): Promise<IMeetingTopic[]> {
    await initializeResources(delegator);

    return Array.from((resources as MeetingResources).topics.values());
}

export async function getBranches({ meetingTypeId, searchTerm = '' } : { meetingTypeId: string; searchTerm?: string }, delegator: DelegatorFunc): Promise<IBranch[]> {
    await initializeResources(delegator);

    const connectedBranchesIds = (resources as MeetingResources).branchesEdges.get(meetingTypeId);

    if (!connectedBranchesIds) throw new Error('Unable to find branches for the meeting type');

    const filter = searchTerm.trim().toLowerCase();

    const connectedBranches = connectedBranchesIds.map(branchId => (resources as MeetingResources).branches.get(branchId));

    return (filter 
        ? connectedBranches.filter(branch => !!branch && doesBranchMatchSearchTerm(branch, filter)) 
        : connectedBranches.filter(Boolean)
    ) as IBranch[];
}

export async function getBranch(branchId : string, delegator: DelegatorFunc): Promise<IBranch | undefined> {
    await initializeResources(delegator);
            
    return (resources as MeetingResources).branches.get(branchId);
}

export async function getMeetingTypes (topicId: string, delegator: DelegatorFunc): Promise<IMeetingType[]> {
    await initializeResources(delegator);

    const meetingTypeIds = (resources as MeetingResources).meetingTypesEdges.get(topicId);

    if (!meetingTypeIds) throw new Error('Unable to find meeting types for the topic');

    return meetingTypeIds
        .map(meetingTypeId => (resources as MeetingResources).meetingTypes.get(meetingTypeId))
        .filter(Boolean) as IMeetingType[];
}

export function createMeetingResourceService (delegator: DelegatorFunc): IMeetingResourcesService {
    return {
        getMeetingTopics: () => getMeetingTopics(delegator),
        getBranches: ({ meetingTypeId, searchTerm = '' }) => getBranches({ meetingTypeId, searchTerm }, delegator),
        getBranch: (branchId: string) => getBranch(branchId, delegator),
        getMeetingTypes: (topicId: string) => getMeetingTypes(topicId, delegator),
        getSchedulingProperties: () => getSchedulingProperties(delegator),
        getMeetingTopic: async (topicId: string) => {
            await initializeResources(delegator);

            return (resources as MeetingResources).topics.get(topicId);
        },
        getMeetingType: async (meetingTypeId: string) => {
            await initializeResources(delegator);

            return (resources as MeetingResources).meetingTypes.get(meetingTypeId);
        }
    };
};
