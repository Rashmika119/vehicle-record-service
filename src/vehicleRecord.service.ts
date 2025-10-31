import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleRecordCreateDTO } from './dto/create-vehicleRecord.input';
import { VehicleRecord } from './entity/vehicleRecord.entity';
import { HttpService } from '@nestjs/axios';
import { VehicleRecordSearchDTO } from './dto/search-vehicleRecord.input';

@Injectable()
export class VehicleRecordService {

  constructor(@InjectRepository(VehicleRecord) private vehicleRecordRepository: Repository<VehicleRecord>,
    private readonly httpService: HttpService) {}

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

  async forAllByVin(id: string) {
    return await this.vehicleRecordRepository.find({ where: { vin: id } })
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
