"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lens_1 = require("./lens");
describe("with deep lens and object", function () {
    var testObj = {
        a: {
            b: {
                c: "d",
            },
        },
    };
    var testLens = lens_1.idLens();
    var deepLens = testLens.thenKey("a").thenKey("b").thenKey("c");
    test("get a value deep", function () {
        expect(deepLens.get(testObj)).toBe("d");
    });
    test("set a value deeply without changing everything", function () {
        expect(deepLens.set("d1")(testObj)).toEqual({
            a: {
                b: {
                    c: "d1",
                },
            },
        });
        expect(testObj).toEqual({
            a: {
                b: {
                    c: "d",
                },
            },
        });
    });
});
describe("with array", function () {
    var testObj = [0, 1];
    var testLens = lens_1.idLens();
    var deepLens = testLens.thenKey("length");
    test("get a length from list", function () {
        expect(deepLens.get(testObj)).toBe(2);
    });
});
//# sourceMappingURL=lens.spec.js.map