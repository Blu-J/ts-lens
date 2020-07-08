module.exports = function (wallaby) {
  return {
    env: {
      type: "node",
    },
    files: [
      "tsconfig.json",
      "{src,lib}/**/*.{t,h}s{x,}",
      "!{src,lib}/**/*.spec.{t,h}s{x,}",
    ],
    testFramework: "jest",
    tests: ["{src,lib}/**/*.spec.{t,h}s{x,}"],
  };
};
