// Production build for the clinic site. No dependencies: Node 18+ only.
//
// index.html is authored as a page fragment (it is also published as a claude.ai
// artifact, which supplies its own document skeleton). This script wraps it in a
// complete HTML document with production metadata, copies only the images the page
// actually references, adds the static files in public/, and fails the build if
// anything the page points to is missing.
//
//   node build.mjs          -> dist/
//   SITE_URL=https://example.com node build.mjs   (optional; on Vercel the production URL is detected)

import { readFile, writeFile, mkdir, rm, cp, copyFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "dist");

const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  ""
).replace(/\/$/, "");

const src = await readFile(join(root, "index.html"), "utf8");
const split = src.indexOf('<div class="page">');
if (split === -1) throw new Error('index.html: could not find <div class="page"> to split head from body');
const headPart = src.slice(0, split).trim();
const bodyPart = src.slice(split).trim();

const title = (headPart.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
const description = (headPart.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
const abs = (p) => (siteUrl ? `${siteUrl}${p}` : p);

const meta = [
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
  '<meta name="theme-color" content="#0f1a1c">',
  '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
  '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
  siteUrl && `<link rel="canonical" href="${siteUrl}/">`,
  '<meta property="og:type" content="website">',
  '<meta property="og:locale" content="ar_EG">',
  '<meta property="og:locale:alternate" content="en_GB">',
  `<meta property="og:title" content="${title}">`,
  `<meta property="og:description" content="${description}">`,
  `<meta property="og:image" content="${abs("/og.jpg")}">`,
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  siteUrl && `<meta property="og:url" content="${siteUrl}/">`,
  '<meta name="twitter:card" content="summary_large_image">',
  // Parity with the artifact skeleton the page was authored against.
  "<style>[hidden]{display:none!important}</style>",
].filter(Boolean);

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
${meta.join("\n")}
${headPart}
</head>
<body>
${bodyPart}
</body>
</html>
`;

// Every local asset the page references must exist.
const refs = [...new Set([...src.matchAll(/(?:src|href)="(img\/[^"]+)"/g)].map((m) => m[1]))];
for (const ref of refs) await access(join(root, ref)).catch(() => { throw new Error(`Missing asset: ${ref}`); });

await rm(out, { recursive: true, force: true });
await mkdir(join(out, "img"), { recursive: true });
await writeFile(join(out, "index.html"), html);
for (const ref of refs) await copyFile(join(root, ref), join(out, ref));
await cp(join(root, "public"), out, { recursive: true });

console.log(`Built dist/ — ${refs.length} images, site URL: ${siteUrl || "(relative; set SITE_URL or deploy on Vercel)"}`);
