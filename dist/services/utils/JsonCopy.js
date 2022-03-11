"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastCopy = /** @class */ (function () {
    function fastCopy() {
    }
    fastCopy.fastCopy = function (object) {
        return JSON.parse(JSON.stringify(object));
    };
    return fastCopy;
}());
exports.default = fastCopy;
//# sourceMappingURL=JsonCopy.js.map