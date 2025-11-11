import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Info,
} from '@nestjs/graphql';
import {
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { VehicleRecord } from './entity/vehicleRecord.entity';
import { VehicleRecordService } from './vehicleRecord.service';
import { VehicleRecordCreateDTO } from './dto/create-vehicleRecord.input';
import { Vehicle } from './entity/vehicle.entity';
import { VehicleRecordUpdateDTO } from './dto/update-vehicleRecord.input';
@Resolver(() => VehicleRecord)
export class VehicleRecordResolver {
  private readonly logger = new Logger(VehicleRecordResolver.name);
  constructor(private vehicleRecordService: VehicleRecordService) { }

  @Query(() => [VehicleRecord], { name: 'getAllVehicleRecords' })
  async findAll():Promise<VehicleRecord[]> {
    this.logger.log('Fetching all vehicle records...');
    try {
      const records = await this.vehicleRecordService.findAll();
      this.logger.log(`Fetched ${records.length} records successfully`);
      return records;
    } catch (error) {
      this.logger.error('Failed to fetch all vehicle records', error.stack);
      throw new InternalServerErrorException('Cant fetch the vehicle record details')
    }
  }

  @Mutation(() => VehicleRecord, { name: 'createVehicleRecord' ,nullable:true})
  async create(@Args('vehicleRecordInput') vehicleRecord: VehicleRecordCreateDTO):Promise<VehicleRecord|null> {
        this.logger.log('Creating a new vehicle record...');
    try {
      const record = await this.vehicleRecordService.create(vehicleRecord);
      this.logger.log(`Vehicle record created successfully with ID: ${record.id}`);
      return record;
    } catch (error) {
      this.logger.error('Failed to create vehicle record', error.stack);
      throw new InternalServerErrorException('cant create a vehicle')
      
    }
  }

  @Query(() => VehicleRecord, { name: "findVehicleRecordById" })
  async findOne(@Args("id") id: string):Promise<VehicleRecord|null> {
        this.logger.log(`Fetching vehicle record by ID: ${id}`);
    try {
      const record = await this.vehicleRecordService.findOne(id);
      if (!record) {
        this.logger.warn(`Vehicle record with ID ${id} not found`);
        throw new NotFoundException(`Vehicle record with ID ${id} not found`);
      }
      this.logger.log(`Vehicle record with ID ${id} fetched successfully`);
      return record;
    } catch (error) {
      this.logger.error(`Error fetching vehicle record with ID ${id}`, error.stack);
      throw new InternalServerErrorException('cant find a vehicel with yhe id',id)
    }
  }


  @Query(() => [VehicleRecord], { name: "findVehicleRecordByVin" })
  async findVehcleByVin(@Args("vin") vin: string):Promise<VehicleRecord[]> {
        this.logger.log(`Fetching vehicle records by VIN: ${vin}`);
    try {
      const records = await this.vehicleRecordService.forAllByVin(vin);
      this.logger.log(`Fetched ${records.length} records for VIN: ${vin}`);
      return records;
    } catch (error) {
      this.logger.error(`Error fetching vehicle records by VIN: ${vin}`, error.stack);
      throw new InternalServerErrorException("can't find a vehicle with vin: ",vin)
    }
  }


  @Mutation(() => Boolean, { name: 'removeVehicleRecord' })
  async remove(@Args('id') id: string):Promise<boolean> {
        this.logger.log(`Removing vehicle record with ID: ${id}`);
    try {
      const result = await this.vehicleRecordService.remove(id);
      this.logger.log(`Vehicle record with ID ${id} removed successfully`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to remove vehicle record with ID ${id}`, error.stack);
      throw new InternalServerErrorException(`can't remove the vehicle record with id:${id} ` )
    }
  }


  @Mutation(() => VehicleRecord, { name: 'updateVehicleRecord' })
  async updateVehicleRecord(
    @Args('id') id: string,
    @Args('updateData') updateData: VehicleRecordUpdateDTO,
  ): Promise<VehicleRecord|null> {
        this.logger.log(`Updating vehicle record with ID: ${id}`);
    try {
      const updatedRecord = await this.vehicleRecordService.update(id, updateData);
      this.logger.log(`Vehicle record with ID ${id} updated successfully`);
      return updatedRecord;
    } catch (error) {
      this.logger.error(`Failed to update vehicle record with ID ${id}`, error.stack);
      throw new InternalServerErrorException(`Can't update vehicle record with id: ${id}`)
    }
  }
  // @ResolveField((of) => Vehicle)
  // vehicle(@Parent() vehicleRecord: VehicleRecord) {
  //   this.logger.debug(`Resolving vehicle field for VIN: ${vehicleRecord.vin}`);
  //   return { __typename: 'Vehicle', vin: vehicleRecord.vin };
  // }

}
