import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  };
});
