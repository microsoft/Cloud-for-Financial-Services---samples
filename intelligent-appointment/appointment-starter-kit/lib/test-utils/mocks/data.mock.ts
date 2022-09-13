// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IMeeting } from '../../models/IMeeting';
import { IBranch } from '../../models/IBranch';
import { IMeetingType } from '../../models/IMeetingType';

export const mockMeetingTopics = [
    {
        id: '1',
        name: 'Retail Banking',
        description: 'Client bank can customize this content to talk about features and benefits.',
    },
    {
        id: '2',
        name: 'Savings account',
        description: 'Client bank can customize this content to talk about features and benefits of savings accounts.',
    },
    {
        id: '3',
        name: 'Checking account',
        description: 'Client bank can customize this content to talk about features of their loan program, like convenience',
    },
];

export const mockMeetingTypes: IMeetingType[] = [
    {
        id: '1',
        name: 'Personal loan',
        description: 'Client bank can customize this content to explain features and benefits of this loan type.',
        channelLimitation: 104800000,
        duration: 30,
        customerInstructions: `Client bank can add any other custom information about Covid guidelines, documents to have ready, and so fort. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
\nLorem ipsum dolor sit amet, consectetur adipiscing elit.
\nNullam dignissim nibh ut euismod aliquet.
\nSed accumsan risus finibus, faucibus nibh a, laoreet nulla.`,
    },
    {
        id: '2',
        name: 'Boat loan',
        description: 'Client bank inserts their own text telling about their boat loan program.',
        channelLimitation: 104800001,
        duration: 30,
        customerInstructions: `Client bank can add any other custom information about Covid guidelines, documents to have ready, and so fort. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
\nLorem ipsum dolor sit amet, consectetur adipiscing elit.
\nNullam dignissim nibh ut euismod aliquet.
\nSed accumsan risus finibus, faucibus nibh a, laoreet nulla.`,
    },
    {
        id: '3',
        name: 'Student loan',
        description: 'Client bank can customize this content to explain features and benefits of this loan type.',
        channelLimitation: 104800002,
        duration: 30,
        customerInstructions: `Client bank can add any other custom information about Covid guidelines, documents to have ready, and so fort. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
\nLorem ipsum dolor sit amet, consectetur adipiscing elit.
\nNullam dignissim nibh ut euismod aliquet.
\nSed accumsan risus finibus, faucibus nibh a, laoreet nulla.`,
    },
    {
        id: '4',
        name: 'Mortgage loan',
        description: 'Client bank inserts their own text telling about their boat loan program.',
        duration: 30,
    },
    {
        id: '5',
        name: 'Home equity loan',
        description: 'Client bank can customize this content to explain features and benefits of this loan type.',
        channelLimitation: 104800002,
        duration: 30,
    },
    {
        id: '6',
        name: 'Credit builder loan',
        description: 'Client bank inserts their own text telling about their boat loan program.',
        duration: 30,
    },
    {
        id: '7',
        name: 'Auto loan',
        description: 'Client bank can customize this content to explain features and benefits of this loan type.',
        duration: 30,
    },
    {
        id: '8',
        name: 'Payday loan',
        description: 'Client bank inserts their own text telling about their boat loan program.',
        channelLimitation: 104800002,
        duration: 30,
    },
];

