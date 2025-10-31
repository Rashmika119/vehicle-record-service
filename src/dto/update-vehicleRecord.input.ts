import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class VehicleRecordUpdateDTO {
    @Field({nullable: true})
    category: string

    @Field({nullable: true})
    repair_date: Date

    @Field({nullable: true})
    description: string

}