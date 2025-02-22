import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import knexInstance from './db/database';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() {
    try {
      this.logger.log('Initializing database connection...');
      
      // Connecting DB with knex
      const result = await knexInstance.select(knexInstance.raw('version()')).first();
      
      if (result) {
        this.logger.log(`Database connected! Version: ${result["version"]}`);
      } else {
        throw new Error('Database connection check failed.');
      }
    } catch (error) {
      this.logger.error('Database connection failed:', error);
      process.exit(1); 
    }
  }
}
