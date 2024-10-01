import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as proxy from 'http-proxy-middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        proxy.createProxyMiddleware({
          target: 'http://localhost:3002',
          changeOrigin: true,
        }),
      )
      .forRoutes('/auth');

    consumer
      .apply(
        proxy.createProxyMiddleware({
          target: 'http://localhost:3001',
          changeOrigin: true,
        }),
      )
      .forRoutes('/api/superhero');
  }
}
