import { Get, Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  // private readonly axios:AxiosInstance=axios;
  // private readonly pokemonService:PokemonService
  constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel:Model<Pokemon>,
        private readonly http:AxiosAdapter

  ){
  }

  async executeSeed() {
    // NOTE: fetch solo funciona con la version de node 18
    // console.log(fetch);
    await this.pokemonModel.deleteMany({})//delete * from pokemon
    // const {data}=await this.axios.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`)
    const data=await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=650`)
// NOTE:Segunda Forma
    const pokemonToInsert:{name:string,no:number}[]=[]
    data.results.forEach(async({name,url})=>{
      // console.log({name,url});
      const segments=url.split('/')
      console.log(segments);
      const no:number=+segments[segments.length-2]
      console.log({name,no});
      // const pokemon=await this.pokemonModel.create({name,no});
      pokemonToInsert.push(({name,no}))//[{name:bulbasaur,no:1}]
    })
    await this.pokemonModel.insertMany(pokemonToInsert)
    // Insert int pokemon (name,no)
    // (name:bulbasaur,no1)
    // (name:bulbasaur,no1)

    return 'Seed Executed'

// NOTE:Primera Forma
    // const insertPromiseArray=[]
    // data.results.forEach(async({name,url})=>{
    //   // console.log({name,url});
    //   const segments=url.split('/')
    //   console.log(segments);
    //   const no:number=+segments[segments.length-2]
    //   console.log({name,no});
    //   // const pokemon=await this.pokemonModel.create({name,no});
    //   insertPromiseArray.push(this.pokemonModel.create({name,no}))
    // })
    // await Promise.all(insertPromiseArray)
    // return 'Seed Executed'
    // <--------------------------------------------------------->
    // return data.results
    // return `This action returns all seed executed`;
  }

}
