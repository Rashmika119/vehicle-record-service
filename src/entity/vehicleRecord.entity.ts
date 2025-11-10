import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';


@ObjectType()
@Directive('@key(fields: "id")')
@Entity('VehicleRecord')
export class VehicleRecord {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  vin: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  repair_date: Date;

  @Field()
  @Column()
  description: string;

  // @Field(() => Vehicle)
  // vehicle?: Vehicle;

}
