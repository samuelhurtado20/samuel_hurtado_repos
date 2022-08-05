import { Repository } from "@prisma/client";
import { State } from "../enums/state.enum";
import { Status } from "../enums/status.enum";

export class RepositoryDTO 
{    
    repositoryId: bigint;
    name: String;
    state: State;
    createAt: Date;
    status: Status;
    tribeId: bigint

    constructor(data: Repository){
        this.repositoryId = data.id_repository;
        this.name = data.name;
        this.state = Number(data.state);
        this.createAt = data.create_time;
        this.status = data.status;
        this.tribeId = data.id_tribe;
   }

    public convert(): any {
        return JSON.parse(JSON.stringify(this, (_key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value
        ));
    }
}