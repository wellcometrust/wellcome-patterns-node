import apm from 'elastic-apm-node';
import Koa from 'koa';
import { Middleware } from 'koa-compose';

async function errorMiddleware(
  ctx: Koa.DefaultContext,
  next: Koa.Next
): Promise<any> {
  try {
    await next();
  } catch (error) {
    // https://www.elastic.co/guide/en/apm/agent/nodejs/master/koa.html#koa-error-logging
    apm.captureError(error);
    throw error;
  }
}

export const apmErrorMiddleware: Middleware<Koa.DefaultContext> =
  errorMiddleware;
