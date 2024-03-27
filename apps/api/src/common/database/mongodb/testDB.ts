import { BaseMongoClient, testSchema } from '@weavcraft/repos';
import configs from '../../../configs';

export class DemoDbMongoClient extends BaseMongoClient {
  constructor() {
    super(configs.cfgs.mongodb.uri, undefined, 'demo');
  }
}
