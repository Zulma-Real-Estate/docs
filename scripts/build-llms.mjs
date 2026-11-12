// Builds llms.txt from docs.json and each page's frontmatter.
// Run from the repo root after changing pages: node scripts/build-llms.mjs
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://help.zulma.ca";
const docs = JSON.parse(readFileSync("docs.json", "utf8"));

function front(page) {
  const src = readFileSync(`${page}.mdx`, "utf8");
  const m = src.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) v = JSON.parse(v);
    out[kv[1]] = v;
  }
  return out;
}

const PARTS = {
  "Help": "## Help for homeowners\n\nGuides for the Zulma home app.",
};

const lines = [
  "# Zulma Help",
  "",
  "> Guides for Zulma, the home app for homeowners in Canada. Zulma keeps a home's record (rooms, systems, documents, costs and work done), plans and projects, quotes from local businesses, and invoices from businesses (Keepsafe) in one place. Its directory, Zulma Atlas, lists home-service businesses by trade and town in Ontario.",
  "",
  "Key facts:",
  "",
  "- The app is at https://app.zulma.ca. A Zulma account is free.",
  "- Zulma+ costs $9.99 a month or $99 a year before HST. It adds 50 GB of space, folders and PDF search, more AI use, and up to 25 projects out for quotes at once. Billing is on the web only.",
  "- Zu is Zulma's AI helper. It drafts projects and reads quotes, invoices, labels and files. Nothing it finds is saved until the person checks it.",
  "- Zulma is made by Zulma Resources Inc., operating as Zulma Real Estate, in Thorold, Ontario. Contact: hello@zulma.ca.",
  "- Each page below is also available as Markdown at the same URL with .md added. The full text of every page is at " + SITE + "/llms-full.txt.",
  "",
];

for (const tab of docs.navigation.tabs) {
  // a hidden tab (pages written ahead of their screens) stays out until it is shown
  if (tab.hidden) continue;
  lines.push(PARTS[tab.tab] ?? `## ${tab.tab}`, "");
  for (const group of tab.groups) {
    lines.push(`### ${group.group}`, "");
    for (const page of group.pages) {
      const f = front(page);
      const title = f.title || page;
      const desc = f.description ? `: ${f.description}` : "";
      lines.push(`- [${title}](${SITE}/${page}.md)${desc}`);
    }
    lines.push("");
  }
}

writeFileSync("llms.txt", lines.join("\n").replace(/\n+$/, "\n"));
console.log("llms.txt written");
