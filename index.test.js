const holyGrail = require(".");
const fs = require("fs");
jest.mock("fs");

describe("holy grail", () => {
  test.only("returns the location of the holy grail", async () => {
    // const data = await holyGrail();
    // expect(data).toBe("Holy Grail location: 31.01 -106.88");
    expect(jest.isMockFunction(fs.readFileSync)).toBeTruthy();
    fs.readFileSync.mockReturnValue("test string");
    require("./");
    await expect(holyGrail()).resolves.toBe(
      "Holy Grail location: 31.01 -106.88"
    );
  });
  test.skip("returns the total value of the chests", async () => {
    expect(await holyGrail()).toBe("Holy Grail location: 31.01 -106.88");
  });
});
