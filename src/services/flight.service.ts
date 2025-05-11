import axios from "axios";

const client = axios.create({
    baseURL: 'https://flight.pequla.com/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
});

export class FlightService{

    static async getAllFlights(page = 0, size = 30){
        return await client.get(`/flight?page=${page}&size=${size}&sort=scheduledAt,asc`);
    }

    static async getFlightById(id: number){
        return await client.get('/flight/' + id);
    }

}