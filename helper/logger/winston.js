const momentTz = require("moment-timezone");

const { createLogger, format, transports } = require("winston");

const { combine, timestamp, prettyPrint } = format;
require("winston-daily-rotate-file");

const envConfig = require("../../config/environment/environment.config");

const transport = new transports.DailyRotateFile({
  filename: `${envConfig.nodeEnv}-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20g",
  maxFiles: "14d",
  dirname: "../logs",
  localTime: true,
});

const getTimeStamp = () => momentTz.tz(new Date(), envConfig.timeZone).format();

const logger = createLogger({
  format: combine(
    timestamp({
      format: getTimeStamp(),
    }),
    prettyPrint()
  ),
  transports: [transport],
});

const dbTransport = new transports.DailyRotateFile({
  filename: `${envConfig.nodeEnv}-dbtransport-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20g",
  maxFiles: "14d",
  dirname: "../logs",
  localTime: true,
});

const dbLogger = createLogger({
  format: combine(
    timestamp({
      format: getTimeStamp(),
    }),
    prettyPrint()
  ),
  transports: [dbTransport],
});

const winston = logger;

module.exports = {
  winston,
  dbLogger,
};
