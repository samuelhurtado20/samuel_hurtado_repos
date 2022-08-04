import { Request, Response } from 'express'
import { Metrics } from '@prisma/client';
import { Mapper } from "../types/mapper/mapper";
import MetricsService from '../services/metrics.service';
import { MetricsDTO } from '../types/dtos/metrics.dto';
import ResponseDTO from "../types/dtos/response.dto";

const mapper = new Mapper();
const service = new MetricsService();

export default class MetricsController {

    public async GetById (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            var result = await service.GetById(Number(id))
            
            if (result === null ) res.status(404).json(new ResponseDTO(true, 'Not found', null));

            let dto : MetricsDTO | null = null;
            //mapper.map<Metrics | null, MetricsDTO>(result, dto);

            res.status(200).json(new ResponseDTO(true, '', dto));
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
}