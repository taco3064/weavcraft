import { BaseMongoClient, testSchema } from '@weavcraft/repos';
import configs from '../../../configs';

export class DemoDbMongoClient extends BaseMongoClient {
  constructor() {
    super(configs.mongodb.uri, undefined, 'demo');
  }
}
