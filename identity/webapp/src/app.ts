/* eslint-disable @typescript-eslint/no-var-requires, import/first */
// This needs to be the first module loaded in the application

require('@weco/common/services/apm/initApm')('identity-server');

import Koa from 'koa';
import json from 'koa-json';
import logger from 'koa-logger';
import Router from '@koa/router';
import next from 'next';
import { apmErrorMiddleware } from '@weco/common/services/apm/errorMiddleware';
import { init as initServerData } from '@weco/common/server-data';

/* eslint-enable @typescript-eslint/no-var-requires, import/first */

export async function createApp(): Promise<Koa> {
  const isProduction = process.env.NODE_ENV === 'production';
  await initServerData();

  const nextApp = next({
    dev: !isProduction,
  });
  const nextHandler = nextApp.getRequestHandler();
  await nextApp.prepare();

  const app = new Koa();
  app.proxy = isProduction;
  app.use(apmErrorMiddleware);

  app.use(json({ pretty: process.env.NODE_ENV !== 'production' }));
  app.use(logger());

  const router = new Router();
  router.all('(.*)', async ctx => {
    await nextHandler(ctx.req, ctx.res);
    ctx.respond = false;
  });

  app.use(router.routes()).use(router.allowedMethods());

  process.on('SIGINT', async () => {
    // Close any connections and clean up.
    process.exit(0);
  });

  return app;
}
