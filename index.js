const fs = require("fs");
const fetch = require("node-fetch");

const httpsRegex =
  /(?:(?:https))(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
const fetchContent = async (url) => await fetch(url).then((res) => res.json());
const findGrail = async (stringified) => {
  let location;
  let isGrail = false;
  const urls = stringified.match(httpsRegex) || [];
  let totalValue = 0;
  const searchEntry = (entry) => {
    entry.forEach(([_, record]) => {
      const entries = Object.entries(record.contents);
      entries.forEach(([item, { count, value }]) => {
        if (typeof value === "number") {
          totalValue += value;
        }
        if (typeof value === "object") {
          totalValue += value.value;
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
    console.log(
      `Holy Grail location: ${location}. Total chest value: ${totalValue} doubloons`
    );
    return `Holy Grail location: ${location}. Total chest value: ${totalValue} doubloons`;
  } else {
    findGrail(JSON.stringify(jsons));
  }
};
const holyGrail = async () => {
  function readContent(callback) {
    fs.readFile("./testData.json", "utf-8", function (err, content) {
      if (err) return callback(err);
      callback(null, content);
    });
  }

  const returnValue = readContent(async function (err, content) {
    return await findGrail(content);
  });
  console.log("RETURN VALUE", returnValue);
};
module.exports = holyGrail;

holyGrail();

// export { holyGrail };
