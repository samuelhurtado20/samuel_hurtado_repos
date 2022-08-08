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
  }