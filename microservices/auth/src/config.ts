import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
  return {
    database: {
      host: process.env.TYPEORM_HOST,
      dbName: process.env.TYPEORM_DATABASE,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      user: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      entities: process.env.TYPEORM_ENTITIES,
      migrations: process.env.TYPEORM_MIGRATIONS,
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    },
    activationHash: {
      expirationTime: process.env.HASH_EXPIRATION_MINUTES,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
      passLength: process.env.PASSWORD_LENGTH,
      strategyUsernameField: process.env.JWT_STRATEGY_USERNAME_FIELD,
      strategyPasswordField: process.env.JWT_STRATEGY_PASSWORD_FIELD,
    },
    seeder: {
      userEncryptedPassword: process.env.USER_SEED_PASSWORD,
    },
  };
});
