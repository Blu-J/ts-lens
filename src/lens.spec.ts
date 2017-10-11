import { idLens } from "./lens";

describe("with deep lens and object", () => {

  const testObj = {
    a: {
      b: {
        c: "d",
      },
      e: "f",
    },
    g: "h",
  };
  const testLens = idLens<typeof testObj>();
  const deepLens = testLens.thenKey("a").thenKey("b").thenKey("c");

  test("get a value deep", () => {
    expect(deepLens.get(testObj)).toBe("d");
  });

  test("set a value deeply without changing everything", () => {
    expect(deepLens.set("d1")(testObj)).toEqual({
      a: {
        b: {
          c: "d1",
        },
        e: "f",
      },
      g: "h",
    });

    expect(testObj).toEqual({
      a: {
        b: {
          c: "d",
        },
        e: "f",
      },
      g: "h",
    });

  });
});

describe("with array", () => {

  const testObj = [0, 1];
  const testLens = idLens<typeof testObj>();
  const deepLens = testLens.thenKey("length");

  test("get a length from list", () => {
    expect(deepLens.get(testObj)).toBe(2);
  });
});
