import { MEETING_LIMITATIONS } from '../machines';
import { DEFAULT_REQUEST_PAYLOAD, GET_SCHEDULE_PROPERTIES } from './constants';
import { createMeetingResourceService } from './meetingResources.service'

describe('createMeetingResourceService', () => { 
    const mockMeetingType = {
        Id: 'test-id',
        Name: 'test-name',
        Description: 'test-description',
        Channel: {
            Id: 'test-channel-id',
            Value: MEETING_LIMITATIONS.ONLINE,
        },
        Duration: 'test-duration',
        Notes: 'test-customerinstructions',
    }

    const mockMeetingTopic = {
        Id: 'test-id',
        Name: 'test-name',
        Description: 'test-description',
    };

    const mockBranch = {
        Id: 'test-id-branch',
        Name: 'test-name-branch',
        Address1: 'test-address-branch',
        City: 'test-city-branch',
        State: 'test-state-branch',
        CountryOrRegion: 'test-countryOrRegion-branch',
    }

    const mockDelegator = vi.fn(() => ({
        MeetingTypes: [{
            ...mockMeetingType,
            Topics: [mockMeetingTopic.Id],
            Locations: [mockBranch.Id]
        }],
        Topics: [mockMeetingTopic],
        Locations: [mockBranch],
    }));
    
    it('should return a service with 5 actions', () => {
        const mockDelegator = vi.fn();

        const service = createMeetingResourceService(mockDelegator);
        expect(service).toBeDefined();
        expect(service.getMeetingTopics).toBeDefined();
        expect(service.getMeetingTypes).toBeDefined();
        expect(service.getSchedulingProperties).toBeDefined();
        expect(service.getBranches).toBeDefined();
        expect(service.getBranch).toBeDefined();
    });

    it('getMeetingTopics', async () => {
        const service = createMeetingResourceService(mockDelegator);

        const data = await service.getMeetingTopics();

        expect(data.length).toEqual(1);
        expect(data[0]).toEqual({
            id: mockMeetingTopic.Id,
            name: mockMeetingTopic.Name,
            description: mockMeetingTopic.Description,
        });
        expect(mockDelegator).toBeCalledWith({
            method: 'POST',
            fsiCallbackName: GET_SCHEDULE_PROPERTIES,
            version: DEFAULT_REQUEST_PAYLOAD.version,
        });
    });

    it('getMeetingTypes', async () => {
        const service = createMeetingResourceService(mockDelegator);
        
        const data = await service.getMeetingTypes(mockMeetingTopic.Id);

        expect(data.length).toEqual(1);
        expect(data[0]).toEqual({
            id: mockMeetingType.Id,
            name: mockMeetingType.Name,
            description: mockMeetingType.Description,
            channelLimitation: mockMeetingType.Channel.Value,
            duration: mockMeetingType.Duration,
            customerInstructions: mockMeetingType.Notes,
        });
        expect(mockDelegator).not.toBeCalled()
    });

    it('getBranches', async () => {
        const service = createMeetingResourceService(mockDelegator);

        const data = await service.getBranches({meetingTypeId: mockMeetingType.Id});

        expect(data.length).toEqual(1)
        expect(data[0]).toEqual({
            id: mockBranch.Id,
            name: mockBranch.Name,
            address: {
                streetOne: mockBranch.Address1,
                state: mockBranch.City,
                countryOrRegion: mockBranch.CountryOrRegion,
                city: mockBranch.City,
                postcode: undefined,
                phoneNumber: undefined
            }
        });
        expect(mockDelegator).not.toBeCalled()
    });

    it('getBranch - no branch', async () => {     
        const service = createMeetingResourceService(mockDelegator);

        const data = await service.getBranch('test-branchid-123');

        expect(data).not.toBeDefined();        
    });

    it('getBranch - with branch', async () => {     
        const service = createMeetingResourceService(mockDelegator);

        const data = await service.getBranch(mockBranch.Id);

        expect(data).toEqual({
            id: mockBranch.Id,
            name: mockBranch.Name,
            address: {
                streetOne: mockBranch.Address1,
                state: mockBranch.City,
                countryOrRegion: mockBranch.CountryOrRegion,
                city: mockBranch.City,
                postcode: undefined,
                phoneNumber: undefined
            }
        });
    });

    test('getBranches - no connected branch', async () => {
        const mockDelegator = vi.fn(() => ({
            MeetingTypes: [{
                ...mockMeetingType,
                Topics: [mockMeetingTopic.Id],
                Locations: []
            }],
            Topics: [mockMeetingTopic],
            Locations: [mockBranch],
        }));

        const service = createMeetingResourceService(mockDelegator);

        expect(async () => {
            await service.getBranches({ meetingTypeId: mockMeetingType.Id})
        }).rejects.toThrowError('Unable to find branches for the meeting type');
    });

    it('getBranches - with filter term', async () => {
        const service = createMeetingResourceService(mockDelegator);

        const data = await service.getBranches({meetingTypeId: mockMeetingType.Id, searchTerm: 'mnaa'});

        expect(data).toEqual([]);
    });

    afterEach(() => {
        mockDelegator.mockClear();
    })
});