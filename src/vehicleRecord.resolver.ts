import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Info,
} from '@nestjs/graphql';
import { VehicleRecord } from './entity/vehicleRecord.entity';
import { VehicleRecordService } from './vehicleRecord.service';
import { VehicleRecordCreateDTO } from './dto/create-vehicleRecord.input';
import { Vehicle } from './entity/vehicle.entity';
@Resolver(() => VehicleRecord)
export class VehicleRecordResolver {
  constructor(private vehicleRecordService: VehicleRecordService) {}

  @Query(() => [VehicleRecord], { name: 'getAllVehicleRecords' })
  findAll() {
    return this.vehicleRecordService.findAll();
  }

  @Mutation(() => VehicleRecord, { name: 'createVehicleRecord' })
  create(@Args('vehicleRecordInput') vehicleRecord: VehicleRecordCreateDTO) {
    return this.vehicleRecordService.create(vehicleRecord);
  }
  @Query(() => VehicleRecord, { name: "findVehicleRecordById" })
  findOne(@Args("id") id: string) {
    return this.vehicleRecordService.findOne(id)
  }
  @Query(() => VehicleRecord, { name: "findVehicleRecordByVin" })
  findVehcleByVin(@Args("vin") vin: string) {
    return this.vehicleRecordService.forAllByVin(vin)
  }

  // @Query(()=>VehicleRecord,{name:'findByVin'})
  // findOne(@Args('vin'))

  @ResolveField((of) => Vehicle)
  vehicle(@Parent() vehicleRecord: VehicleRecord) {
    return { __typename: 'Vehicle',vin: vehicleRecord.vin };
  }

}
