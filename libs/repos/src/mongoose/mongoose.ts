import { ConnectOptions, Connection, Mongoose } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { WinstonHelper } from '@weavcraft/helpers';

const mongoLogger = new WinstonHelper('mongo', { context: 'DB' });

export class BaseMonogoClient {
  connection: Connection;
  protected mongoose: Mongoose = new Mongoose();
  private options?: ConnectOptions = {
    connectTimeoutMS: 5000,
    waitQueueTimeoutMS: 5000,
  };

  constructor(
    public uri = 'mongodb://127.0.0.1:27017',
    options?: ConnectOptions,
    public dbName?: string,
    public clientId: string = uuidV4()
  ) {
    this.options = {
      ...this.options,
      ...options,
    };
    this.mongoose.connect(this.uri, this.options);
    this.connection = this.mongoose.connection;
    this.setConnectionOn();
    if (dbName) {
      const connection = this.mongoose.connection.useDb(dbName);
      this.connection = connection;
    }
  }

  private setConnectionOn() {
    this.mongoose.connection.on('connected', () => {
      mongoLogger.logger.info(`connected: ${this.clientId}`);
    });
    this.mongoose.connection.on('disconnected', () => {
      mongoLogger.logger.info(`disconnected: ${this.clientId}`);
    });
    this.mongoose.connection.on('error', (error) => {
      mongoLogger.logger.error(error);
    });
    this.mongoose.connection.on('open', () => {
      mongoLogger.logger.info(`connection opened: ${this.clientId}`);
    });
  }

  async initialize(): Promise<void> {
    try {
      await this.mongoose.connection.asPromise();
    } catch (error) {
      mongoLogger.logger.error(error);
      throw error;
    }
  }
}
