import { holyGrail } from ".";

describe("holy grail", () => {
  test.only("returns the location of the holy grail", async () => {
    expect(await holyGrail()).toBe("Holy Grail location: 31.01 -106.88");
  });
  test.skip("returns the total value of the chests", async () => {
    expect(await holyGrail()).toBe("Holy Grail location: 31.01 -106.88");
  });
});
