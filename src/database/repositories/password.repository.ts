import { Password } from '../entities/password.entity';
import { dataSource } from '../ormconfig';

export const PasswordRepository = dataSource.getRepository(Password).extend({});
