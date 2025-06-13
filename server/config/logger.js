const { createLogger, format, transports } = require('winston');
const path = require('path');
require('winston-daily-rotate-file');


// Configure daily rotate file transport
const dailyRotateTransport = new transports.DailyRotateFile({
    filename: path.join(__dirname, '../../logs', 'application-%DATE%.log'), 
    datePattern: 'YYYY-MM-DD',              
    maxSize: '50m',                        
    maxFiles: '14d', 
    zippedArchive: true,
});

// Configure the logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${isValidJson(message) ? JSON.stringify(JSON.parse(message), null, 2) : message}`;
        })
    ),
    transports: [
        new transports.Console(), // Log to console
        dailyRotateTransport
    ],
});

const isValidJson = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

function handleGlobalErrors(logger) {
    // Uncaught Exceptions
    process.on('uncaughtException', (err) => {
        logger.error(`Unhandled Exception: ${err.stack}`);
        //process.exit(1); // Exit to avoid unpredictable state
    });

    // Unhandled Rejections
    process.on('unhandledRejection', (reason, promise) => {
        logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
        //process.exit(1); // Exit to avoid unpredictable state
    });

    // Warnings
    process.on('warning', (warning) => {
        logger.warn(`Process Warning: ${warning.name} - ${warning.message}\n${warning.stack}`);
    });

    // Signals
    process.on('SIGINT', () => {
        logger.info('Received SIGINT. Gracefully shutting down...');
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        logger.info('Received SIGTERM. Gracefully shutting down...');
        process.exit(0);
    });

    // Process Exit
    process.on('exit', (code) => {
        logger.info(`Process exited with code: ${code}`);
    });
}

handleGlobalErrors(logger);


module.exports = logger;
