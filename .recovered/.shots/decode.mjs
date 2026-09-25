import fs from "node:fs";
import path from "node:path";

const dir = "/Users/koukimheng/.cursor/browser-logs";
const latest = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("cdp-response-Page.captureScreenshot"))
  .map((f) => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
  .sort((a, b) => b.t - a.t)[0].f;
const json = JSON.parse(fs.readFileSync(path.join(dir, latest), "utf8"));
const data = json.data ?? JSON.stringify(json).match(/"data":"([^"]+)/)[1];
fs.writeFileSync(new URL(`./${process.argv[2]}.jpg`, import.meta.url), Buffer.from(data, "base64"));
