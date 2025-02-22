import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './model/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  async createProduct(dto: CreateProductDto): Promise<Product> {
    return Product.query().insert({
      ...dto,
      isActive: true,
    });
  }

  async getProducts(
    page: number,
    limit: number,
    sort: string,
    search: string
  ): Promise<{ data: Product[]; total: number }> {
    const offset = (page - 1) * limit;
    let query = Product.query().where('isActive', true);

    if (search) {
      query = query.where('name', 'ilike', `%${search}%`);
    }

    const total = await query.resultSize();
    const data = await query.orderBy(sort || 'id', 'asc').limit(limit).offset(offset);

    return { data, total };
  }

  async getProductById(id: number): Promise<Product> {
    const product = await Product.query().findById(id).where('isActive', true);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await Product.query().patchAndFetchById(id, dto);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await Product.query().findById(id);
    if (!product) throw new NotFoundException('Product not found');

    await Product.query().patchAndFetchById(id, { isActive: false });
    return { message: 'Product soft deleted successfully' };
  }
}
