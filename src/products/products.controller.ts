import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @Get()
  getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort = 'id',
    @Query('search') search = ''
  ) {
    return this.productsService.getProducts(+page, +limit, sort, search);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.productsService.getProductById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.updateProduct(+id, dto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.productsService.deleteProduct(+id);
  }
}
