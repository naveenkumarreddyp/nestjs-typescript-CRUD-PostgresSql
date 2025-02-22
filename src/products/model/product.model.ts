import { Model } from 'objection';

export class Product extends Model {
  id!: number;
  name!: string;
  category?: string;
  description?: string;
  price!: number;
  stock!: number;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static get tableName() {
    return 'products';
  }

  static get idColumn() {
    return 'id';
  }

  // update `updatedAt` before saving
  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
