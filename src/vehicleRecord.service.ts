import { Injectable, NotFoundException,Logger,InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleRecordCreateDTO } from './dto/create-vehicleRecord.input';
import { VehicleRecord } from './entity/vehicleRecord.entity';
import { HttpService } from '@nestjs/axios';
import { VehicleRecordSearchDTO } from './dto/search-vehicleRecord.input';
import { VehicleRecordUpdateDTO } from './dto/update-vehicleRecord.input';

@Injectable()
export class VehicleRecordService {
  private readonly logger = new Logger(VehicleRecordService.name);
  constructor(@InjectRepository(VehicleRecord) private vehicleRecordRepository: Repository<VehicleRecord>,
    private readonly httpService: HttpService) { }

  async findAll(): Promise<VehicleRecord[]> {
    this.logger.log("Fetching all vehiclerecords")
    try{
    const records =await this.vehicleRecordRepository.find();
    this.logger.log(`Fetched ${records.length} records successfully`)
    return records
    }
    catch(error){
      this.logger.error('Failed to fetch all the vehicle records..')
      throw new InternalServerErrorException('Failed to fetch vehicle records');
    }
  }
  async findOne(id: string):Promise<VehicleRecord> {
    this.logger.log(`Fetching vehicle record with id: ${id}`)
     try {
      const record = await this.vehicleRecordRepository.findOne({ where: { id } });
      if (!record) {
        this.logger.warn(`Vehicle record with id ${id} not found`);
        throw new NotFoundException(`Vehicle record with id ${id} not found`);
      }
      this.logger.log(`Vehicle record with id ${id} found successfully`);
      return record;
    } catch (error) {
      this.logger.error(`Error finding vehicle record with id ${id}`, error.stack);
      throw error;
    }
  }

  async create(vehicleRecord: VehicleRecordCreateDTO): Promise<VehicleRecord> {

    this.logger.log('Creating new vehicle record...');
    try {
      const record = this.vehicleRecordRepository.create(vehicleRecord);
      const savedRecord = await this.vehicleRecordRepository.save(record);
      this.logger.log(`Vehicle record created successfully with id: ${savedRecord.id}`);
      return savedRecord;
    } catch (error) {
      this.logger.debug('Failed to create vehicle record', error.stack);
      throw new InternalServerErrorException('Failed to create vehicle record');
    }

  }

  async forAllByVin(vin: string):Promise<VehicleRecord[]> {
        this.logger.log(`Fetching vehicle records by VIN: ${vin}`);
    try {
      const records = await this.vehicleRecordRepository.find({ where: { vin } });
      this.logger.log(`Fetched ${records.length} records for VIN: ${vin}`);
      return records;
    } catch (error) {
      this.logger.debug(`Error fetching vehicle records for VIN: ${vin}`, error.stack);
      throw new InternalServerErrorException(`Failed to fetch records for VIN: ${vin}`);
    }
  }

async update(id: string, vehicleRecordUpdateDTO: VehicleRecordUpdateDTO): Promise<VehicleRecord> {
    this.logger.log(`Updating vehicle record with id: ${id}`);
    try {
      const existing = await this.vehicleRecordRepository.findOne({ where: { id } });

      if (!existing) {
        this.logger.warn(`Vehicle record with id ${id} not found`);
        throw new NotFoundException(`Vehicle record with id ${id} not found`);
      }

      const updatedRecord = this.vehicleRecordRepository.merge(existing, vehicleRecordUpdateDTO);
      const savedRecord = await this.vehicleRecordRepository.save(updatedRecord);

      this.logger.log(`Vehicle record with id ${id} updated successfully`);
      return savedRecord;
    } catch (error) {
      this.logger.debug(`Failed to update vehicle record with id ${id}`, error.stack);
      throw new InternalServerErrorException(`Failed to update vehicle record with id ${id}`);
    }
}


  async remove(id: string): Promise<boolean> {
    this.logger.log(`Deleting vehicle record with id: ${id}`);
    try {
      const existing = await this.findOne(id);
      if (!existing) {
        this.logger.warn(`Vehicle record with id ${id} not found for deletion`);
        throw new NotFoundException(`Vehicle record with id ${id} not found`);
      }

      const result = await this.vehicleRecordRepository.delete(id);

      if (result.affected === 1) {
        this.logger.log(`Vehicle record with id ${id} deleted successfully`);
        return true;
      }

      this.logger.warn(`Delete operation for id ${id} did not affect any record`);
      throw new InternalServerErrorException(`Failed to delete vehicle record with id ${id}`);
    } catch (error) {
      this.logger.debug(`Error deleting vehicle record with id ${id}`, error.stack);
      throw error;
    }
  }


  //   async search(search:VehicleRecordSearchDTO): Promise<VehicleRecord[]> {
  //   const query = this.vehicleRecordRepository.createQueryBuilder('vehicle');
  //   console.log("searched car model:  ", search.vin)
  //   if (search?.vin) {
  //     query.where({ vin: `${search.vin}%` });
  //   }
  //   return query.getMany()
  // }

}
