import { State } from "../enums/state.enum";
import { Status } from "../enums/status.enum";

export interface RepositoryDTO {
    repositoryId: bigint;
    name: String;
    state: State;
    createAt: Date;
    status: Status;
    tribeId: bigint
}