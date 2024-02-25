import { Password } from '../entities/password.entity';
import { Secret } from '../entities/secret.entity';
import { dataSource } from '../ormconfig';

export const PasswordRepository = dataSource.getRepository(Password).extend({});
