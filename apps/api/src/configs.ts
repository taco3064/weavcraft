import dotenvFlow from 'dotenv-flow';

const flowEnv = dotenvFlow.config({
  node_env: process.env.NODE_ENV,
  default_node_env: 'development',
}).parsed;

process.env = { ...process.env, ...flowEnv };

const configs = {
  env: process.env.NODE_ENV,
  app: {
    host: process.env.HOST || 'localhost',
    port: Number(process.env.APP_API_PORT) || 7001,
  },
};

export default configs;
