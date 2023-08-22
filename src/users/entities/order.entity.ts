import { Product } from '../../products/entities/product.entity';
import { User } from './user.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
