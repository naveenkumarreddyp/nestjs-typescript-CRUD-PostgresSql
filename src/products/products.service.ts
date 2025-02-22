import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './model/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  async createProduct(productData: CreateProductDto): Promise<Product> {
    return Product.query().insert({
      ...productData,
      isActive: true,
    });
  }

  async getProducts(
    page: number,
    limit: number,
    sort: string = 'id',
    search: string,
  ): Promise<{ data: Product[]; total: number }> {
    const offset = (page - 1) * limit;
    let query = Product.query().where('isActive', true);

    if (search) {
      const [searchField, searchValue] = search.split(':'); 
      // console.log(searchField, searchValue, search);
      if (searchField && searchValue) {
        if (searchField === 'id') {
          query = query.where(searchField, parseInt(searchValue));
        } else {
          query = query.where(searchField, 'ilike', `%${searchValue}%`); 
        }
      }
    }

    const total = await query.resultSize();

    const [sortField, sortOrder] = sort.split(':');
    // console.log(sortField, sortOrder, sort)
    const order = sortOrder === 'desc' ? 'desc' : 'asc';

    const data = await query
      .orderBy(sortField || 'id', order)
      .limit(limit)
      .offset(offset);

    return { data, total };
  }

  async getProductById(id: number): Promise<Product> {
    const product = await Product.query().findById(id).where('isActive', true);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateProduct(id: number, updatedProductData: UpdateProductDto): Promise<Product> {
    const updatedProduct = await Product.query().patchAndFetchById(id, {
      ...updatedProductData,
      updatedAt: new Date(),
    });
    if (!updatedProduct) throw new NotFoundException('Product not found');
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await Product.query().findById(id);
    if (!product) throw new NotFoundException('Product not found');

    await Product.query().patchAndFetchById(id, { isActive: false });
    return { message: 'Product soft deleted successfully' };
  }
  async insertMultiple(products: any[]) {
    return await Product.query().insert(products);
  }
}
