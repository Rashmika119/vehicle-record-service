import { Field, InputType } from "@nestjs/graphql"
import { IsDateString, IsString } from "class-validator"

@InputType()
export class VehicleRecordUpdateDTO {
    @Field({nullable: true})
    @IsString()
    category: string

    @Field({nullable: true})
    @IsDateString()
    repair_date: Date

    @Field({nullable: true})
    @IsString()
    description: string

}