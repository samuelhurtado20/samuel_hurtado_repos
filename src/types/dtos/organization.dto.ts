import { Organization } from "@prisma/client";
import { AnyARecord } from "dns";
import { Status } from "../enums/status.enum";

export class OrganizationDTO {
    organizationId: BigInt;
    name: string;
    status: Status;

    constructor(data: Organization) {
        this.organizationId = data.id_organization;
        this.name = data.name;
        this.status = data.status;
    }

    public convert(): any {
        return JSON.parse(JSON.stringify(this, (_key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value
        ));
    }
}