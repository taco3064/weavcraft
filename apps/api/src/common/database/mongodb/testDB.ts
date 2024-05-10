import { BaseMongoClient } from '@weavcraft/repos';
import configs from '../../../configs';
import { DbLogger } from '../../helpers/logger.helper';

export class DemoDbMongoClient extends BaseMongoClient {
  constructor() {
    super(configs.cfgs.mongodb.uri, DbLogger.log, undefined, 'demo');
  }
}
