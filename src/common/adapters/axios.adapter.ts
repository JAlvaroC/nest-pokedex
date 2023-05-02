import axios, { AxiosInstance } from 'axios';
import { Injectable } from '@nestjs/common';
// import { HttpAdapter } from '../../../dist/common/interfaces/http-adapter.interface';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
// Envboltorio de  codgio con mi codigo para ayudar a cambiar
@Injectable()
export class AxiosAdapter implements HttpAdapter{
    private  axios:AxiosInstance=axios;
    async get<T>(url: string): Promise<T> {
        // throw new Error('Method not implemented.');
        try {
            const {data}=await this.axios.get<T>(url)
            return data
        } catch (error) {
            throw new Error('This is an error - Check logs')
        }
    }

}