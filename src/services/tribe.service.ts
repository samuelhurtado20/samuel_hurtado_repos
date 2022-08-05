import { Tribe, PrismaClient } from '@prisma/client'
import { TribeDTO } from '../types/dtos/tribe.dto';
import { State } from '../types/enums/state.enum';
const prisma = new PrismaClient()

export default class TribeService 
{
    public async Filter(id: bigint) {
        const year = new Date().getFullYear();
        try {
            const tribeDB = await prisma.tribe.findFirst({
                where: {
                    id_tribe: id,
                },
                include: {
                    Repository: {
                        where: {
                            state: State.Enable.toString(),
                            create_time: {
                                gte: new Date(year, 0, 1).toISOString(),
                                lte: new Date(year, 11, 31, 59, 59, 59, 999).toISOString(),
                            },
                        },
                        include:{
                            Metric: true
                        }
                    },
                }
            })

            return tribeDB;
        } catch (e) {
            throw e
        }
    }

    public async GetById(id: Number) {
        try {
            const result = await prisma.tribe
                .findUnique({
                    where: {
                        id_tribe: Number(id),
                    },
                })

            return result;
        } catch (e) {
            throw e
        }
    }

    public async GetAll(): Promise<Tribe[]> {
        try {
            const result = await prisma.tribe
                .findMany()

            return result;
        } catch (e) {
            throw e
        }
    }

    public async Insert(tribe: Tribe) {
        try {
            const result = await prisma.tribe.create({
                data: {
                    name: tribe.name,
                    status: tribe.status,
                    Organization: {
                        connect: {id_organization: BigInt(tribe.id_organization)},
                      },
                },
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Update(id: Number, tribe: Tribe) {
        try {
            const result = await prisma.tribe.update({
                where: { id_tribe: Number(id) },
                data: tribe,
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Delete(id: Number) {
        try {
            const result = await prisma.tribe.delete({
                where: { id_tribe: Number(id) }
            })
            return result
        } catch (e) {
            throw e
        }
    }
}