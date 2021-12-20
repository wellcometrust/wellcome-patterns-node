/* eslint-disable @typescript-eslint/no-var-requires, import/first */
// This needs to be the first module loaded in the application
require('@weco/common/services/apm/initApm')('catalogue-server');

import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';

import {
  middleware,
  route,
  handleAllRoute,
  timers as middlewareTimers,
} from '@weco/common/koa-middleware/withCachedValues';
import { apmErrorMiddleware } from '@weco/common/services/apm/errorMiddleware';
import { init as initServerData } from '@weco/common/server-data';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const appPromise = nextApp.prepare().then(async () => {
  await initServerData();

  const koaApp = new Koa();
  const router = new Router();

  koaApp.use(apmErrorMiddleware);
  koaApp.use(middleware);

  // Used for redirecting from cognito to actual works pages
  router.get('/works/auth-code', async (ctx, next) => {
    const authRedirect = ctx.cookies.get('WC_auth_redirect');

    if (authRedirect) {
      const originalPathnameAndSearch = authRedirect.split('?');
      const originalPathname = originalPathnameAndSearch[0];
      const originalSearchParams = new URLSearchParams(
        originalPathnameAndSearch[1]
      );
      const requestSearchParams = new URLSearchParams(ctx.request.search);
      const code = requestSearchParams.get('code');

      if (code) {
        originalSearchParams.set('code', code);
      }

      ctx.status = 303;
      ctx.cookies.set('WC_auth_redirect', null);
      ctx.redirect(`${originalPathname}?${originalSearchParams.toString()}`);
      return;
    }

    return next();
  });

  // Next routing
  route('/works/progress', '/progress', router, nextApp);
  route('/works/:id', '/work', router, nextApp);
  route('/works', '/works', router, nextApp);
  route('/works/:workId/items', '/item', router, nextApp);
  route('/works/:workId/images', '/image', router, nextApp);
  route('/works/:workId/download', '/download', router, nextApp);

  router.get('/works/management/healthcheck', async ctx => {
    ctx.status = 200;
    ctx.body = 'ok';
  });

  router.get('*', handleAllRoute(handle));
  router.post(
    '/account/api/users/:userId/item-requests',
    handleAllRoute(handle)
  );

  koaApp.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  koaApp.use(router.routes());
  return koaApp;
});

export default appPromise;
export const timers = middlewareTimers as NodeJS.Timer[];
