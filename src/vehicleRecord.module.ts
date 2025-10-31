import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleRecord } from './entity/vehicleRecord.entity';
import { Vehicle } from './entity/vehicle.entity';
import { VehicleRecordResolver } from './vehicleRecord.resolver';
import { VehicleRecordService } from './vehicleRecord.service';
import { MulterModule } from '@nestjs/platform-express';
import { HttpModule } from '@nestjs/axios';
import { VehicleResolver } from './vehicle.resolver';
 
@Module({
  imports: [TypeOrmModule.forFeature([VehicleRecord]),
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },
    plugins: [ApolloServerPluginInlineTrace()],
    buildSchemaOptions: {
      orphanedTypes: [Vehicle],
    },
  }),
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin1234',
      database: 'vehicle_record',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
        HttpModule,
  ],
  providers: [VehicleRecordResolver, VehicleRecordService, VehicleResolver],
})
export class VehicleRecordModule { }