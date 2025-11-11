import { Field, InputType } from "@nestjs/graphql"
import { IsString, IsInt, Min, IsDateString } from 'class-validator';

@InputType()
export class VehicleRecordCreateDTO {
    @Field()
    @IsString()
    vin: string

    @Field()
    @IsString()
    category: string

    @Field()
    @IsDateString()
    repair_date: Date

    @Field()
    @IsString()
    description: string

}