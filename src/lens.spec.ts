import { idLens } from "./lens";

describe("with deep lens and object", () => {
  const testObj = {
    a: {
      b: {
        c: "d"
      }
    }
  };
  const testLens = idLens<{ a?: null | 0 | false | { b: { c: string } } }>();
  const deepLens = testLens
    .thenKeyOr("a", { b: { c: "fallback" } })
    .thenKey("b")
    .thenKey("c");

  test("get a value deep", () => {
    expect(deepLens.get(testObj)).toBe("d");
  });

  test("set a value deeply without changing everything", () => {
    expect(deepLens.set("d1")(testObj)).toEqual({
      a: {
        b: {
          c: "d1"
        }
      }
    });

    expect(testObj).toEqual({
      a: {
        b: {
          c: "d"
        }
      }
    });
  });

  test("update a value deeply without changing everything", () => {
    expect(deepLens.update(x => `${x}1`)(testObj)).toEqual({
      a: {
        b: {
          c: "d1"
        }
      }
    });

    expect(testObj).toEqual({
      a: {
        b: {
          c: "d"
        }
      }
    });
  });

  test("update with identity returns original", () => {
    expect(deepLens.update(x => x)(testObj)).toBe(testObj);

    expect(testObj).toEqual({
      a: {
        b: {
          c: "d"
        }
      }
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
describe("with deep lens and object that is broken", () => {
  const testGood = {
    a: {
      b: {
        c: "c value"
      }
    }
  };
  const testLens = idLens<typeof testGood>();
  const deepLens = testLens
    .thenKey("a")
    .thenKey("b")
    .thenKeyOr("c", "f");

  test("get a value deep", () => {
    expect(deepLens.get(undefined as any)).toBe("f");
  });

  test("set a value deep", () => {
    expect(testLens.thenKey("a").set(testGood.a)({ undefined } as any)).toEqual(
      testGood
    );
  });

  test("set a shallow deep", () => {
    expect(testLens.set(testGood)(undefined as any)).toEqual(testGood);
  });

  test("get a value deep with thenKeyOr", () => {
    expect(testLens.thenKeyOr("a", testGood.a).get({} as any)).toBe(testGood.a);
  });
});
