import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class VehicleRecordSearchDTO {
    @Field()
    vin: string

}