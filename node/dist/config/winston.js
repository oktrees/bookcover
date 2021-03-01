(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "winston"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const winston_1 = require("winston");
    const logger = winston_1.createLogger({
        level: 'info',
        format: winston_1.format.json(),
        transports: [
            new winston_1.transports.File({ filename: 'combined.log' }),
            new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        ],
    });
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston_1.transports.Console({ format: winston_1.format.simple() }));
    }
    exports.default = logger;
});
