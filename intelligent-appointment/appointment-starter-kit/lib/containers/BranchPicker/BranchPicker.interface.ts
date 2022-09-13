// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { IParentServiceMachineService } from '../../models/IParentMachineService';

export interface BranchPickerProps {
    parentService: IParentServiceMachineService;
    hideHeader?: boolean;
    hideFooter?: boolean;
}
