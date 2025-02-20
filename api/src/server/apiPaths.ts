import { dirname, resolve } from 'path';

const baseDirectory = dirname(__dirname);
const routesPath = resolve(baseDirectory, 'routes');
const swaggerPath = resolve(baseDirectory, 'swagger', 'swaggerRoutes');
const templatePath = resolve(baseDirectory, 'templates');

export { routesPath, swaggerPath, templatePath };
