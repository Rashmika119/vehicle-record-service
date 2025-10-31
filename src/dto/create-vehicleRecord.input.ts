import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class VehicleRecordCreateDTO {
    @Field()
    vin: string

    @Field()
    category: string

    @Field()
    repair_date: Date

    @Field()
    description: string

}