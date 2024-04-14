import { WinstonHelper } from '@weavcraft/helpers';
import { Logger } from 'winston';

export abstract class LoggerHelper {
  protected static wlog: Logger;
  static get log(): Logger {
    if (!this.wlog) {
      this.wlog = new WinstonHelper('api').logger;
      return this.wlog;
    }
    return this.wlog;
  }
}

export abstract class IocLogger {
  protected static wlog: Logger;
  static get log(): Logger {
    if (!this.wlog) {
      this.wlog = new WinstonHelper('api', {
        context: 'IOC',
      }).logger;
      return this.wlog;
    }
    return this.wlog;
  }
}

export abstract class HttpLogger {
  protected static wlog: Logger;
  static get log(): Logger {
    if (!this.wlog) {
      this.wlog = new WinstonHelper('api', {
        context: 'HTTP',
      }).logger;
      return this.wlog;
    }
    return this.wlog;
  }
}

export abstract class DbLogger {
  protected static wlog: Logger;
  static get log(): Logger {
    if (!this.wlog) {
      this.wlog = new WinstonHelper('api', {
        context: 'DB',
      }).logger;
      return this.wlog;
    }
    return this.wlog;
  }
}
