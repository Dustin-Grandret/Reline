"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastCopyClass = void 0;
var fastCopy = /** @class */ (function () {
    function fastCopy() {
    }
    fastCopy.fastCopy = function (object) {
        return JSON.parse(JSON.stringify(object));
    };
    return fastCopy;
}());
exports.default = fastCopy.fastCopy;
var FastCopyClass = fastCopy;
exports.FastCopyClass = FastCopyClass;
//# sourceMappingURL=fastCopy.js.map