export const mockLocations: IBranch[] = [
    {
        id: '1',
        name: 'Western Seattle Branch',
        address: {
            streetOne: '123 Main St',
            city: 'Seattle',
            state: 'WA',
            postcode: '19019',
            phoneNumber: '(206) 555-1234',
        },
    },
    {
        id: '2',
        name: 'Eastern Seattle Branch',
        address: {
            streetOne: '123 Main St',
            city: 'Seattle',
            state: 'WA',
            postcode: '19019',
            phoneNumber: '(206) 555-1234',
        },
    },
    {
        id: '3',
        name: 'Northern Seattle Branch',
        address: {
            streetOne: '123 Main St',
            city: 'Seattle',
            state: 'WA',
            postcode: '19019',
            phoneNumber: '(206) 555-1234',
        },
    },
    {
        id: '9',
        name: 'Southern Seattle Branch',
        address: {
            streetOne: '123 Main St',
            city: 'Washington',
            state: 'WA',
            postcode: '19019',
            phoneNumber: '(206) 555-1234',
        },
    },
    {
        id: '4',
        name: 'Branch 2',
        address: {
            streetOne: '123 Town St',
            city: 'Neverland',
            state: 'CA',
            postcode: '90220',
        },
    },
    {
        id: '5',
        name: 'Branch 5',
        address: {
            streetOne: '123 Town St',
            city: 'Neverland',
            state: 'CA',
            postcode: '90220',
        },
    },
    {
        id: '6',
        name: 'Branch 6',
        address: {
            streetOne: '123 Town St',
            city: 'Neverland',
            state: 'CA',
            postcode: '90220',
        },
    },
    {
        id: '7',
        name: 'Branch 7',
        address: {
            streetOne: '123 Town St',
            city: 'Neverland',
            state: 'CA',
            postcode: '90220',
        },
    },
    {
        id: '8',
        name: 'Haifa 8',
        address: {
            streetOne: '123 Town St',
            city: 'Neverland',
            state: 'CA',
            postcode: '90220',
        },
    },
];

