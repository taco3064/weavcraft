import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { WinstonHelper } from '../logger';

const log = new WinstonHelper('helper', { context: 'SecretEnv' });

export async function getSecretEnvironments(...names: readonly string[]) {
  const client = new SecretManagerServiceClient();

  try {
    const envs = await Promise.all(
      names.map(async (name) => {
        const [{ payload }] = await client.accessSecretVersion({
          name: `projects/280021648063/secrets/${name}/versions/latest`,
        });

        return [name, payload?.data?.toString()];
      })
    );
    const result: Record<(typeof names)[number], string> =
      Object.fromEntries(envs);
    return result;
  } catch (error) {
    log.logger.error(error);
    return undefined;
  }
}
