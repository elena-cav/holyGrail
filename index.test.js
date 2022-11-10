const holyGrail = require(".");

describe("holy grail", () => {
  test.only("returns the location of the holy grail", async () => {
    await expect(holyGrail()).resolves.toBe(
      "Holy Grail location: 31.01 -106.88. Total chest value: 126479 doubloons"
    );
  });
});
