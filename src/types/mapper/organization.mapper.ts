import { Organization } from "@prisma/client";
import { OrganizationDTO } from "../dtos/organization.dto";
var Mapper = require('mapper');

export class OrganizationMap extends Mapper<Organization> {

    public static toModel(dto: any): Organization {
        return {
            id_organization: Number(dto.organizationId),
            name: dto.name,
            status: dto.status
        }
    }

    public static toDTO(domain: Organization): OrganizationDTO {
        return {
            organizationId: domain.id_organization,
            name: domain.name,
            status: domain.status
        }
    }
}