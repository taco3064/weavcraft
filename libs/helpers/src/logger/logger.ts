import {
  Logger,
  LoggerOptions,
  createLogger,
  format,
  transports,
} from 'winston';
import 'winston-daily-rotate-file';
import { clc, yellow } from '../cli-color';

function getColorByLogLevel(level: LoggerOptions['level']) {
  switch (level) {
    case 'debug':
      return clc.magentaBright;
    case 'warn':
      return clc.yellow;
    case 'error':
      return clc.red;
    case 'verbose':
      return clc.cyanBright;
    case 'fatal':
      return clc.bold;
    default:
      return clc.green;
  }
}

function colorize(logLevel: string, message: string) {
  const color = getColorByLogLevel(logLevel);
  return color(message);
}

export const loggerFormat = (isColor = true) =>
  format.combine(
    format.timestamp(),
    format.printf(
      ({ level, message, timestamp, service, pid, context }: any) => {
        context = context ? ` [${context}] ` : ' ';
        service = service ? `[${service.toUpperCase()}]` : '';
        const levelStr = level.padStart(7).toUpperCase();
        const contextFormat = isColor ? yellow(`${context}`) : context;
        const serviceFormat = isColor ? colorize(level, `${service}`) : service;
        const pidFormat = isColor ? colorize(level, `${pid}`) : pid;
        const levelFormat = isColor ? colorize(level, `${levelStr}`) : levelStr;
        const messageFormat = isColor ? colorize(level, `${message}`) : message;

        return `${serviceFormat} ${pidFormat} - ${timestamp}${levelFormat}${contextFormat}${messageFormat}`;
      }
    )
  );

interface LoggerHelperOptions {
  level?: string;
  context?: string;
  dirname?: string;
  error?: string;
  info?: string;
  dailyFilename?: string;
  logKeepDays?: string;
}

export class WinstonHelper {
  private helperOpts?: LoggerHelperOptions;
  logger: Logger;

  constructor(
    private service?: string,
    helperOpts?: LoggerHelperOptions,
    options?: LoggerOptions
  ) {
    const newOptions = this.genOptions(helperOpts, options);
    this.logger = createLogger(newOptions);
  }

  private defaultHelperOpts: LoggerHelperOptions = {
    level: 'info',
    dirname: 'logs',
    error: 'error.log',
    info: 'system.log',
    logKeepDays: '120d',
    dailyFilename: 'system-%DATE%.log',
  };

  private genOptions(
    helperOpts?: LoggerHelperOptions,
    options?: LoggerOptions
  ): LoggerOptions {
    this.helperOpts = {
      ...this.defaultHelperOpts,
      ...helperOpts,
    };
    const defaultOptions: LoggerOptions = {
      transports: [
        new transports.DailyRotateFile({
          dirname: this.helperOpts.dirname,
          filename: this.helperOpts.dailyFilename,
          zippedArchive: true,
          maxFiles: this.defaultHelperOpts.logKeepDays, // 保留幾天
          format: loggerFormat(false),
        }),
      ],
    };

    return {
      level: this.helperOpts.level ?? options?.level ?? 'info',
      defaultMeta: {
        service: this.service ?? 'logger',
        context: this.helperOpts.context,
        pid: process.pid,
      },
      transports: [
        new transports.Console({
          format: loggerFormat(),
        }),
        new transports.File({
          filename: this.helperOpts.error,
          dirname: this.helperOpts.dirname,
          level: 'error',
          format: loggerFormat(false),
        }),
        ...((options?.transports as any[]) ??
          (defaultOptions.transports as any[])),
      ],
      format: options?.format ?? defaultOptions.format,
    };
  }
}
