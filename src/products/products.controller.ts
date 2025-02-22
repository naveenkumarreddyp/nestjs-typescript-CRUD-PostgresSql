import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { Express } from 'express';
import * as path from 'path';
import * as multer from 'multer';
import * as csvParser from 'csv-parser';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // -- INSERT PRODUCT DATA
  @Post()
  create(@Body() productPayload: CreateProductDto) {
    return this.productsService.createProduct(productPayload);
  }

  // -- FETCH DATA WITH FILTERS
  @Get()
  getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'id',
    @Query('search') search = ''
  ) {
    return this.productsService.getProducts(+page, +limit, sort, search);
  }

  // GET DATA BY ID API
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.productsService.getProductById(+id);
  }

  // -- UPDATE BY ID API
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatedProductPayload: UpdateProductDto) {
    return this.productsService.updateProduct(+id, updatedProductPayload);
  }

  // -- DELETE BY ID API
  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.productsService.deleteProduct(+id);
  }

  // -- CSV Upload API
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination: './uploads', 
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const filePath = path.join(__dirname, '../../uploads', file.filename); 
    // console.log("--Filepath--", filePath)
    const products = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => products.push(row))
        .on('end', async () => {
          // console.log("--products-- ", products)
          await this.productsService.insertMultiple(products);
          resolve({ message: 'Products uploaded successfully', count: products.length });

          // fs.unlinkSync(filePath);  
        })
        .on('error', (error) => reject(error));
    });
  }
}
