import winston from 'winston';
import 'winston-daily-rotate-file';

export const logDebug = (error: Error | unknown) => {
    const logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp()
        ),
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'mail-sending-service-debug-%DATE%.log',
                datePattern: 'DD-MM-YYYY',
                dirname: '.log/debug',
                format: winston.format.combine(
                    winston.format.json(),
                    winston.format.timestamp()
                ),
            }),
        ],
    });
    if (error instanceof Error) {
        logger.debug(error.message);
        return;
    }
    logger.debug(error);
};
