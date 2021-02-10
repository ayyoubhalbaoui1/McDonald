const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "allLogs.log",
    }),
  ],
};

const loggger = winston.createLogger(logConfiguration);

function saveLog(level, link, message) {
  var lg = loggger.log({
    message: message,
    level: [level],
    Date: new Date(),
    http: "127.0.0.1:" + 5000 + "/" + link,
  });
  return lg;
}


module.exports = { saveLog, logging };
