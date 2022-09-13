// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IAddress } from './IAddress';

export interface IBranch {
    id: string;
    name: string;
    address: IAddress;
}
