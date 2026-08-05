import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceRoot = path.resolve(projectRoot, "httpsestatex.kitkitgo.com");
const publicRoot = path.resolve(projectRoot, "public");
const outputRoot = path.resolve(publicRoot, "kira");

if (!outputRoot.startsWith(`${publicRoot}${path.sep}`)) {
  throw new Error("Refusing to write outside public/.");
}

const routeMap = new Map([
  ["/kira/about/", "/about"],
  ["/kira/properties/", "/properties"],
  ["/kira/property-details/", "/property-details"],
  ["/kira/blog/", "/blog"],
  ["/kira/our-process/", "/our-process"],
  ["/kira/agents/", "/agents"],
  ["/kira/services/", "/services"],
  ["/kira/service-details/", "/service-details"],
  ["/kira/contact/", "/contact"],
  ["/kira/terms-and-conditions/", "/terms-and-conditions"],
  ["/kira/privacy-policy-2/", "/privacy-policy"],
  ["/kira/404-error/", "/404-error"],
]);

const copyReplacements = [
  [/EstateX@example\.com/gi, "hello@kirarealestate.demo"],
  [/New York, USA/gi, "Addis Ababa, Ethiopia"],
  [/Kathryn Murphy/g, "Selam Tadesse"],
  [/Isabel Martinez/g, "Noah Bekele"],
  [/Sophia Davis/g, "Liya Alem"],
  [/Liam Johnson/g, "Dawit Tesfaye"],
  [/Ava Brown/g, "Marta Girma"],
  [/Ethan Wilson/g, "Abel Fikru"],
  [/Penthouse Apartments/g, "The Bole Residence"],
  [/Cityscape Penthouse/g, "Kazanchis City Penthouse"],
  [/Sunset Boulevard Condo/g, "Summit Garden Apartments"],
  [/Lakeside Loft/g, "Ayat View Apartments"],
  [/Oceanfront Villa/g, "CMC Horizon Villa"],
  [/Harbor View Residence/g, "Old Airport Executive Residence"],
  [/Lakeview Loft/g, "Sar Bet Courtyard Home"],
  [/Luxury Home/g, "Bole Skyline Apartment"],
  [/Luxury Villa/g, "CMC Garden Villa"],
  [/Luxury House/g, "Old Airport Residence"],
  [/ETB 456\.00/g, "ETB 18,500,000"],
  [/ETB 500\.00/g, "ETB 19,800,000"],
  [/ETB 430\.00/g, "ETB 32,000,000"],
  [/ETB 359\.00/g, "ETB 24,500,000"],
  [/ETB 15,500/g, "ETB 15,500,000"],
  [/ETB 18,250/g, "ETB 18,250,000"],
  [/ETB 22,500/g, "ETB 22,500,000"],
  [/ETB 24,500/g, "ETB 24,500,000"],
  [/ETB 35,200/g, "ETB 35,200,000"],
  [/\(0123\) 456 789|\(0125\) 934 586|\(0157\) 753 246|\(0164\) 829 371|\(0321\) 987 654/g, "+251 11 555 0140"],
];

const brandStyle = `<style id="kira-rebrand">
:root{--kira-ink:#11150f;--kira-accent:#c9f45b;--kira-paper:#f5f4ef;--kira-white:#fff;--kira-line:rgba(17,21,15,.14)}
html{scroll-behavior:smooth}body{background:var(--kira-paper);color:var(--kira-ink);text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}::selection{background:var(--kira-accent);color:var(--kira-ink)}
.kira-wordmark{display:inline-flex;align-items:baseline;gap:7px;color:var(--kira-ink);font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:24px;font-weight:800;letter-spacing:-.065em;line-height:1}.kira-wordmark span{color:#527000;font-size:9px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.elementskit-nav-logo .kira-wordmark{padding:14px 0}
.elementor-button,.elementskit-btn,.ekit-menu-nav-link,.jkit-hamburger-menu,.jkit-menu-dropdown-btn,a,button{transition:transform .28s cubic-bezier(.2,.8,.2,1),background-color .28s ease,color .28s ease,border-color .28s ease,box-shadow .28s ease!important}.elementor-button:hover,.elementskit-btn:hover{transform:translateY(-2px)}.elementor-button:active,.elementskit-btn:active,button:active{transform:translateY(1px) scale(.985)}
.elementor-widget-image img,.jkit-gallery img,.sina-bg-thumb img{transition:transform .65s cubic-bezier(.2,.8,.2,1),filter .4s ease;filter:saturate(.9) contrast(1.03)}.elementor-widget-image a:hover img,.jkit-gallery a:hover img{transform:scale(1.025)}
a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:3px solid var(--kira-accent)!important;outline-offset:3px!important}
.kira-demo-note{background:var(--kira-ink);color:rgba(255,255,255,.65);font:500 11px/1.6 "DM Sans",Arial,sans-serif;padding:13px 20px;text-align:center;letter-spacing:.02em}.kira-local-success{margin-top:12px;border:1px solid #89ad29;border-radius:10px;background:#eef8d5;color:var(--kira-ink);padding:12px 14px;font:600 14px/1.5 "DM Sans",Arial,sans-serif}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
</style>`;

