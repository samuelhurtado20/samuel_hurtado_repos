import { Request, Response } from 'express'
import MetricService from '../services/metric.service';
import { MetricDTO } from '../types/dtos/metric.dto';
import ResponseDTO from "../types/dtos/response.dto";

const service = new MetricService();

export default class MetricController {

    public async Filter (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            const result = await service.Filter(Number(id))
            
            if (result === null ) res.status(404).json(new ResponseDTO(true, 'Not found', null));

            const data = new MetricDTO(result).convert();
            res.status(200).json(new ResponseDTO(true, '', data));
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async GetAll (_req: Request, res: Response) 
    {
        try {
            const result = await service.GetAll(); 
            const data = Array(); 
            result.forEach(element => {
                data.push(new MetricDTO(element).convert())
            });

            res.status(200).json(new ResponseDTO(true, '', data));
        } catch (e) {
            console.log(e)
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
    
    public async Insert (req: Request, res: Response) 
    {
        try {
            var result = service.Insert(req.body)
            res.status(201).json(new ResponseDTO(true, '', result))
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }
}