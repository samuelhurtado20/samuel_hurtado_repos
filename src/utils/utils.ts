import nock from "nock"
import axios from 'axios'

export default class Utils 
{
    static setMock() {
        nock('https://api.example.com')
            .get('/')
            .reply(200, {
                "repositories": [
                    {
                        "id": 1,
                        "state": 604
                    },
                    {
                        "id": 2,
                        "state": 605
                    },
                    {
                        "id": 3,
                        "state": 606
                    }
                ]
            }
            );
    }

    static async GetVerificationType() 
    {
        const res = await axios.get('https://api.example.com');

        return res.data;
    }

    static Convert(data: any): any {
        return JSON.parse(JSON.stringify(data, (_key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value
        ));
    }

    static CalPoints(data: string[]): number {
        var sum = 0;
        var custom = new Int32Array();
        data.forEach((element) => 
        {
            if(element.toUpperCase() === "+")
            {
                var newElem = parseInt(custom[custom.length - 1]) + parseInt(custom[custom.length - 2]);
                custom.push(newElem)
            }
            else
            {
                custom.push(element)
            }
        })
        console.log(custom)
        custom.forEach((element) => { sum += element })
        return sum;
    }

  }