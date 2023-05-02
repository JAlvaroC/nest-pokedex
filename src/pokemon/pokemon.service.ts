import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import mongoose, { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDTO } from '../common/dto/paginationn.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit:number
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
    private readonly configService:ConfigService
  ){
    // Obtener valor directamete o a tarves de ConfigService
    // console.log(process.env.DEFAULT_LIMIT);
    // console.log(configService.getOrThrow('jwt-seed'));//noexiste botara error
    // console.log(configService.getOrThrow('jwt-seed'));
    // console.log(configService.get('defaultLimit'));
    // const defaultLimit=configService.get<number>('defaultLimit')
    this.defaultLimit=configService.get<number>('defaultLimit')
    // console.log(this.defaultLimit);
    console.log({defaultLimit: configService.get<number>('defaultLimit')});
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name=createPokemonDto.name.toLocaleLowerCase();
    try {
      
      const pokemon=await this.pokemonModel.create(createPokemonDto);
      return pokemon
    } catch (error) {
      console.log(error);
      // NOTE:reduciendo codigo
    //   if (error.code===11000) {
    //     throw new BadRequestException(`Pokemon exits in db ${JSON.stringify(error.keyValue)}`)
    //   }
    //   console.log(error);
    //   throw new InternalServerErrorException(`Can't create Pokemon-Check server Logs `)
    this.handleExceptions(error)
    }

  }

  findAll(paginationDTO:PaginationDTO) {
    
    const {limit=this.defaultLimit,offset=0}=paginationDTO
    // const {limit=this.configService.get<number>('defaultLimit'),offset=0}=paginationDTO
    // const {limit=+process.env.DEFAULT_LIMIT,offset=0}=paginationDTO
    // const {limit=5,offset=0}=paginationDTO
    // const {limit=+process.env.DEFAULT_LIMIT,offset=0}=paginationDTO

    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort(
      {
        no:1
      }
    ).select('-__v')
    
    // return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon:Pokemon;
    if (!isNaN(+term)) {
      pokemon=await this.pokemonModel.findOne({no:term})
    }
    // MongoID
    if (!pokemon && isValidObjectId(term)) {
      pokemon=await this.pokemonModel.findById(term)
    }
    // Name
    if (!pokemon) {
      pokemon=await this.pokemonModel.findOne({name:term.toLocaleLowerCase().trim()})
    }

    if (!pokemon) {
      throw  new NotFoundException(`Pokemon with id,name or no "${term}" not found`)
    }

    return pokemon
    // return `This action returns a #${term} pokemon`;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon=await this.findOne(term);    
    if (updatePokemonDto.name) {
      updatePokemonDto.name=updatePokemonDto.name.toLocaleLowerCase()
      // const updatedPokemon=await pokemon.updateOne(updatePokemonDto,{new:true})
    }
    try {
       await pokemon.updateOne(updatePokemonDto)
        // return updatedPokemon
        return {...pokemon.toJSON(),...updatePokemonDto}
      
      
    } catch (error) {
       console.log(error);
       this.handleExceptions(error)
    }
    // this.pokemonModel.findById(term)
    // return `This action updates a #${id} pokemon`;
  }

  async remove(id: string) {
    // const pokemon=await this.findOne(id)
    // await pokemon.deleteOne();
    // const result=await this.pokemonModel.findByIdAndDelete(id)
    // const result=await this.pokemonModel.deleteOne({_id:id})
    const {deletedCount}=await this.pokemonModel.deleteOne({_id:id})
    if (deletedCount===0) {
      throw new BadRequestException(`Pokemon with id ${id } not found`)
    }
    // return `This action removes a #${id} pokemon`;
    // return {id};
    // return result
    return
  }
  // fillPokemonsWithSeedData(pokemons:Pokemon[]){
  //   this.pokemons=pokemons
  // }
  fillPokemonsWithSeedData(pokemonModel:Pokemon[]){
    // this.pokemonModel=pokemonModel
  }

  private handleExceptions(error:any){
    if (error.code===11000) {
      throw new BadRequestException(`Pokemon exits in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon-Check server Logs `)
  }
}
