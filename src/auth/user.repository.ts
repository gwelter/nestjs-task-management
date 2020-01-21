import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup({ username, password }: AuthCredentialsDto): Promise<void> {
    const user = new User();
    user.username = username;
    user.password = password;
    user.save();
  }
}
