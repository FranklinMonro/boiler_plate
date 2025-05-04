/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { SwaggerOptions } from 'swagger-ui-express';
import { routesPath } from '../server/apiPaths';
import { swaggerLogger as log } from '../server/winstonLog';

interface CustomSwaggerOptions extends SwaggerOptions {
  [key: string]: any; // Allows arbitrary properties
}

const createSwaggerImport = (): { [key: string]: SwaggerOptions } => {
  try {
    const swaggerFiles: { [key: string]: SwaggerOptions } = {};
    const routeFolders = readdirSync(routesPath);

    routeFolders.forEach((folder: string) => {
      const swaggerFile = readdirSync(resolve(routesPath, folder)).find(
        (file: string) => file.includes('swagger')
      );
      if (swaggerFile) {
        try {
          const fileContent = readFileSync(
            resolve(routesPath, folder, swaggerFile),
            'utf8'
          );
          const swaggerJSON = JSON.parse(fileContent);
          const name = folder;
          swaggerFiles[name] = swaggerJSON;
        } catch (parseError) {
          log.error(
            `Error parsing Swagger file ${swaggerFile} in folder ${folder}: ${parseError}`
          );
        }
      }
    });
    return swaggerFiles;
  } catch (error) {
    log.error(`Error in createSwaggerImport: ${error}`);
    return {};
  }
};

const addToSwaggerConfig = (
  config: CustomSwaggerOptions
): CustomSwaggerOptions => {
  try {
    const swaggerJsons = createSwaggerImport();

    config.paths = config.paths || {};
    config.tags = config.tags || [];

    for (const [name, swaggerJson] of Object.entries(swaggerJsons)) {
      // Create a tag for the dropdown
      const tag = {
        name,
        description: `API endpoints for ${name}`,
      };
      config.tags.push(tag);

      // Merge paths and assign the tag to each path
      if (swaggerJson.paths) {
        for (const path in swaggerJson.paths) {
          if (swaggerJson.paths.hasOwnProperty(path)) {
            const pathItemObject = swaggerJson.paths[path];
            for (const method in pathItemObject) {
              if (pathItemObject.hasOwnProperty(method)) {
                // Assign the tag to the operation
                pathItemObject[method].tags = [tag.name];
              }
            }
            config.paths[path] = {
              ...config.paths[path],
              ...pathItemObject,
            };
          }
        }
      }
      if (swaggerJson.components?.schemas) {
        config.components = config.components || {};
        config.components.schemas = config.components.schemas || {};
        Object.assign(
          config.components.schemas,
          swaggerJson.components.schemas
        );
      }
    }
    return config;
  } catch (error) {
    log.error(`Error in addToSwaggerConfig: ${error}`);
    return config;
  }
};

export default addToSwaggerConfig;
