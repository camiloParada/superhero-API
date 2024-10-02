import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { addHours } from 'date-fns';
import { v4 as uuid4 } from 'uuid';

import config from '../../config';
import { User } from '../../api/users/entities/user.entity';
import { UserHasPassword } from '../../api/users/entities/user-has-password.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);
    const activationHash = uuid4();
    const today = new Date();
    const expirationHash = addHours(today, 2);

    await repository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: uuid4().replace(/-/g, '').toUpperCase(),
          firstname: 'Camilo',
          lastname: 'Parada',
          email: 'desarrollo@camiloparada.com',
          activationHash,
          expirationHash,
          status: 'ACTIVE',
          role: 1,
        },
      ])
      .orIgnore()
      .execute();

    const user = await repository
      .createQueryBuilder()
      .select('user.id', 'id')
      .where('user.email = :email', { email: 'desarrollo@camiloparada.com' })
      .getRawOne();

    if (user) {
      await repository
        .createQueryBuilder()
        .insert()
        .into(UserHasPassword)
        .values([
          {
            password: config().seeder.userEncryptedPassword,
            user: user.id,
            status: 'ACTIVE',
          },
        ])
        .orIgnore()
        .execute();
    }
  }
}
