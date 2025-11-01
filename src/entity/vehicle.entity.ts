import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { VehicleRecord } from "./vehicleRecord.entity";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "vin")')
export class Vehicle {

    @Field()
    @Directive('@external')
    vin: string

    @Field((type) => [VehicleRecord])
    vehicleRecords?: VehicleRecord[]

}