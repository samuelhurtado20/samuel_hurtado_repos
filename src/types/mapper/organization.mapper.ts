import { Organization } from "@prisma/client";
import { TypeMapper } from "ts-mapper";
import { OrganizationDTO } from "../dtos/organization.dto";

export class Mapper extends TypeMapper {
   constructor() {
      super();
      this.config();
   }

   private config(): void {
      // put here your mapping configurations
      this.createMap<Organization, OrganizationDTO>()
        .map(src => src.id_organization, dest => dest.organizationId)
        .map(src => src.name, dest => dest.name)
        .map(src => src.status, dest => dest.status);
        
      this.createMap<OrganizationDTO, Organization>()
      .map(src => src.organizationId, dest => dest.id_organization)
      .map(src => src.name, dest => dest.name)
      .map(src => src.status, dest => dest.status);
   }
}

const mapper = new Mapper();