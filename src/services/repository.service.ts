import { Repository, PrismaClient } from '@prisma/client'
import { RepositoryDTO } from '../types/dtos/repository.dto';
import { State } from '../types/enums/state.enum';
const prisma = new PrismaClient()

export default class RepositoryService 
{
    public async Filter(id: Number) {
        const year = new Date().getFullYear();
        try {
            const tribeDB = await prisma.repository.findMany({
                where: {
                    id_repository: Number(id),
                },
                include: {
                    Metric: true,
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

    public async GetAll() {
        try {
            const result = await prisma.tribe
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

    public async Update(id: Number, repository: Repository) {
        try {
            const result = await prisma.repository.update({
                where: { id_repository: Number(id) },
                data: repository,
            })
            return result
        } catch (e) {
            throw e
        }
    }

    public async Delete(id: Number) {
        try {
            const result = await prisma.repository.delete({
                where: { id_repository: Number(id) }
            })
            return result
        } catch (e) {
            throw e
        }
    }
}