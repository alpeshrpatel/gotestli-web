const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
    level: 'info', // Set minimum log level (info, debug, etc.)
    format: combine(timestamp(), json()), // Combine timestamp and JSON format
    transports: [
        new winston.transports.Console({ // Log to console
            format: winston.format.combine(
                winston.format.colorize({ all: true }), // Colorize console logs
                winston.format.simple() // Simplified console output format
            )
        }),
        new winston.transports.File({ // Log to file (optional)
            filename: 'api.log', // Customize filename
            level: 'error' // Write only errors to the file (optional)
        })
    ]
});

module.exports = logger;