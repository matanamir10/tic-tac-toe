import { ILogger } from "./../interfaces/ILogger";
import winston, { Logger } from "winston";

export class AppLogger implements ILogger {
  private static logger: Logger = null;

  private constructor() {}

  static getLogger(): AppLogger {
    if (!AppLogger.logger) {
      AppLogger.logger = winston.createLogger({
        transports: [new winston.transports.Console()],
      });
    }
    return AppLogger.logger;
  }

  info(msg: string): void {
    AppLogger.logger.info(msg);
  }

  warn(msg: string): void {
    AppLogger.logger.warn(msg);
  }

  error(msg: string): void {
    AppLogger.logger.error(msg);
  }
}
