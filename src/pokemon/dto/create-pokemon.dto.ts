import { MinLength ,IsInt,IsPositive,Min,IsString} from "class-validator";

export class CreatePokemonDto {
    // @IsI
    @IsInt()
    @IsPositive()
    @Min(1)
    no:number;

    
    @MinLength(1)
    @IsString()
    name:string

}
