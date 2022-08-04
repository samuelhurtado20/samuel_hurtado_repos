import { Organization, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { OrganizationMap } from "../types/mapper/organization.mapper";

let GetById = async (id: Number) : Promise<Organization> => {
    try {
        const result = await prisma.organization
            .findUnique({
                where: {
                    id_organization: Number(id),
                },
            })

        return OrganizationMap.toModel(result);
    } catch (e) {
        throw e
    }
}

let GetAll = async () : Promise<Organization[]> => {
    try {
        const result = await prisma.organization
            .findMany()

        return result.map((org) => OrganizationMap.toModel(org));
    } catch (e) {
        throw e
    }
}

let Insert = async (organization: Organization) => {
    try {
        const result = await prisma.organization.create({
            data: organization,
        })
        return result
    } catch (e) {
        throw e
    }
}

let Update = async (id: Number, organization: Organization) => {
    try {
        const result = await prisma.organization.update({
            where: { id_organization: Number(id) },
            data: organization,
        })
        return result
    } catch (e) {
        throw e
    }
}

let Delete = async (id: Number) => {
    try {
        const result = await prisma.organization.delete({
            where: { id_organization: Number(id) }
        })
        return result
    } catch (e) {
        throw e
    }
}

export default {
    Insert,
    GetAll,
    GetById,
    Update,
    Delete
}