"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getKey = function (key) {
    return function (value) {
        return value[key];
    };
};
var getOrKey = function (key, orValue) {
    return function (value) {
        return value[key] || orValue;
    };
};
var setKey = function (key, setValue) {
    return function (value) {
        return Object.assign({}, value, (_a = {},
            _a[key] = setValue,
            _a));
        var _a;
    };
};
var constantFn = function (value) {
    return function () {
        return value;
    };
};
var identity = function (x) {
    return x;
};
/**
 * A lens is an object of getters and setter into a composable structure.
 * Useful for getting setting a complicated path while still preserving the typing of the object.
 * Lens will transform to and from domain A, B; A <=> B *
 */
var Lens = /** @class */ (function () {
    function Lens(get, set) {
        this.get = get;
        this.set = set;
    }
    /** Composing on another lens so we can extend the operations from an A -> C now
     * Ex: Use a fp.set and fp.get to use a path
     */
    Lens.prototype.then = function (nextLens) {
        var _this = this;
        var composedGet = function (value) {
            return nextLens.get(_this.get(value));
        };
        var composedSet = function (value) {
            var composedSetFn = function (source) { return (_this.set(nextLens.set(value)(_this.get(source)))(source)); };
            return composedSetFn;
        };
        return lensOf(composedGet, composedSet);
    };
    /** Composing updating/ reading with a key to get/ set in B
     * Ex: Get/ Set value of a model of { value: number }
     */
    Lens.prototype.thenKey = function (key) {
        return this.then(new Lens(getKey(key), function (value) {
            return setKey(key, value);
        }));
    };
    /** Like thenKey but now we have a default
     * Ex: Get a value in a model dictionary or return the default
     */
    Lens.prototype.thenKeyOr = function (key, defaultValue) {
        return this.then(new Lens(getOrKey(key, defaultValue), function (value) {
            return setKey(key, value);
        }));
    };
    /**
     * Pass in a function in order to do a read and set combination
     * Ex: Increment the value, needs to read then write a new value
     */
    Lens.prototype.update = function (fn) {
        var _this = this;
        return function (source) {
            return _this.set(fn(_this.get(source)))(source);
        };
    };
    return Lens;
}());
exports.Lens = Lens;
/**
 * A factory for creating a lens. A lense is an object of getters and setter into a composable structure.
 * Useful for getting setting a complicated path while still preserving the typing of the object.
 * Lens will transform to and from domain A, B; A <=> B *
 */
var lensOf = function (get, set) {
    return new Lens(get, set);
};
exports.lensOf = lensOf;
var IdentityLens = lensOf(identity, constantFn);
/**
 * Create the identity lens for a type, like a state.
 */
var idLens = function () { return IdentityLens; };
exports.idLens = idLens;
exports.default = idLens;
//# sourceMappingURL=lens.js.map