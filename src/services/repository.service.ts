import { Repository, PrismaClient } from '@prisma/client'
import { RepositoryDTO } from '../types/dtos/repository.dto';
import { State } from '../types/enums/state.enum';
const prisma = new PrismaClient()

export default class RepositoryService 
{
    public async Filter(id: bigint) {
        const year = new Date().getFullYear();
        try {
            const repoDB = await prisma.repository.findMany({
                where: {
                    id_repository: Number(id),
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
                data: repository,
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