import { GCPHelper } from '@weavcraft/helpers';
import dotenvFlow from 'dotenv-flow';

export class Configs {
  private static _instance: Configs;
  private _env: Record<string, string>;
  private gcpSecrets: string[] = [
    'MONGO_DEV_URI',
    'OAUTH_GOOGLE_CLIENT_ID',
    'OAUTH_GOOGLE_CLIENT_SECRET',
  ];

  private flowEnv = dotenvFlow.config({
    node_env: process.env.NODE_ENV,
    default_node_env: 'development',
  }).parsed;

  private constructor() {
    process.env = { ...process.env, ...this.flowEnv };
    this._env = process.env;
  }

  public static get instance(): Configs {
    if (!this._instance) {
      this._instance = new Configs();
    }

    return this._instance;
  }

  public async loadGCPEnv() {
    const gcpEnv = await GCPHelper.getSecretEnvironments(...this.gcpSecrets);
    this._env = { ...this._env, ...gcpEnv };
  }

  public get env() {
    return this._env;
  }

  public get cfgs() {
    return {
      env: this._env.NODE_ENV,
      jwt: {
        secret: this._env.JWT_SECRET,
        expiresIn: Number(this._env.JWT_EXPIRES_IN) || 3600,
      },
      app: {
        host: this._env.HOST || 'localhost',
        port: Number(this._env.APP_API_PORT) || 7001,
      },
      mongodb: {
        uri: this._env.MONGO_DEV_URI ?? this._env.DB_MONGO_URI,
      },
      supabase: {
        url: process.env['PUBLIC_SUPABASE_URL'],
        key: process.env['PUBLIC_SUPABASE_ANON_KEY'],
      },
    };
  }
}

const configs = Configs.instance;

export default configs;
