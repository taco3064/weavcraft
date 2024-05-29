import * as Koa from 'koa';
import { ApiResErr, HttpException } from '@weavcraft/common';
import { Logger } from 'winston';
import _ = require('lodash');

export const KoaLoggerHttpErrorMiddleware = (logger: Logger) => {
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    await KoaHttpErrorInterceptor(ctx, next, logger);
  };
};

export const KoaHttpErrorInterceptor = async (
  ctx: Koa.Context,
  next: () => Promise<any>,
  logger?: Logger
) => {
  try {
    await next();
    const body: any = ctx.body;
    if (body && _.has(body, 'status')) {
      body.status = ctx.status;
    }
    if (ctx.status == 404) {
      throw new HttpException('Not Found', ctx.status);
    }
  } catch (error: any) {
    await koaErrorHandler(error, ctx, logger);
  }
};

export const koaErrorHandler = async (
  error: any,
  ctx: Koa.Context,
  logger?: Logger
) => {
  const isInnerError = error instanceof HttpException;
  const httpError = error as HttpException;
  const body: ApiResErr = {
    success: false,
    status: httpError.status,
    errorCode: httpError.errorCode,
    message: error.message,
    timestamp: new Date().toISOString(),
    path: ctx.path,
  };
  if (error.description) {
    body.description = error.description;
  }
  if (logger) {
    logger.error(httpError.stack);
  }
  ctx.status = httpError.status ?? 500;
  ctx.body = body;
  return error;
};
