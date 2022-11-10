const fs = require("fs");
const fetch = require("node-fetch");
const util = require("util");

const httpsRegex =
  /(?:(?:https))(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
const fetchContent = async (url) => await fetch(url).then((res) => res.json());
let totalValue = 0;
let deadSpiders = 0;
const boots = {};
const findGrail = async (stringified) => {
  let location;
  let isGrail = false;
  const urls = stringified.match(httpsRegex) || [];

  const searchEntry = (entry) => {
    entry.forEach(([_, record]) => {
      const entries = Object.entries(record.contents);
      entries.forEach(([item, { count, value, alive, size }]) => {
        if (typeof value === "number") {
          totalValue += value;
        }
        if (typeof value === "object") {
          totalValue += value.value;
        }
        if (item === "spider" && !alive) {
          deadSpiders += 1;
        }
        if (item === "boots") {
          boots[size] ? (boots[size] += 1) : (boots[size] = 1);
        }
        switch (item) {
          case "sapphire":
            totalValue += count * 200;
            break;
          case "ruby":
            totalValue += count * 250;
            break;
          case "diamond":
            totalValue += count * 400;
            break;
        }
        if (item.includes("holy-grail")) {
          location = record.location;
          isGrail = true;
        }
      });
    });
  };
  const promises = urls
    ?.flat()
    .map(async (url) => await fetchContent(url).then((res) => res));
  const jsons = await Promise.all(promises);
  jsons.forEach((entry) => searchEntry(Object.entries(entry)));
  if (isGrail) {
    const commonSize = Object.keys(boots).reduce((a, b) =>
      boots[a] > boots[b] ? a : b
    );
    return `Holy Grail location: ${location}. Total chest value: ${totalValue} doubloons. Dead spiders: ${deadSpiders}. Most common boot size: ${commonSize}`;
  } else {
    return findGrail(JSON.stringify(jsons));
  }
};

const holyGrail = async () => {
  const readFile = util.promisify(fs.readFile);
  const content = await readFile("./testData.json", "utf-8");
  const result = findGrail(content);
  console.log(
    "EXPECTED: Holy Grail location: 31.01 -106.88. Total chest value: 494408 doubloons. Dead spiders: 110. Most common boot size: 6"
  );
  console.log("RESULT:", await result);
  return result;
};

module.exports = holyGrail;

holyGrail();
