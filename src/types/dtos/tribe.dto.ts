import { Repository, Tribe } from "@prisma/client";
import { Status } from "../enums/status.enum";

export class TribeDTO {
    tribeId: bigint;
    organizationId: bigint;
    name: String
    status: Status;
    repos: Repository[]

    constructor(data: Tribe, repos: Repository[]){
        this.tribeId = data.id_tribe;
        this.organizationId = data.id_organization;
        this.name = data.name;
        this.status = data.status;
        this.repos = repos;
   }

    public convert(): any {
        return JSON.parse(JSON.stringify(this, (_key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value
        ));
    }
}