export const mockTimeSlots = {
    timeslots: [
        {
            startTime: new Date('2021-05-23T21:38:47.183Z'),
            endTime: new Date('2021-05-23T22:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-23T22:08:47.183Z'),
            endTime: new Date('2021-05-23T22:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-23T22:38:47.183Z'),
            endTime: new Date('2021-05-23T23:08:47.183Z'),
            resourceAssignments: [{ resourceId: '8513d2bc-2087-eb11-a812-00224809d24f', requirementId: '25b56d67-45b9-eb11-8236-000d3a5a53c4' }],
            requirementGroupId: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
        },
        {
            startTime: new Date('2021-05-23T23:08:47.183Z'),
            endTime: new Date('2021-05-23T23:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-23T23:38:47.183Z'),
            endTime: new Date('2021-05-24T00:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T00:08:47.183Z'),
            endTime: new Date('2021-05-24T00:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T00:38:47.183Z'),
            endTime: new Date('2021-05-24T01:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T01:08:47.183Z'),
            endTime: new Date('2021-05-24T01:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T01:38:47.183Z'),
            endTime: new Date('2021-05-24T02:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T02:08:47.183Z'),
            endTime: new Date('2021-05-24T02:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T02:38:47.183Z'),
            endTime: new Date('2021-05-24T03:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T03:08:47.183Z'),
            endTime: new Date('2021-05-24T03:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T03:38:47.183Z'),
            endTime: new Date('2021-05-24T04:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T04:08:47.183Z'),
            endTime: new Date('2021-05-24T04:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T04:38:47.183Z'),
            endTime: new Date('2021-05-24T05:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T05:08:47.183Z'),
            endTime: new Date('2021-05-24T05:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T05:38:47.183Z'),
            endTime: new Date('2021-05-24T06:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T06:08:47.183Z'),
            endTime: new Date('2021-05-24T06:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T06:38:47.183Z'),
            endTime: new Date('2021-05-24T07:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T07:08:47.183Z'),
            endTime: new Date('2021-05-24T07:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T07:38:47.183Z'),
            endTime: new Date('2021-05-24T08:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T08:08:47.183Z'),
            endTime: new Date('2021-05-24T08:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T08:38:47.183Z'),
            endTime: new Date('2021-05-24T09:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T09:08:47.183Z'),
            endTime: new Date('2021-05-24T09:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T09:38:47.183Z'),
            endTime: new Date('2021-05-24T10:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }],
        },
        {
            startTime: new Date('2021-05-24T10:08:47.183Z'),
            endTime: new Date('2021-05-24T10:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T10:38:47.183Z'),
            endTime: new Date('2021-05-24T11:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T11:08:47.183Z'),
            endTime: new Date('2021-05-24T11:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T11:38:47.183Z'),
            endTime: new Date('2021-05-24T12:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T12:08:47.183Z'),
            endTime: new Date('2021-05-24T12:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T12:38:47.183Z'),
            endTime: new Date('2021-05-24T13:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T13:08:47.183Z'),
            endTime: new Date('2021-05-24T13:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T13:38:47.183Z'),
            endTime: new Date('2021-05-24T14:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T14:08:47.183Z'),
            endTime: new Date('2021-05-24T14:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T14:38:47.183Z'),
            endTime: new Date('2021-05-24T15:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T15:08:47.183Z'),
            endTime: new Date('2021-05-24T15:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T15:38:47.183Z'),
            endTime: new Date('2021-05-24T16:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T16:08:47.183Z'),
            endTime: new Date('2021-05-24T16:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T16:38:47.183Z'),
            endTime: new Date('2021-05-24T17:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T17:08:47.183Z'),
            endTime: new Date('2021-05-24T17:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T17:38:47.183Z'),
            endTime: new Date('2021-05-24T18:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T18:08:47.183Z'),
            endTime: new Date('2021-05-24T18:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T18:38:47.183Z'),
            endTime: new Date('2021-05-24T19:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T19:08:47.183Z'),
            endTime: new Date('2021-05-24T19:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T19:38:47.183Z'),
            endTime: new Date('2021-05-24T20:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T20:08:47.183Z'),
            endTime: new Date('2021-05-24T20:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T20:38:47.183Z'),
            endTime: new Date('2021-05-24T21:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T21:08:47.183Z'),
            endTime: new Date('2021-05-24T21:38:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
        {
            startTime: new Date('2021-05-24T21:38:47.183Z'),
            endTime: new Date('2021-05-24T22:08:47.183Z'),
            advisors: [{
                id: '1',
                name: 'Advisor 1',
            }]
        },
    ],
};

export const mockMeetings: IMeeting[] = [
    {
        id: '1',
        startTime: new Date('2020-05-24T17:38:47.183Z'),
        endTime: new Date('2020-05-24T18:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
        note: 'do something',
    },
    {
        id: '2',
        startTime: new Date('2020-05-24T18:38:47.183Z'),
        endTime: new Date('2020-05-24T19:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
        note: 'do something',
    },
    {
        id: '3',
        startTime: new Date('2020-05-24T19:38:47.183Z'),
        endTime: new Date('2020-05-24T20:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
        note: 'do something',
    },
    {
        id: '4',
        startTime: new Date('2020-05-24T20:38:47.183Z'),
        endTime: new Date('2020-05-24T21:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
        note: 'do something',
    },
    {
        id: '5',
        startTime: new Date('2020-05-24T21:38:47.183Z'),
        endTime: new Date('2020-05-24T22:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
    },
    {
        id: '6',
        startTime: new Date('2020-05-24T22:38:47.183Z'),
        endTime: new Date('2020-05-24T23:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
    },
    {
        id: '7',
        startTime: new Date('2020-05-24T23:38:47.183Z'),
        endTime: new Date('2020-05-25T00:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
    },
    {
        id: '8',
        startTime: new Date('2020-05-25T00:38:47.183Z'),
        endTime: new Date('2020-05-25T01:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
    },
    {
        id: '9',
        startTime: new Date('2020-05-25T01:38:47.183Z'),
        endTime: new Date('2020-05-25T02:38:47.183Z'),
        agent: {
            id: '22b56d67-45b9-eb11-8236-000d3a5a53c4',
            name: 'John Doe',
        },
        branchId: '1',
        isVirtual: false,
        meetingTypeId: '1',
    },
];
