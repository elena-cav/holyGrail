const holyGrail = require(".");

describe("holy grail", () => {
  test.skip("returns the location of the holy grail, chest value, dead spiders and common boot size", async () => {
    expect(await holyGrail()).toBe(
      "Holy Grail location: 31.01 -106.88. Total chest value: 494408 doubloons. Dead spiders: 110. Most common boot size: 6"
    );
  });
});
