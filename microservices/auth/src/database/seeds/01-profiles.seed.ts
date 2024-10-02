import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';

import { Role } from '../../api/users/entities/role.entity';

export default class CreateProfiles implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Role);

    await repository
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { id: 1, role: 'ADMIN' },
        { id: 2, role: 'USER' },
      ])
      .orIgnore()
      .execute();
  }
}
