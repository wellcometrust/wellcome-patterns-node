import Router = require('@koa/router');
import koaBody from 'koa-body';
import { requestBody } from '../middleware/request-body';
import {
  ApplicationState,
  RouteContext,
  RouteMiddleware,
} from '../types/application';

export type RouteWithParams<Props, Body = any> =
  | [string, string, RouteMiddleware<Props, Body>]
  | [string, string, RouteMiddleware<Props, Body>, string];

export type GetRoute<
  Routes extends { [key in RouteName]: Value },
  RouteName extends string,
  Value = any
> = Routes[RouteName] extends RouteWithParams<infer T> ? T : never;

export type GetBody<
  Routes extends { [key in RouteName]: Value },
  RouteName extends string,
  Value = any
> = Routes[RouteName] extends RouteWithParams<any, infer T> ? T : never;

export class TypedRouter<
  Routes extends string,
  MappedRoutes extends {
    [key in Routes]: RouteWithParams<GetRoute<MappedRoutes, Routes>>;
  }
> {
  static GET = 'get';
  static POST = 'post';
  static PATCH = 'patch';
  static PUT = 'put';
  static DELETE = 'delete';

  // This is exposed for now before TypedRouter gets removed
  router = new Router<ApplicationState, RouteContext>();

  constructor(routes: MappedRoutes) {
    const routeNames = Object.keys(routes) as Routes[];
    for (const route of routeNames) {
      const [method, path, func, schemaName] = routes[route];

      switch (method) {
        case TypedRouter.PUT:
          this.router.put(
            route,
            path,
            koaBody(),
            requestBody(schemaName),
            func
          );
          break;
        case TypedRouter.POST:
          this.router.post(
            route,
            path,
            koaBody(),
            requestBody(schemaName),
            func
          );
          break;
        case TypedRouter.PATCH:
          this.router.patch(
            route,
            path,
            koaBody(),
            requestBody(schemaName),
            func
          );
          break;
        case TypedRouter.GET:
          this.router.get(route, path, func);
          break;
        case TypedRouter.DELETE:
          this.router.delete(route, path, func);
          break;
      }
    }
  }

  url<Route extends Routes>(
    name: Route,
    params?: GetRoute<MappedRoutes, Route>,
    options?: Router.UrlOptionsQuery
  ): string {
    return this.router.url(name, params, options);
  }

  routes() {
    return this.router.routes();
  }

  allowedMethods() {
    return this.router.allowedMethods();
  }
}
