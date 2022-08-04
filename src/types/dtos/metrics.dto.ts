import { Status } from "../enums/status.enum";

export interface MetricsDTO {
    repositoryId: Number;
    name: String
    status: Status;
}