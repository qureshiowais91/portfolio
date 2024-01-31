class Errorhandler extends Error {
    constructor(eventType, message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.eventType = eventType;
    }
}

module.exports = { Errorhandler }