import { Request, Response } from 'express'
import MetricService from '../services/metric.service';
import { MetricDTO } from '../types/dtos/metric.dto';
import ResponseDTO from "../types/dtos/response.dto";
const converter = require('json-2-csv');
import fs from 'fs'
import path from 'path'
import TribeService from '../services/tribe.service';

const service = new MetricService();
const tribeService = new TribeService();

export default class MetricController 
{

    public async Csv (req: Request, res: Response) 
    {
        let id = req.params.id;
        try {
            const result = await service.Filter(BigInt(id))

            if (result === null ) res.status(404).json(new ResponseDTO(true, 'Not found', null));
            let filename = 'myFile.csv';
            let relPath = path.join('./csv', filename);

            converter.json2csv(result, (err: any, csv: any) => {
                if (err) {
                    throw err;
                }            
                fs.writeFile(relPath, csv, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    res.download(relPath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                        fs.unlink(relPath, (err) => {
                            if (err) {
                                console.log(err);
                            }
                            //console.log('FILE [' + filename + '] REMOVED!');
                        });
                    });
                });
                
            });
        } catch (e) {
            res.status(500).json(new ResponseDTO(false, 'Unexpected error', null));
        }
    }

    public async Filter (req: Request, res: Response) 
    {
        let id = req.params.id;
        try 
        {
            const tribe = await tribeService.GetById(BigInt(id));
            if(tribe === null)
            {
                res.status(404).json(new ResponseDTO(false, 'La Tribu no se encuentra registrada', null));
            }
            else
            {
                const result = await service.Filter(BigInt(id))
                if (result.length <= 0 ) 
                {
                    res.status(404).json(new ResponseDTO(false, 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria', null));    
                }
                else
                {
                    res.status(200).json(new ResponseDTO(true, '', result));
                }
            }
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