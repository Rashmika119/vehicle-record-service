import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleRecordCreateDTO } from './dto/create-vehicleRecord.input';
import { VehicleRecord } from './entity/vehicleRecord.entity';
import { HttpService } from '@nestjs/axios';
import { VehicleRecordSearchDTO } from './dto/search-vehicleRecord.input';
import { VehicleRecordUpdateDTO } from './dto/update-vehicleRecord.input';

@Injectable()
export class VehicleRecordService {
 
  constructor(@InjectRepository(VehicleRecord) private vehicleRecordRepository: Repository<VehicleRecord>,
    private readonly httpService: HttpService) { }

  async findAll(): Promise<VehicleRecord[]> {
    return this.vehicleRecordRepository.find();
  }
  async findOne(id: string) {
    return this.vehicleRecordRepository.findOne({ where: { id: id } })
  }

  async create(vehicleRecord: VehicleRecordCreateDTO): Promise<VehicleRecord> {

    let record = this.vehicleRecordRepository.create(vehicleRecord);
    return this.vehicleRecordRepository.save(record)

  }

  async forAllByVin(vin: string) {
    return await this.vehicleRecordRepository.find({ where: { vin : vin } })
  }

async update(id: string, vehicleRecordUpdateDTO: VehicleRecordUpdateDTO): Promise<VehicleRecord> {
  console.log('Updating vehicle record:', id, vehicleRecordUpdateDTO);

  const existingVehicleRecord = await this.vehicleRecordRepository.findOne({ where: { id } });

  if (!existingVehicleRecord) {
    throw new NotFoundException(`Vehicle record with id ${id} not found`);
  }
  const vehicleRecordToUpdate = this.vehicleRecordRepository.merge(
    existingVehicleRecord,
    vehicleRecordUpdateDTO 
  );

  const savedVehicleRecord = await this.vehicleRecordRepository.save(vehicleRecordToUpdate);
  console.log('Vehicle record updated successfully');

  return savedVehicleRecord;
}


  async remove(id: string): Promise<boolean> {
    console.log('Deleting vehicle record with id:', id);

    const vehicleRecord = await this.findOne(id);

    if (!vehicleRecord) {
      throw new NotFoundException(`Vehicle record with id ${id} not found`);
    }

    const result = await this.vehicleRecordRepository.delete(id);

    if (result.affected === 1) {
      console.log('Vehicle record deleted successfully');
      return true;
    }

    throw new Error(`Failed to delete vehicle record with id ${id}`);
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
