import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Vehicle } from "./entity/vehicle.entity";
import { VehicleRecordService } from "./vehicleRecord.service";
import { VehicleRecord } from "./entity/vehicleRecord.entity";

@Resolver((of) => Vehicle)
export class VehicleResolver {
    constructor(private readonly vehicleRecordService: VehicleRecordService) { }

    @ResolveField((of) => [VehicleRecord])
    vehicleRecords(@Parent() vehicle: Vehicle): Promise<VehicleRecord[]> {
        return this.vehicleRecordService.forAllByVin(vehicle.vin)
    }


}