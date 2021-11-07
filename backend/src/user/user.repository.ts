import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }
}
