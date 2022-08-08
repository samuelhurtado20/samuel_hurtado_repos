import { Organization, PrismaClient } from '@prisma/client'
import { OrganizationDTO } from '../types/dtos/organization.dto';
const prisma = new PrismaClient()

export default class OrganizationService 
{
    public async GetById(id: bigint) {
        try {
            const result = await prisma.organization
                .findUnique({
                    where: {
                        id_organization: BigInt(id),
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

            return result
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    public async Update(id: bigint, organization: Organization) {
        try {
            const result = await prisma.organization.update({
                where: { id_organization: BigInt(id) },
                data: {
                    name: organization.name,
                    status: organization.status,
                },
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Delete(id: bigint) {
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
            const sql = 'DELETE FROM public."Organization" where id_organization != 786133502888280066';
            await prisma.$queryRawUnsafe(sql)
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}