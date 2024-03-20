import 'reflect-metadata';
import { server } from './server';

async function main() {
  const { httpServer } = await server();

  const closeProcesses = async (code = 1) => {
    httpServer.close(() => {
      console.info('Server closed');
    });
    process.exit(code);
  };

  const successHandler = () => {
    console.info('SIGTERM received');
    closeProcesses(0);
  };

  const failureHandler = (error: any) => {
    console.error(error);
    closeProcesses(1);
  };

  process.on('uncaughtException', failureHandler);
  process.on('unhandledRejection', failureHandler);

  process.on('SIGTERM', successHandler);
}

main();