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

      // checking products table and creating
      await this.createTableIfNotExists();
      
    } catch (error) {
      this.logger.error('Database connection failed:', error);
      process.exit(1); 
    }
  }

// checking products table and creating
  private async createTableIfNotExists() {
    const exists = await knexInstance.schema.hasTable('products');
    if (!exists) {
      this.logger.log('Creating products table...');
      await knexInstance.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('category');
        table.text('description');
        table.decimal('price', 10, 2);
        table.integer('stock').defaultTo(0);
        table.boolean('isActive').defaultTo(true);
        table.timestamp('createdAt').defaultTo(knexInstance.fn.now());
        table.timestamp('updatedAt').defaultTo(knexInstance.fn.now());
      });
      this.logger.log('Products table created successfully.');
    } else {
      this.logger.log('Products table already exists.');
    }
  }
}
