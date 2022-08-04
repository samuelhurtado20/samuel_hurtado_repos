import { Status } from "../enums/status.enum";

export interface OrganizationDTO {
    organizationId: Number;
    name: string
    status: Status;
  }