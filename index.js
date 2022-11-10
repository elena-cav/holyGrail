import { readFileSync } from "fs";
import fetch from "node-fetch";

const httpsRegex =
  /(?:(?:https))(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
const fetchContent = async (url) => await fetch(url).then((res) => res.json());
const findGrail = async (stringified) => {
  let location;
  let isGrail = false;
  const urls = stringified.match(httpsRegex) || [];

  const searchEntry = (entry) => {
    entry.forEach(([_, record]) => {
      const contents = Object.keys(record.contents);
      if (contents.includes("holy-grail")) {
        location = record.location;
        isGrail = true;
      }
    });
  };
  const promises = urls
    ?.flat()
    .map(async (url) => await fetchContent(url).then((res) => res));
  const jsons = await Promise.all(promises);
  jsons.forEach((entry) => searchEntry(Object.entries(entry)));

  console.log("LOCATION", location);

  if (isGrail) {
    return location;
  } else {
    findGrail(JSON.stringify(jsons));
  }
};
const holyGrail = async () => {
  const file = readFileSync("./testData.json", "utf-8");
  const location = await findGrail(file);
  console.log("LOCATION", location);
  return `Holy Grail location: ${location}`;
};

export { holyGrail };
