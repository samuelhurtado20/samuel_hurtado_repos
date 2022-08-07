import { Organization, PrismaClient } from '@prisma/client'
import { OrganizationDTO } from '../types/dtos/organization.dto';
const prisma = new PrismaClient()

export default class OrganizationService {
    public async GetById(id: number) {
        try {
            const result = await prisma.organization
                .findUnique({
                    where: {
                        id_organization: id,
                    },
                })

            return result;
        } catch (e) {
            throw e
        }
    }

    public async GetAll(): Promise<Organization[]> {
        try {
            const result = await prisma.organization
                .findMany()

            return result;
        } catch (e) {
            throw e
        }
    }

    public async Insert(organization: OrganizationDTO) {
        try {
            const result = await prisma.organization.create({
                data: {
                    name: organization.name,
                    status: organization.status,
                  },
                  select: {
                    id_organization: true,
                  },
            })
            console.log(result)
            return result
        } catch (e) {
            throw e
        }
    }

    public async Update(id: number, organization: Organization) {
        try {
            const result = await prisma.organization.update({
                where: { id_organization: id },
                data: organization,
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Delete(id: number) {
        try {
            const result = await prisma.organization.delete({
                where: { id_organization: id }
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async DeleteAll() {
        try {
            const result = await prisma.organization.deleteMany({
                where: { id_organization: { gt: 0 } }
            })
            console.log(result)
            return result
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}