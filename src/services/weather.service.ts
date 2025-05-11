import axios from "axios";

const client = axios.create({
    baseURL: 'https://api.pequla.com',
    headers: {
        'Content-Type': 'application/json'
    }
})

export class WeatherService{
    static async geocode(dest: string){
        return await client.get('/here/geocode?q=' + dest.toLowerCase().split(' ')[0]);
    }

    static async getWeatherData(pos: any){
        return await client.get('/weather?lat=' + pos.lat + '&lon=' + pos.lon)
    }
}