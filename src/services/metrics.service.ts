import { Metrics, PrismaClient } from '@prisma/client'
import { MetricsDTO } from '../types/dtos/metrics.dto';
import { Status } from '../types/enums/status.enum';
const prisma = new PrismaClient()

export default class MetricsService 
{
    public async GetById(id: Number) {
        try {
            const result = await prisma.tribe
                .findUnique({
                    where: {
                        id_tribe: Number(id)
                    }
                })

            return result;
        } catch (e) {
            throw e
        }
    }
}