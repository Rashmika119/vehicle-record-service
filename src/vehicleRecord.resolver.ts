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
import { VehicleRecordUpdateDTO } from './dto/update-vehicleRecord.input';
@Resolver(() => VehicleRecord)
export class VehicleRecordResolver {
  constructor(private vehicleRecordService: VehicleRecordService) { }

  @Query(() => [VehicleRecord], { name: 'getAllVehicleRecords' })
  findAll() {
    console.log("findAll called")
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
  @Query(() => [VehicleRecord], { name: "findVehicleRecordByVin" })
  findVehcleByVin(@Args("vin") vin: string) {
    return this.vehicleRecordService.forAllByVin(vin)
  }
  @Mutation(() => Boolean, { name: 'removeVehicleRecord' })
  remove(@Args('id') id: string) {
    return this.vehicleRecordService.remove(id);
  }
  @Mutation(() => VehicleRecord, { name: 'updateVehicleRecord' })
  async updateVehicleRecord(
    @Args('id') id: string,
    @Args('updateData') updateData: VehicleRecordUpdateDTO,
  ): Promise<VehicleRecord> {
    console.log('Resolver: Updating vehicle record', id);
    return this.vehicleRecordService.update(id, updateData);
  }
  @ResolveField((of) => Vehicle)
  vehicle(@Parent() vehicleRecord: VehicleRecord) {
    return { __typename: 'Vehicle', vin: vehicleRecord.vin };
  }

}
