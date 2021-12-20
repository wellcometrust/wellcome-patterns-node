/* eslint-disable @typescript-eslint/no-var-requires, import/first */
// This needs to be the first module loaded in the application
require('@weco/common/services/apm/initApm')('content-server');
import Koa from 'koa';
import Router from 'koa-router';
import next from 'next';
import Prismic from '@prismicio/client';
import { apmErrorMiddleware } from '@weco/common/services/apm/errorMiddleware';
import { init as initServerData } from '@weco/common/server-data';
import bodyParser from 'koa-bodyparser';
import handleNewsletterSignup from './routeHandlers/handleNewsletterSignup';
import {
  middleware,
  route,
  handleAllRoute,
  timers as middlewareTimers,
} from '@weco/common/koa-middleware/withCachedValues';
import linkResolver from './services/prismic/link-resolver';

// FIXME: Find a way to import this.
// We can't because it's not a standard es6 module (import and flowtype)
const Periods = {
  Today: 'today',
  ThisWeekend: 'this-weekend',
  CurrentAndComingUp: 'current-and-coming-up',
  Past: 'past',
  ComingUp: 'coming-up',
  ThisWeek: 'this-week',
};
const periodPaths = Object.keys(Periods)
  .map(key => Periods[key])
  .join('|');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

function pageVanityUrl(router, app, url, pageId, template = '/page') {
  route(url, template, router, app, { id: pageId });
}

const appPromise = nextApp
  .prepare()
  .then(async () => {
    await initServerData();

    const koaApp = new Koa();
    const router = new Router();

    koaApp.use(apmErrorMiddleware);
    koaApp.use(middleware);
    koaApp.use(bodyParser());

    pageVanityUrl(router, nextApp, '/', 'XphUbREAACMAgRNP', '/homepage');
    route('/whats-on', '/whats-on', router, nextApp);
    route(`/whats-on/:period(${periodPaths})`, '/whats-on', router, nextApp);

    route('/exhibitions', '/exhibitions', router, nextApp);
    route(
      `/exhibitions/:period(${periodPaths})`,
      '/exhibitions',
      router,
      nextApp
    );
    route('/exhibitions/:id', '/exhibition', router, nextApp);

    route('/events', '/events', router, nextApp);
    route(`/events/:period(${periodPaths})`, '/events', router, nextApp);
    route('/events/:id', '/event', router, nextApp);
    route('/event-series/:id', '/event-series', router, nextApp);

    route('/stories', '/stories', router, nextApp);
    route('/articles', '/articles', router, nextApp);
    route('/articles/:id', '/article', router, nextApp);
    route('/series/:id', '/article-series', router, nextApp);
    route('/projects/:id', '/page', router, nextApp);

    route('/books', '/books', router, nextApp);
    route('/books/:id', '/book', router, nextApp);

    route('/places/:id', '/place', router, nextApp);
    route('/pages/:id', '/page', router, nextApp);
    route('/seasons/:id', '/season', router, nextApp);

    route('/newsletter', '/newsletter', router, nextApp);

    route('/collections', '/page', router, nextApp, {
      id: 'YBfeAhMAACEAqBTx',
    });

    route('/guides', '/guides', router, nextApp);
    route('/guides/:id', '/page', router, nextApp);

    pageVanityUrl(router, nextApp, '/opening-times', 'WwQHTSAAANBfDYXU');
    pageVanityUrl(router, nextApp, '/what-we-do', 'WwLGFCAAAPMiB_Ps');
    pageVanityUrl(router, nextApp, '/press', 'WuxrKCIAAP9h3hmw');
    pageVanityUrl(router, nextApp, '/venue-hire', 'Wuw2MSIAACtd3SsC');
    pageVanityUrl(router, nextApp, '/access', 'Wvm2uiAAAIYQ4FHP');
    pageVanityUrl(router, nextApp, '/youth', 'Wuw2MSIAACtd3Ste');
    pageVanityUrl(router, nextApp, '/schools', 'Wuw2MSIAACtd3StS');
    pageVanityUrl(router, nextApp, '/covid-welcome-back', 'X5amzBIAAB0Aq6Gm');
    pageVanityUrl(
      router,
      nextApp,
      '/covid-book-your-ticket',
      'X5aomxIAAB8Aq6n5'
    );
    pageVanityUrl(router, nextApp, '/visit-us', 'X8ZTSBIAACQAiDzY', '/page');
    pageVanityUrl(router, nextApp, '/about-us', 'Wuw2MSIAACtd3Stq');
    pageVanityUrl(router, nextApp, '/get-involved', 'YDaZmxMAACIAT9u8');
    pageVanityUrl(router, nextApp, '/user-panel', 'YH17kRAAACoAyWTB');

    router.post('/newsletter-signup', handleNewsletterSignup);

    router.get('/preview', async ctx => {
      // Kill any cookie we had set, as it think it is causing issues.
      ctx.cookies.set(Prismic.previewCookie);

      const { token, documentId } = ctx.request.query;
      const api = await Prismic.getApi(
        'https://wellcomecollection.cdn.prismic.io/api/v2',
        {
          req: ctx.request,
        }
      );

      /**
       * This is because the type in api.resolve are not true
       */
      const retypedLinkResolver = doc => {
        return (linkResolver(doc) as string) || '/';
      };

      const url = await api
        .getPreviewResolver(token!.toString(), documentId!.toString())
        .resolve(retypedLinkResolver, '/');

      ctx.cookies.set('isPreview', 'true', {
        httpOnly: false,
      });

      ctx.redirect(url);
    });

    router.get('/content/management/healthcheck', async ctx => {
      ctx.status = 200;
      ctx.body = 'ok';
    });

    router.get('*', handleAllRoute(handle));

    koaApp.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    koaApp.use(router.routes());

    return koaApp;
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

export default appPromise;
export const timers = middlewareTimers as NodeJS.Timer[];
