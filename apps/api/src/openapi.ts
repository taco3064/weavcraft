import {
  RoutingControllersOptions,
  getMetadataArgsStorage,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataStorage } from 'class-validator';
import { LoggerHelper } from './common/helpers/logger.helper';

/**
 *
 * @param routingControllerOptions RoutingControllersOptions
 * @param additionalProperties Partial<OpenAPIObject>
 */
export function getSwaggerSpec(
  routingControllerOptions?: RoutingControllersOptions
) {
  // routing-controllers-openapi example:
  // https://github.com/epiphone/routing-controllers-openapi/blob/master/sample/01-basic/app.ts
  try {
    const storage = getMetadataArgsStorage();
    const classValidatorMetadataStorage = getMetadataStorage();

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      classValidatorMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const spec = routingControllersToSpec(storage, routingControllerOptions, {
      components: {
        schemas: Object(schemas),
      },
    });
    return spec;
  } catch (err) {
    const errInfo = `[DOC][getSwaggerSpec] error: ${err}`;
    LoggerHelper.log.error(errInfo);
    return null;
  }
}
