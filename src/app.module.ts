import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { StockLogModule } from './stock-log/stock-log.module';
import { CategoryModule } from './category/category.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '../database/database.module'; // Ensure the path is correct
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RequestModule } from './request/request.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer/entities/customer.entity';
import { Supplier } from './supplier/entities/supplier.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres' | 'mysql' | 'mongodb', // Adjust based on your DB type
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432), // Convert to a number using the unary `+` operator
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Customer, Supplier], // Add your entities here
      synchronize: true, // Set to false in production
    }),
    DatabaseModule,
    ProductModule,
    StockLogModule,
    CategoryModule,
    SupplierModule,
    OrderModule,
    OrderItemModule,
    CustomerModule,
    RequestModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use the secret from the environment variable
      signOptions: { expiresIn: '60s' }, // Set token expiration time as needed
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