const localScript = `<script id="kira-local-behavior">
document.addEventListener('submit',function(event){var form=event.target;if(!(form instanceof HTMLFormElement)||form.getAttribute('role')==='search')return;event.preventDefault();var button=form.querySelector('button[type="submit"],input[type="submit"]');if(button){button.disabled=true;if(button.tagName==='INPUT')button.value='Message sent';else button.textContent='Message sent';}var note=document.createElement('div');note.className='kira-local-success';note.setAttribute('role','status');note.textContent='Thank you. This demonstration inquiry has been received locally.';form.appendChild(note);},true);
</script>`;

function applyKiraPalette(input) {
  return input
    .replace(/#ff6400/gi, "#c9f45b")
    .replace(/#fff5eb/gi, "#f1f0e9")
    .replace(/#fffbf8/gi, "#faf9f5")
    .replace(/#131720/gi, "#11150f");
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

function transformHtml(input) {
  let output = input
    .replaceAll("https://estatex.kitkitgo.com/", "/kira/")
    .replaceAll("http://estatex.kitkitgo.com/", "/kira/")
    .replace(/<img\b[^>]*Frame-93-1(?:-150x44)?\.png[^>]*>/gi, '<span class="kira-wordmark" aria-label="Kira Real Estate">Kira<span>Real Estate</span></span>')
    .replace(/EstateX/g, "Kira Real Estate")
    .replace(/Estatex/g, "Kira Real Estate")
    .replace(/estatex/g, "kira-real-estate")
    .replace(/\$(\d[\d,.]*)/g, "ETB $1");

  // Keep downloaded assets under /kira/. Only rewrite actual page links to the
  // clean public routes; replacing every /kira/ prefix strips CSS/JS paths.
  for (const [from, to] of routeMap) {
    output = output
      .replaceAll(`href="${from}"`, `href="${to}"`)
      .replaceAll(`href='${from}'`, `href='${to}'`);
  }
  output = output
    .replaceAll('href="/kira/"', 'href="/"')
    .replaceAll("href='/kira/'", "href='/'")
    .replaceAll("Kira Real Estate Real Estate", "Kira Real Estate");
  for (const [pattern, replacement] of copyReplacements) output = output.replace(pattern, replacement);

  output = output
    .replace("</head>", `${brandStyle}</head>`)
    .replace("</body>", `<div class="kira-demo-note">Demonstration website - properties, prices and company information are sample content.</div>${localScript}</body>`);
  return applyKiraPalette(output);
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(sourceRoot, outputRoot, { recursive: true });

const files = await collectFiles(outputRoot);
for (const file of files) {
  const extension = path.extname(file).toLowerCase();
  if (![".html", ".css", ".js"].includes(extension)) continue;
  const content = await readFile(file, "utf8");
  const transformed = extension === ".html"
    ? transformHtml(content)
    : applyKiraPalette(content.replaceAll("https://estatex.kitkitgo.com/", "/kira/").replaceAll("http://estatex.kitkitgo.com/", "/kira/"));
  await writeFile(file, transformed, "utf8");
}

console.log(`Built Kira static clone from ${files.length} downloaded files.`);
