import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apiToken: process.env.SUPERHERO_API_TOKEN,
  };
});
