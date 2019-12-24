import { config } from './dev';

const env = 'development';
const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 4400,
};

// let envConfig = {};

// switch (env) {
//   case 'dev':
//   case 'development':
//     envConfig = import('./dev').config;
//     break;
//   case 'test':
//   case 'testing':
//     envConfig = require('./testing').config;
//     break;
//   case 'prod':
//   case 'production':
//     envConfig = require('./prod').config;
//     break;
//   default:
//     envConfig = require('./dev').config;
// }

export default {
  ...baseConfig,
  ...config,
};
