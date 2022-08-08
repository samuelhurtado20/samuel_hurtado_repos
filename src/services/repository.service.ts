import { Repository, PrismaClient } from '@prisma/client'
import { RepositoryDTO } from '../types/dtos/repository.dto';
import { State } from '../types/enums/state.enum';
const prisma = new PrismaClient()

export default class RepositoryService 
{
    public async Filter(id: bigint) {
        try {
            const repoDB = await prisma.repository.findMany({
                where: {
                    id_repository: id,
                },
                include: {
                    Metric: true,
                }
            })

            return repoDB;
        } catch (e) {
            throw e
        }
    }

    public async GetById(id: bigint) {
        try {
            const result = await prisma.repository
                .findUnique({
                    where: {
                        id_repository: id,
                    },
                })

            return result;
        } catch (e) {
            throw e
        }
    }

    public async GetAll() {
        try {
            const result = await prisma.repository
                .findMany()

            return result;
        } catch (e) {
            throw e
        }
    }

    public async Insert(repository: Repository) {
        try {
            const result = await prisma.repository.create({
                data: {
                    name: repository.name,
                    status: repository.status,
                    state: repository.state,
                    Tribe: {
                        connect: { id_tribe: repository.id_tribe },
                      },
                },
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Update(id: bigint, repository: Repository) {
        try {
            const result = await prisma.repository.update({
                where: { id_repository: id },
                data: repository,
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Delete(id: bigint) {
        try {
            const result = await prisma.repository.delete({
                where: { id_repository: id }
            })
            return result
        } catch (e) {
            throw e
        }
    }
}