import { Get, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {
  private readonly axios:AxiosInstance=axios;

  async executeSeed() {
    // NOTE: fetch solo funciona con la version de node 18
    // console.log(fetch);
    const {data}=await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=10`)
    data.results.forEach(({name,url})=>{
      // console.log({name,url});
      const segments=url.split('/')
      console.log(segments);
      const no:number=+segments[segments.length-2]
      console.log({name,no});
    })
    return data.results
    // return `This action returns all seed executed`;
  }

}
