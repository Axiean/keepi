import { Secret } from '../entities/secret.entity';
import { dataSource } from '../ormconfig';

export const SecretRepository = dataSource.getRepository(Secret).extend({});
