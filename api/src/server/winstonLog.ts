import { createLogger, transports, format } from 'winston';

const appLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'appLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message, service }) =>
        `[${timestamp}] ${service} ${level}: ${message}`
    )
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const authenticateLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'authenticateLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message, service }) =>
        `[${timestamp}] ${service} ${level}: ${message}`
    )
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const configLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'configLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message, service }) =>
        `[${timestamp}] ${service} ${level}: ${message}`
    )
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const errorHandlerLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'errorHandlerLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message, service }) =>
        `[${timestamp}] ${service} ${level}: ${message}`
    )
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const jwtTokenLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'jwtTokenLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message, service }) =>
        `[${timestamp}] ${service} ${level}: ${message}`
    )
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const productsLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'productsLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message, service }) =>
        `[${timestamp}] ${service} ${level}: ${message}`
    )
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const serverLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'serverLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message, service }) =>
        `[${timestamp}] ${service} ${level}: ${message}`
    )
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

const swaggerLogger = createLogger({
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: 'swaggerLogger.log',
    }),
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message, service }) =>
        `[${timestamp}] ${service} ${level}: ${message}`
    )
  ),
  defaultMeta: {
    service: 'WinstonExample',
  },
});

export {
  appLogger,
  authenticateLogger,
  configLogger,
  errorHandlerLogger,
  jwtTokenLogger,
  productsLogger,
  serverLogger,
  swaggerLogger,
};
