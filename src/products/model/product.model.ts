import { Model } from 'objection';

export class Product extends Model {
  static tableName = 'products';

  id!: number;
  name!: string;
  category!: string;
  description!: string;
  price!: number;
  stock!: number;
  isActive!: boolean;

  static get idColumn() {
    return 'id';
  }
}
