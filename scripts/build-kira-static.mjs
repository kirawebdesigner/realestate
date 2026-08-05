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
  ["/kira/2025/10/07/home-staging-tips-to-attract-buyers-quickly/", "/2025/10/07/home-staging-tips-to-attract-buyers-quickly"],
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
:root{--kira-ink:#0b1220;--kira-accent:#3156d3;--kira-slate:#eef0f2;--kira-paper:#f4f6f8;--kira-white:#fff;--kira-line:rgba(11,18,32,.14)}
html{scroll-behavior:smooth}body{background:var(--kira-paper);color:var(--kira-ink);text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}::selection{background:var(--kira-accent);color:var(--kira-ink)}
.kira-wordmark{display:inline-flex;align-items:baseline;gap:7px;color:var(--kira-ink);font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:24px;font-weight:800;letter-spacing:-.065em;line-height:1}.kira-wordmark span{color:var(--kira-accent);font-size:9px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.elementskit-nav-logo .kira-wordmark{padding:14px 0}
.elementor-button,.elementskit-btn,.ekit-menu-nav-link,.jkit-hamburger-menu,.jkit-menu-dropdown-btn,a,button{transition:transform .28s cubic-bezier(.2,.8,.2,1),background-color .28s ease,color .28s ease,border-color .28s ease,box-shadow .28s ease!important}.elementor-button:hover,.elementskit-btn:hover{transform:translateY(-2px)}.elementor-button:active,.elementskit-btn:active,button:active{transform:translateY(1px) scale(.985)}
.elementor-widget-image img,.jkit-gallery img,.sina-bg-thumb img{transition:transform .65s cubic-bezier(.2,.8,.2,1),filter .4s ease;filter:saturate(.9) contrast(1.03)}.elementor-widget-image a:hover img,.jkit-gallery a:hover img{transform:scale(1.025)}
a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible{outline:3px solid var(--kira-accent)!important;outline-offset:3px!important}
.kira-demo-note{background:var(--kira-ink);color:rgba(255,255,255,.65);font:500 11px/1.6 "DM Sans",Arial,sans-serif;padding:13px 20px;text-align:center;letter-spacing:.02em}.kira-local-success{margin-top:12px;border:1px solid var(--kira-accent);border-radius:10px;background:#edf1ff;color:var(--kira-ink);padding:12px 14px;font:600 14px/1.5 "DM Sans",Arial,sans-serif}
.kira-services{background:#e9edf2;padding:112px 24px 120px;color:var(--kira-ink)}.kira-services__inner{width:min(1200px,100%);margin:0 auto}.kira-services__header{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(280px,.65fr);gap:80px;align-items:end;margin-bottom:58px}.kira-services__eyebrow{margin:0 0 20px;font:700 12px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--kira-accent)}.kira-services h2{max-width:760px;margin:0;font:700 clamp(42px,5vw,72px)/.98 "Plus Jakarta Sans",sans-serif;letter-spacing:-.055em;color:var(--kira-ink)}.kira-services__intro{max-width:440px;margin:0 0 6px;font:400 17px/1.7 "DM Sans",sans-serif;color:#536071}.kira-services__layout{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);gap:0;border:1px solid var(--kira-line);background:#fff;overflow:hidden;border-radius:16px}.kira-services__feature{position:relative;min-height:650px;overflow:hidden}.kira-services__feature img{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.8,.2,1),filter .5s ease;filter:saturate(.8) contrast(1.05)}.kira-services__feature:hover img{transform:scale(1.025)}.kira-services__feature-copy{position:absolute;inset:auto 0 0;padding:96px 44px 42px;background:linear-gradient(180deg,transparent,rgba(7,12,22,.88));color:#fff}.kira-services__feature-copy strong{display:block;max-width:520px;font:650 clamp(28px,3vw,42px)/1.08 "Plus Jakarta Sans",sans-serif;letter-spacing:-.035em}.kira-services__feature-copy span{display:block;margin-top:12px;font:500 14px/1.5 "DM Sans",sans-serif;color:rgba(255,255,255,.72)}.kira-services__list{display:flex;flex-direction:column;background:#fff}.kira-service-row{position:relative;display:grid;grid-template-columns:48px 1fr 28px;gap:18px;align-items:start;min-height:130px;padding:30px 30px;border-bottom:1px solid var(--kira-line);color:var(--kira-ink)!important}.kira-service-row:last-child{border-bottom:0}.kira-service-row:hover{background:#f1f4ff;transform:none}.kira-service-row__number{font:650 12px/1.4 "Plus Jakarta Sans",sans-serif;color:var(--kira-accent)}.kira-service-row strong{display:block;margin-bottom:8px;font:650 20px/1.2 "Plus Jakarta Sans",sans-serif;letter-spacing:-.025em}.kira-service-row small{display:block;max-width:320px;font:400 14px/1.55 "DM Sans",sans-serif;color:#697586}.kira-service-row__arrow{font:400 22px/1 "Plus Jakarta Sans",sans-serif;transition:transform .25s ease}.kira-service-row:hover .kira-service-row__arrow{transform:translate(3px,-3px)}
@media(max-width:900px){.kira-services{padding:82px 22px 88px}.kira-services__header{grid-template-columns:1fr;gap:24px;margin-bottom:40px}.kira-services__layout{grid-template-columns:1fr}.kira-services__feature{min-height:480px}.kira-services__list{display:grid;grid-template-columns:1fr 1fr}.kira-service-row{min-height:160px}.kira-service-row:nth-child(odd){border-right:1px solid var(--kira-line)}}
@media(max-width:600px){.kira-services{padding:66px 16px 72px}.kira-services h2{font-size:42px}.kira-services__layout{border-radius:12px}.kira-services__feature{min-height:360px}.kira-services__feature-copy{padding:80px 24px 26px}.kira-services__list{display:block}.kira-service-row{grid-template-columns:38px 1fr 24px;min-height:0;padding:24px 22px}.kira-service-row:nth-child(odd){border-right:0}}
.kira-header{position:sticky;top:0;z-index:999;padding:16px 24px;background:var(--kira-slate)}.kira-header__inner{display:grid;grid-template-columns:220px 1fr auto;align-items:center;width:min(1400px,100%);height:70px;margin:auto;padding:0 22px 0 28px;border:1px solid rgba(255,255,255,.16);border-radius:999px}.kira-header .kira-wordmark{color:#fff}.kira-header__nav{display:flex;justify-content:flex-start;gap:38px;padding-left:26px;border-left:1px solid rgba(255,255,255,.18)}.kira-header__nav a{position:relative;color:#fff;font:600 14px/1 "Plus Jakarta Sans",sans-serif}.kira-header__nav a:after{content:"";position:absolute;left:0;right:100%;bottom:-10px;height:2px;background:var(--kira-accent);transition:right .25s ease}.kira-header__nav a:hover:after{right:0}.kira-header__tools{display:flex;align-items:center;justify-content:flex-end;gap:12px}.kira-header__phone{margin-right:8px;color:#fff!important;font:650 13px "Plus Jakarta Sans",sans-serif}.kira-header__phone span{color:var(--kira-accent);border-bottom:1px solid var(--kira-accent)}.kira-icon-button{display:grid;place-items:center;width:42px;height:42px;border:1px solid rgba(255,255,255,.22);border-radius:50%;background:transparent;color:#fff;cursor:pointer}.kira-icon-button:hover{background:rgba(255,255,255,.1);color:var(--kira-accent)}.kira-header__cta{display:inline-flex;align-items:center;gap:10px;padding:15px 22px;border-radius:999px;background:var(--kira-accent);color:var(--kira-ink)!important;font:750 13px/1 "Plus Jakarta Sans",sans-serif}.kira-menu-button{display:none}.kira-search-panel{display:none;position:absolute;left:0;right:0;top:102px;padding:22px;background:#fff;border-bottom:1px solid var(--kira-line);box-shadow:0 22px 50px rgba(11,18,32,.08)}.kira-search-panel.is-open{display:block}.kira-search-panel form{display:flex;gap:12px;width:min(760px,100%);margin:auto}.kira-search-panel input{flex:1;min-width:0;padding:15px 18px;border:1px solid var(--kira-line);border-radius:10px;background:#f7f8fa;color:var(--kira-ink);font:500 15px "DM Sans",sans-serif}.kira-search-panel button{padding:0 24px;border:0;border-radius:10px;background:var(--kira-accent);color:var(--kira-ink);font:700 13px "Plus Jakarta Sans",sans-serif}
.kira-listings{padding:112px 24px 120px;background:#f7f8fa}.kira-listings__inner{width:min(1200px,100%);margin:auto}.kira-section-heading{display:flex;justify-content:space-between;align-items:end;gap:40px;margin-bottom:46px}.kira-section-heading__eyebrow{margin:0 0 16px;color:var(--kira-accent);font:700 12px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:.14em;text-transform:uppercase}.kira-section-heading h2{max-width:720px;margin:0;color:var(--kira-ink);font:700 clamp(40px,4.6vw,66px)/1 "Plus Jakarta Sans",sans-serif;letter-spacing:-.05em}.kira-listing-filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px}.kira-listing-filter{padding:11px 16px;border:1px solid var(--kira-line);border-radius:999px;background:transparent;color:#526071;font:650 13px "Plus Jakarta Sans",sans-serif;cursor:pointer}.kira-listing-filter.is-active,.kira-listing-filter:hover{border-color:var(--kira-accent);background:var(--kira-accent);color:#fff}.kira-listing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.kira-property-card{overflow:hidden;border:1px solid var(--kira-line);border-radius:14px;background:#fff}.kira-property-card[hidden]{display:none}.kira-property-card__media{position:relative;display:block;aspect-ratio:1.35;overflow:hidden}.kira-property-card__media img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.8,.2,1)}.kira-property-card:hover .kira-property-card__media img{transform:scale(1.04)}.kira-favorite{position:absolute;right:14px;top:14px;display:grid;place-items:center;width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.92);color:var(--kira-ink);cursor:pointer;box-shadow:0 7px 24px rgba(11,18,32,.12)}.kira-favorite.is-active{background:var(--kira-accent);color:#fff}.kira-property-card__body{padding:22px}.kira-property-card__location{margin:0 0 9px;color:#718096;font:600 12px/1.4 "DM Sans",sans-serif}.kira-property-card h3{margin:0 0 18px;color:var(--kira-ink);font:650 21px/1.2 "Plus Jakarta Sans",sans-serif;letter-spacing:-.025em}.kira-property-card__facts{display:flex;gap:16px;padding-bottom:18px;border-bottom:1px solid var(--kira-line);color:#687487;font:500 12px "DM Sans",sans-serif}.kira-property-card__bottom{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:18px}.kira-property-card__price{color:var(--kira-ink);font:750 16px/1.2 "Plus Jakarta Sans",sans-serif}.kira-property-card__link{color:var(--kira-accent);font:700 13px/1 "Plus Jakarta Sans",sans-serif}.kira-listings__all{display:inline-flex;align-items:center;gap:10px;margin-top:34px;color:var(--kira-ink);font:700 14px "Plus Jakarta Sans",sans-serif}
.kira-testimonials{padding:116px 24px;background:#fff}.kira-testimonials__inner{width:min(1200px,100%);margin:auto}.kira-testimonials__frame{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);min-height:560px;border:1px solid var(--kira-line);border-radius:16px;overflow:hidden;background:#f4f6f8}.kira-testimonials__image{min-height:560px;background:url('/images/properties/light-interior.jpg') center/cover}.kira-testimonials__content{display:flex;flex-direction:column;justify-content:space-between;padding:56px}.kira-testimonials__mark{color:var(--kira-accent);font:700 48px/1 Georgia,serif}.kira-quote{display:none}.kira-quote.is-active{display:block}.kira-quote blockquote{max-width:650px;margin:28px 0 36px;color:var(--kira-ink);font:600 clamp(28px,3.3vw,48px)/1.15 "Plus Jakarta Sans",sans-serif;letter-spacing:-.04em}.kira-quote__person{display:flex;align-items:center;gap:14px}.kira-quote__person img{width:48px;height:48px;border-radius:50%;object-fit:cover}.kira-quote__person strong{display:block;font:700 14px "Plus Jakarta Sans",sans-serif}.kira-quote__person span{display:block;margin-top:4px;color:#758196;font:500 12px "DM Sans",sans-serif}.kira-testimonials__controls{display:flex;justify-content:flex-end;gap:8px}.kira-testimonials__controls button{width:46px;height:46px;border:1px solid var(--kira-line);border-radius:50%;background:#fff;color:var(--kira-ink);font-size:18px;cursor:pointer}.kira-testimonials__controls button:hover{border-color:var(--kira-accent);background:var(--kira-accent);color:#fff}
.kira-footer{padding:84px 24px 26px;background:#0b1220;color:#fff}.kira-footer__inner{width:min(1200px,100%);margin:auto}.kira-footer__cta{display:flex;align-items:center;justify-content:space-between;gap:30px;padding:42px;border-radius:16px;background:var(--kira-accent)}.kira-footer__cta h2{max-width:620px;margin:0;color:#fff;font:700 clamp(34px,4vw,56px)/1 "Plus Jakarta Sans",sans-serif;letter-spacing:-.05em}.kira-footer__cta a{display:inline-flex;align-items:center;justify-content:center;min-width:150px;padding:17px 22px;border-radius:999px;background:#fff;color:var(--kira-ink);font:700 14px "Plus Jakarta Sans",sans-serif}.kira-footer__grid{display:grid;grid-template-columns:1.6fr repeat(3,1fr);gap:70px;padding:70px 0 56px}.kira-footer__about{max-width:360px;color:rgba(255,255,255,.62);font:400 14px/1.8 "DM Sans",sans-serif}.kira-footer h3{margin:0 0 20px;color:#fff;font:700 13px "Plus Jakarta Sans",sans-serif}.kira-footer__links{display:grid;gap:12px}.kira-footer__links a,.kira-footer__links span{color:rgba(255,255,255,.6);font:500 13px "DM Sans",sans-serif}.kira-footer__links a:hover{color:#fff}.kira-footer__bottom{display:flex;justify-content:space-between;gap:20px;padding-top:24px;border-top:1px solid rgba(255,255,255,.13);color:rgba(255,255,255,.46);font:500 11px/1.6 "DM Sans",sans-serif}
@media(max-width:1050px){.kira-header{padding:12px 16px}.kira-header__inner{grid-template-columns:1fr auto;height:64px}.kira-header__nav{display:none;position:absolute;left:16px;right:16px;top:88px;flex-direction:column;gap:0;padding:12px 24px 22px;background:var(--kira-slate);border:1px solid rgba(255,255,255,.16);border-radius:16px}.kira-header__nav.is-open{display:flex}.kira-header__nav a{padding:14px 4px}.kira-header__cta,.kira-header__phone{display:none}.kira-menu-button{display:grid}.kira-listing-grid{grid-template-columns:repeat(2,1fr)}.kira-testimonials__frame{grid-template-columns:1fr}.kira-testimonials__image{min-height:370px}.kira-footer__grid{grid-template-columns:1.4fr 1fr;gap:48px}.kira-section-heading{display:block}.kira-section-heading p:last-child{margin-top:20px}}
@media(max-width:600px){.kira-header{padding:10px}.kira-header__inner{height:60px;padding:0 10px 0 18px}.kira-search-panel{top:80px}.kira-header__nav{left:10px;right:10px;top:80px}.kira-header__tools{gap:7px}.kira-icon-button{width:40px;height:40px}.kira-listings,.kira-testimonials{padding:72px 16px}.kira-listing-grid{grid-template-columns:1fr}.kira-testimonials__image{min-height:280px}.kira-testimonials__content{padding:32px 24px}.kira-testimonials__frame{border-radius:12px}.kira-footer{padding:64px 16px 24px}.kira-footer__cta{display:block;padding:30px 24px;border-radius:12px}.kira-footer__cta a{margin-top:24px}.kira-footer__grid{grid-template-columns:1fr;gap:34px;padding:52px 0 40px}.kira-footer__bottom{display:block}.kira-footer__bottom span{display:block;margin-top:8px}.kira-search-panel form{display:grid}}
.kira-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.2,1)}.kira-reveal.is-visible{opacity:1;transform:none}.page-id-83 .elementor-widget-heading h1,.page-id-142 .elementor-widget-heading h1{letter-spacing:-.055em!important}.page-id-83 input,.page-id-83 textarea,.page-id-83 select{border-radius:10px!important;border-color:var(--kira-line)!important;background:#f7f8fa!important}.page-id-83 .elementor-button,.page-id-142 .elementor-button{box-shadow:none!important}.page-id-142 .e-con.e-child{border-color:var(--kira-line)!important}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
</style>`;

const kiraHeader = `<header class="kira-header"><div class="kira-header__inner"><a href="/" aria-label="Kira Real Estate home"><span class="kira-wordmark">Kira<span>Real Estate</span></span></a><nav class="kira-header__nav" id="kira-main-nav" aria-label="Primary navigation"><a href="/">Home</a><a href="/properties">Properties</a><a href="/services">Services</a><a href="/blog">Journal</a><a href="/about">About</a></nav><div class="kira-header__tools"><a class="kira-header__phone" href="tel:+251115550140">Call us: <span>+251 11 555 0140</span></a><button class="kira-icon-button kira-search-toggle" type="button" aria-label="Open property search" aria-expanded="false"><i class="fas fa-search" aria-hidden="true"></i></button><a class="kira-header__cta" href="/contact">Get in touch</a><button class="kira-icon-button kira-menu-button" type="button" aria-label="Open menu" aria-controls="kira-main-nav" aria-expanded="false"><i class="fas fa-bars" aria-hidden="true"></i></button></div></div><div class="kira-search-panel"><form action="/properties" role="search"><label class="screen-reader-text" for="kira-search">Search properties</label><input id="kira-search" name="location" placeholder="Search Bole, CMC, Kazanchis or a property name"><button type="submit">Search properties</button></form></div></header>`;

const kiraListingsSection = `<section class="kira-listings" aria-labelledby="kira-listings-title"><div class="kira-listings__inner"><div class="kira-section-heading"><div><p class="kira-section-heading__eyebrow">Selected listings</p><h2 id="kira-listings-title">Homes worth a closer look.</h2></div><p class="kira-services__intro">Explore a focused collection of sample residences across Addis Ababa, selected to make comparison clear and site visits simple.</p></div><div class="kira-listing-filters" aria-label="Filter featured listings"><button class="kira-listing-filter is-active" type="button" data-filter="all">All homes</button><button class="kira-listing-filter" type="button" data-filter="apartment">Apartments</button><button class="kira-listing-filter" type="button" data-filter="villa">Villas</button><button class="kira-listing-filter" type="button" data-filter="penthouse">Penthouses</button></div><div class="kira-listing-grid">
${[
  ["apartment","modern-exterior.jpg","The Bole Residence","Bole","ETB 18,500,000","3 beds","3 baths","186 m²"],
  ["penthouse","penthouse.jpg","Kazanchis City Penthouse","Kazanchis","ETB 32,000,000","4 beds","4 baths","310 m²"],
  ["apartment","light-interior.jpg","Summit Garden Apartments","Summit","From ETB 12,800,000","2 beds","2 baths","128 m²"],
  ["villa","villa-exterior.jpg","CMC Horizon Villa","CMC","ETB 35,200,000","5 beds","5 baths","420 m²"],
  ["villa","courtyard.jpg","Sar Bet Courtyard Home","Sar Bet","ETB 24,500,000","4 beds","3 baths","290 m²"],
  ["apartment","apartment-exterior.jpg","Old Airport Executive Residence","Old Airport","ETB 22,500,000","3 beds","3 baths","214 m²"],
].map(([type,image,title,location,price,bed,bath,area],index)=>`<article class="kira-property-card" data-type="${type}"><div class="kira-property-card__media"><a href="/property-details" aria-label="View ${title}"><img src="/images/properties/${image}" alt="${title} sample property" loading="lazy" decoding="async"></a><button class="kira-favorite" type="button" data-favorite="kira-${index+1}" aria-label="Save ${title}"><i class="far fa-heart" aria-hidden="true"></i></button></div><div class="kira-property-card__body"><p class="kira-property-card__location">${location}, Addis Ababa</p><h3>${title}</h3><div class="kira-property-card__facts"><span>${bed}</span><span>${bath}</span><span>${area}</span></div><div class="kira-property-card__bottom"><span class="kira-property-card__price">${price}</span><a class="kira-property-card__link" href="/property-details">View details ↗</a></div></div></article>`).join("")}
</div><a class="kira-listings__all" href="/properties">Explore all properties <span aria-hidden="true">↗</span></a></div></section>`;

const kiraTestimonialsSection = `<section class="kira-testimonials" aria-labelledby="kira-testimonials-title"><div class="kira-testimonials__inner"><div class="kira-section-heading"><div><p class="kira-section-heading__eyebrow">Client perspective</p><h2 id="kira-testimonials-title">Clarity makes every decision feel lighter.</h2></div></div><div class="kira-testimonials__frame"><div class="kira-testimonials__image" role="img" aria-label="Bright contemporary apartment interior"></div><div class="kira-testimonials__content"><div><div class="kira-testimonials__mark" aria-hidden="true">“</div><div class="kira-quote is-active"><blockquote>Kira helped us compare the details that actually mattered before we arranged a visit.</blockquote><div class="kira-quote__person"><img src="/images/properties/advisor-1.jpg" alt=""><span><strong>Meron A.</strong><span>Sample buyer testimonial</span></span></div></div><div class="kira-quote"><blockquote>The process felt considered, responsive and much easier to understand from the first conversation.</blockquote><div class="kira-quote__person"><img src="/images/properties/advisor-2.jpg" alt=""><span><strong>Dawit T.</strong><span>Sample investor testimonial</span></span></div></div></div><div class="kira-testimonials__controls"><button type="button" data-testimonial="prev" aria-label="Previous testimonial">←</button><button type="button" data-testimonial="next" aria-label="Next testimonial">→</button></div></div></div></div></section>`;

const kiraFooter = `<footer class="kira-footer"><div class="kira-footer__inner"><div class="kira-footer__cta"><h2>Your next property decision starts with a conversation.</h2><a href="/contact">Schedule a visit ↗</a></div><div class="kira-footer__grid"><div><span class="kira-wordmark" style="color:#fff">Kira<span>Real Estate</span></span><p class="kira-footer__about">Selected apartments, residences and investment opportunities across Addis Ababa, presented with clarity and thoughtful local support.</p></div><div><h3>Explore</h3><div class="kira-footer__links"><a href="/properties">Properties</a><a href="/services">Services</a><a href="/about">About Kira</a><a href="/contact">Contact</a></div></div><div><h3>Neighborhoods</h3><div class="kira-footer__links"><a href="/properties?location=Bole">Bole</a><a href="/properties?location=CMC">CMC</a><a href="/properties?location=Kazanchis">Kazanchis</a><a href="/properties?location=Old%20Airport">Old Airport</a></div></div><div><h3>Contact</h3><div class="kira-footer__links"><a href="tel:+251115550140">+251 11 555 0140</a><a href="mailto:hello@kirarealestate.demo">hello@kirarealestate.demo</a><span>Addis Ababa, Ethiopia</span></div></div></div><div class="kira-footer__bottom"><span>© 2026 Kira Real Estate</span><span><a href="/terms-and-conditions">Terms</a> · <a href="/privacy-policy">Privacy</a></span></div></div></footer>`;

const kiraServicesSection = `<section class="kira-services" aria-labelledby="kira-services-title">
  <div class="kira-services__inner">
    <div class="kira-services__header">
      <div><p class="kira-services__eyebrow">Kira services</p><h2 id="kira-services-title">Property decisions, handled with clarity.</h2></div>
      <p class="kira-services__intro">From the first shortlist to the final site visit, Kira brings the information, coordination and local context you need into one considered experience.</p>
    </div>
    <div class="kira-services__layout">
      <a class="kira-services__feature" href="/services" aria-label="Explore Kira property services">
        <img src="/images/properties/modern-exterior.jpg" alt="Contemporary residence represented by Kira Real Estate" loading="lazy">
        <span class="kira-services__feature-copy"><strong>A better view of every opportunity.</strong><span>Selected homes and developments across Addis Ababa</span></span>
      </a>
      <div class="kira-services__list">
        <a class="kira-service-row" href="/services"><span class="kira-service-row__number">01</span><span><strong>Property sales</strong><small>Curated apartments, villas and development units.</small></span><span class="kira-service-row__arrow" aria-hidden="true">↗</span></a>
        <a class="kira-service-row" href="/services"><span class="kira-service-row__number">02</span><span><strong>Site visit coordination</strong><small>Efficient scheduling with clear property context.</small></span><span class="kira-service-row__arrow" aria-hidden="true">↗</span></a>
        <a class="kira-service-row" href="/services"><span class="kira-service-row__number">03</span><span><strong>Investment guidance</strong><small>Practical comparisons for informed decisions.</small></span><span class="kira-service-row__arrow" aria-hidden="true">↗</span></a>
        <a class="kira-service-row" href="/services"><span class="kira-service-row__number">04</span><span><strong>Property presentation</strong><small>Photography and marketing that respects the asset.</small></span><span class="kira-service-row__arrow" aria-hidden="true">↗</span></a>
        <a class="kira-service-row" href="/contact"><span class="kira-service-row__number">05</span><span><strong>Buyer inquiry management</strong><small>Responsive follow-up from interest to appointment.</small></span><span class="kira-service-row__arrow" aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
</section>`;

const kiraAgentsSection = `<section class="kira-agents" aria-labelledby="kira-agents-title"><div class="kira-agents__inner"><div class="kira-section-heading"><div><p class="kira-section-heading__eyebrow">Kira advisors</p><h2 id="kira-agents-title">People who make the process clearer.</h2></div><p class="kira-services__intro">A demonstration team showing how agent profiles, direct contact and specialist roles can be presented.</p></div><div class="kira-agent-grid">${[["advisor-1.jpg","Selam Tadesse","Residential advisor"],["advisor-2.jpg","Noah Bekele","Property consultant"],["advisor-3.jpg","Liya Alem","Site visit coordinator"],["advisor-4.jpg","Dawit Tesfaye","Investment advisor"],["advisor-5.jpg","Marta Girma","Listing specialist"],["advisor-6.jpg","Abel Fikru","Client support"]].map(([image,name,role])=>`<article class="kira-agent-card"><div class="kira-agent-card__image"><img src="/images/properties/${image}" alt="${name}, ${role}" loading="lazy" decoding="async"></div><div class="kira-agent-card__body"><div><h3>${name}</h3><p>${role}</p></div><a href="/contact" aria-label="Contact ${name}">↗</a></div></article>`).join("")}</div><div class="kira-agents__cta"><a href="/agents">Meet all advisors</a></div></div></section>`;

const kiraMoreHomesSection = `<section class="kira-more-homes" aria-labelledby="kira-more-homes-title"><div class="kira-more-homes__inner"><div class="kira-section-heading"><div><p class="kira-section-heading__eyebrow">More to explore</p><h2 id="kira-more-homes-title">Three distinct ways to live in Addis.</h2></div></div><div class="kira-more-homes__grid">${[["warm-interior.jpg","Bole Skyline Apartment","Bole","ETB 18,500,000"],["villa-pool.jpg","CMC Garden Villa","CMC","ETB 35,200,000"],["glass-office.jpg","Kazanchis Executive Suite","Kazanchis","ETB 24,500,000"]].map(([image,title,place,price])=>`<article class="kira-more-home"><img src="/images/properties/${image}" alt="${title} sample property" loading="lazy" decoding="async"><div class="kira-more-home__body"><h3>${title}</h3><p>${place}, Addis Ababa</p><div class="kira-more-home__bottom"><strong>${price}</strong><a href="/property-details">View details ↗</a></div></div></article>`).join("")}</div></div></section>`;

const kiraInnerPageStyle = `<style id="kira-inner-pages">
.kira-agents{padding:108px 24px 116px;background:#fff}.kira-agents__inner,.kira-more-homes__inner{width:min(1200px,100%);margin:auto}.kira-agent-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.kira-agent-card{overflow:hidden;border:1px solid var(--kira-line);border-radius:14px;background:#f7f8fa}.kira-agent-card__image{aspect-ratio:1/.88;overflow:hidden;background:#e9edf2}.kira-agent-card__image img{width:100%;height:100%;object-fit:cover;object-position:center 20%;transition:transform .65s cubic-bezier(.2,.8,.2,1)}.kira-agent-card:hover img{transform:scale(1.025)}.kira-agent-card__body{display:flex;justify-content:space-between;gap:18px;align-items:center;padding:18px 20px}.kira-agent-card h3{margin:0;font:700 16px/1.2 "Plus Jakarta Sans",sans-serif}.kira-agent-card p{margin:5px 0 0;color:#728096;font:500 12px "DM Sans",sans-serif}.kira-agent-card a{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--kira-accent);color:#fff}.kira-agents__cta{display:flex;justify-content:center;margin-top:30px}.kira-agents__cta a{padding:15px 20px;border-radius:999px;background:var(--kira-accent);color:#fff;font:700 13px "Plus Jakarta Sans",sans-serif}.kira-more-homes{padding:94px 24px 100px;background:#0b2940;color:#fff}.kira-more-homes .kira-section-heading h2{color:#fff}.kira-more-homes .kira-section-heading__eyebrow{color:#8ea5ff}.kira-more-homes__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.kira-more-home{overflow:hidden;border-radius:14px;background:#fff;color:var(--kira-ink)}.kira-more-home img{display:block;width:100%;aspect-ratio:1.5;object-fit:cover}.kira-more-home__body{padding:20px}.kira-more-home h3{margin:0 0 8px;font:700 18px/1.2 "Plus Jakarta Sans",sans-serif}.kira-more-home p{margin:0;color:#6f7b8d;font:500 12px "DM Sans",sans-serif}.kira-more-home__bottom{display:flex;justify-content:space-between;align-items:center;margin-top:18px;padding-top:16px;border-top:1px solid var(--kira-line)}.kira-more-home strong{font:750 14px "Plus Jakarta Sans",sans-serif}.kira-more-home a{color:var(--kira-accent);font:700 12px "Plus Jakarta Sans",sans-serif}@media(max-width:800px){.kira-agent-grid,.kira-more-homes__grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:540px){.kira-agents,.kira-more-homes{padding:72px 16px}.kira-agent-grid,.kira-more-homes__grid{grid-template-columns:1fr}}
.elementor-element-1eed4168 .elementor-widget-icon-box .elementor-icon svg path{fill:#fff!important}.elementor-element-1eed4168 .elementor-widget-icon-box .elementor-icon svg path[stroke]{stroke:#fff!important}
.kira-header{background:#f4f6f8}.kira-header__inner{border-color:rgba(11,18,32,.14);background:#fff;box-shadow:0 14px 40px rgba(11,18,32,.06)}.kira-header .kira-wordmark,.kira-header__nav a,.kira-header__phone{color:var(--kira-ink)!important}.kira-header__nav{border-left-color:rgba(11,18,32,.14)}.kira-icon-button{border-color:rgba(11,18,32,.16);color:var(--kira-ink)}.kira-header__cta{color:#fff!important}.kira-header__phone span{color:var(--kira-ink);border-bottom-color:var(--kira-accent)}
.kira-page{background:#f4f5f5;color:var(--kira-ink)}.kira-page__hero{padding:96px 24px 82px;background:var(--kira-slate);color:#fff}.kira-page__hero-inner,.kira-contact__inner,.kira-services-page__inner{width:min(1200px,100%);margin:auto}.kira-page__eyebrow{margin:0 0 20px;color:#ffd49a;font:700 12px/1 "Plus Jakarta Sans",sans-serif;letter-spacing:.14em;text-transform:uppercase}.kira-page__hero h1{max-width:850px;margin:0;font:700 clamp(48px,7vw,92px)/.96 "Plus Jakarta Sans",sans-serif;letter-spacing:-.06em;color:#fff}.kira-page__hero p{max-width:610px;margin:30px 0 0;color:rgba(255,255,255,.72);font:400 18px/1.7 "DM Sans",sans-serif}.kira-contact{padding:96px 24px 112px}.kira-contact__inner{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.72fr);gap:28px}.kira-contact__form,.kira-contact__aside{border:1px solid var(--kira-line);border-radius:16px;background:#fff;padding:42px}.kira-contact h2{margin:0 0 12px;font:700 clamp(34px,4vw,52px)/1.05 "Plus Jakarta Sans",sans-serif;letter-spacing:-.045em}.kira-contact__lede{margin:0 0 34px;color:#667283;font:400 15px/1.7 "DM Sans",sans-serif}.kira-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.kira-field{display:grid;gap:8px}.kira-field--full{grid-column:1/-1}.kira-field label{font:650 12px "Plus Jakarta Sans",sans-serif}.kira-field input,.kira-field select,.kira-field textarea{width:100%;padding:15px 16px;border:1px solid var(--kira-line);border-radius:10px;background:#f7f8f9;color:var(--kira-ink);font:500 14px "DM Sans",sans-serif}.kira-field textarea{min-height:140px;resize:vertical}.kira-contact__submit{grid-column:1/-1;min-height:52px;border:0;border-radius:10px;background:var(--kira-accent);color:#fff;font:750 14px "Plus Jakarta Sans",sans-serif;cursor:pointer}.kira-contact__aside{display:flex;flex-direction:column;justify-content:space-between;background:#10141c;color:#fff}.kira-contact__aside h2{color:#fff}.kira-contact-list{display:grid;gap:24px;margin-top:40px}.kira-contact-item{padding-top:20px;border-top:1px solid rgba(255,255,255,.14)}.kira-contact-item span{display:block;margin-bottom:8px;color:rgba(255,255,255,.5);font:600 11px "Plus Jakarta Sans",sans-serif;text-transform:uppercase;letter-spacing:.1em}.kira-contact-item a,.kira-contact-item strong{color:#fff;font:600 16px/1.5 "DM Sans",sans-serif}.kira-contact__map{position:relative;min-height:320px;margin-top:28px;border-radius:16px;overflow:hidden;background:url('/images/properties/city-tower.jpg') center/cover}.kira-contact__map:after{content:"Kira Real Estate · Addis Ababa";position:absolute;left:24px;bottom:24px;padding:13px 16px;border-radius:8px;background:#fff;color:var(--kira-ink);font:700 13px "Plus Jakarta Sans",sans-serif}.kira-services-page{padding:96px 24px 112px}.kira-services-page__grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.kira-service-panel{display:grid;grid-template-columns:76px 1fr;gap:28px;min-height:260px;padding:34px;border:1px solid var(--kira-line);border-radius:16px;background:#fff}.kira-service-panel__number{color:var(--kira-accent);font:750 13px "Plus Jakarta Sans",sans-serif}.kira-service-panel h2{margin:0 0 14px;font:700 28px/1.1 "Plus Jakarta Sans",sans-serif;letter-spacing:-.035em}.kira-service-panel p{margin:0;color:#687487;font:400 15px/1.7 "DM Sans",sans-serif}.kira-service-panel a{display:inline-block;margin-top:28px;color:var(--kira-accent);font:700 13px "Plus Jakarta Sans",sans-serif}.kira-services-page__cta{display:flex;align-items:center;justify-content:space-between;gap:30px;margin-top:28px;padding:42px;border-radius:16px;background:#10141c;color:#fff}.kira-services-page__cta h2{max-width:650px;margin:0;color:#fff;font:700 clamp(32px,4vw,50px)/1 "Plus Jakarta Sans",sans-serif;letter-spacing:-.045em}.kira-services-page__cta a{padding:16px 20px;border-radius:999px;background:var(--kira-accent);color:#fff;font:700 14px "Plus Jakarta Sans",sans-serif}
@media(max-width:800px){.kira-contact__inner{grid-template-columns:1fr}.kira-services-page__grid{grid-template-columns:1fr}.kira-page__hero{padding:72px 20px 64px}}@media(max-width:560px){.kira-contact,.kira-services-page{padding:68px 16px 76px}.kira-contact__form,.kira-contact__aside{padding:26px 22px;border-radius:12px}.kira-form-grid{grid-template-columns:1fr}.kira-field--full,.kira-contact__submit{grid-column:auto}.kira-service-panel{grid-template-columns:1fr;min-height:0;padding:26px 22px;border-radius:12px}.kira-services-page__cta{display:block;padding:28px 22px}.kira-services-page__cta a{display:inline-block;margin-top:22px}}
</style>`;

const kiraContactPage = `<main class="kira-page"><section class="kira-page__hero"><div class="kira-page__hero-inner"><p class="kira-page__eyebrow">Contact Kira</p><h1>Start with a clear conversation.</h1><p>Tell us what you are looking for and how you prefer to be contacted. We will help you organize the next practical step.</p></div></section><section class="kira-contact"><div class="kira-contact__inner"><form class="kira-contact__form"><h2>Send an inquiry</h2><p class="kira-contact__lede">This demonstration form behaves locally and does not transmit personal information.</p><div class="kira-form-grid"><div class="kira-field"><label for="contact-name">Full name</label><input id="contact-name" name="name" required autocomplete="name"></div><div class="kira-field"><label for="contact-phone">Phone number</label><input id="contact-phone" name="phone" required autocomplete="tel"></div><div class="kira-field"><label for="contact-email">Email address</label><input id="contact-email" name="email" type="email" required autocomplete="email"></div><div class="kira-field"><label for="contact-type">Inquiry type</label><select id="contact-type" name="type"><option>Schedule a site visit</option><option>Property information</option><option>Investment inquiry</option><option>List a property</option></select></div><div class="kira-field kira-field--full"><label for="contact-message">What can we help with?</label><textarea id="contact-message" name="message" required></textarea></div><button class="kira-contact__submit" type="submit">Send inquiry</button></div></form><aside class="kira-contact__aside"><div><p class="kira-page__eyebrow">Direct contact</p><h2>Reach us your way.</h2><div class="kira-contact-list"><div class="kira-contact-item"><span>Phone</span><a href="tel:+251115550140">+251 11 555 0140</a></div><div class="kira-contact-item"><span>Email</span><a href="mailto:hello@kirarealestate.demo">hello@kirarealestate.demo</a></div><div class="kira-contact-item"><span>WhatsApp</span><a href="https://wa.me/251911555140">Start a WhatsApp inquiry</a></div><div class="kira-contact-item"><span>Office</span><strong>Bole Road, Addis Ababa, Ethiopia</strong></div></div></div></aside></div><div class="kira-contact__inner" style="display:block"><div class="kira-contact__map" role="img" aria-label="Architectural view representing the Kira office location"></div></div></section></main>`;

const kiraServicesPage = `<main class="kira-page"><section class="kira-page__hero"><div class="kira-page__hero-inner"><p class="kira-page__eyebrow">Kira services</p><h1>Support built around better decisions.</h1><p>Focused real estate services for buyers, developers and property teams across Addis Ababa.</p></div></section><section class="kira-services-page"><div class="kira-services-page__inner"><div class="kira-services-page__grid">${[["01","Property sales","Curated residential opportunities with clear specifications, pricing and next steps."],["02","Residential listings","Apartment, villa, townhouse and penthouse presentation for focused comparison."],["03","Investment guidance","Practical market context and property comparisons for informed evaluation."],["04","Property marketing","Architectural photography, clear positioning and responsive inquiry handling."],["05","Site visit coordination","Simple appointment scheduling and organized property walkthroughs."],["06","Buyer inquiry management","Professional follow-up from first question through the next decision point."]].map(([number,title,copy])=>`<article class="kira-service-panel"><span class="kira-service-panel__number">${number}</span><div><h2>${title}</h2><p>${copy}</p><a href="/contact">Discuss this service ↗</a></div></article>`).join("")}</div><div class="kira-services-page__cta"><h2>Have a property goal in mind?</h2><a href="/contact">Talk with Kira</a></div></div></section></main>`;

const localScript = `<script id="kira-local-behavior">
document.addEventListener('submit',function(event){var form=event.target;if(!(form instanceof HTMLFormElement)||form.getAttribute('role')==='search')return;event.preventDefault();var button=form.querySelector('button[type="submit"],input[type="submit"]');if(button){button.disabled=true;if(button.tagName==='INPUT')button.value='Message sent';else button.textContent='Message sent';}var note=document.createElement('div');note.className='kira-local-success';note.setAttribute('role','status');note.textContent='Thank you. This demonstration inquiry has been received locally.';form.appendChild(note);},true);
document.addEventListener('click',function(event){var search=event.target.closest('.kira-search-toggle');if(search){var panel=document.querySelector('.kira-search-panel');var open=!panel.classList.contains('is-open');panel.classList.toggle('is-open',open);search.setAttribute('aria-expanded',String(open));if(open)setTimeout(function(){panel.querySelector('input').focus()},40);return}var menu=event.target.closest('.kira-menu-button');if(menu){var nav=document.querySelector('.kira-header__nav');var menuOpen=!nav.classList.contains('is-open');nav.classList.toggle('is-open',menuOpen);menu.setAttribute('aria-expanded',String(menuOpen));return}var filter=event.target.closest('.kira-listing-filter');if(filter){document.querySelectorAll('.kira-listing-filter').forEach(function(item){item.classList.toggle('is-active',item===filter)});document.querySelectorAll('.kira-property-card').forEach(function(card){card.hidden=filter.dataset.filter!=='all'&&card.dataset.type!==filter.dataset.filter});return}var favorite=event.target.closest('.kira-favorite');if(favorite){event.preventDefault();var key='kira-favorite-'+favorite.dataset.favorite;var active=localStorage.getItem(key)!=='true';localStorage.setItem(key,String(active));favorite.classList.toggle('is-active',active);favorite.setAttribute('aria-pressed',String(active));return}var direction=event.target.closest('[data-testimonial]');if(direction){var quotes=Array.from(document.querySelectorAll('.kira-quote'));var current=quotes.findIndex(function(q){return q.classList.contains('is-active')});var next=direction.dataset.testimonial==='next'?(current+1)%quotes.length:(current-1+quotes.length)%quotes.length;quotes.forEach(function(q,i){q.classList.toggle('is-active',i===next)});}});
document.querySelectorAll('.kira-favorite').forEach(function(button){var active=localStorage.getItem('kira-favorite-'+button.dataset.favorite)==='true';button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active))});
var revealTargets=document.querySelectorAll('.kira-services__header,.kira-services__layout,.kira-section-heading,.kira-property-card,.kira-testimonials__frame,.kira-contact__form,.kira-contact__aside,.kira-contact__map,.kira-service-panel,.kira-services-page__cta,.kira-agent-card,.kira-more-home');revealTargets.forEach(function(item){item.classList.add('kira-reveal')});if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}})},{threshold:.1,rootMargin:'0px 0px -32px'});revealTargets.forEach(function(item){revealObserver.observe(item)})}else{revealTargets.forEach(function(item){item.classList.add('is-visible')})}
</script>`;

function applyKiraPalette(input) {
  return input
    .replace(/#ff6400/gi, "#3156d3")
    .replace(/#fff5eb/gi, "#e9edf2")
    .replace(/#fffbf8/gi, "#f7f8fa")
    .replace(/#131720/gi, "#0b1220");
}

function replaceHomepageServices(input) {
  const marker = 'data-id="26c3e606"';
  const nextMarker = 'data-id="27048476"';
  const markerIndex = input.indexOf(marker);
  const nextMarkerIndex = input.indexOf(nextMarker, markerIndex + marker.length);
  if (markerIndex < 0 || nextMarkerIndex < 0) return input;
  const start = input.lastIndexOf("<div", markerIndex);
  const end = input.lastIndexOf("<div", nextMarkerIndex);
  if (start < 0 || end <= start) return input;
  return `${input.slice(0, start)}${kiraServicesSection}${input.slice(end)}`;
}

function replaceTopLevelSection(input, marker, nextMarker, replacement) {
  const markerIndex = input.indexOf(`data-id="${marker}"`);
  const nextMarkerIndex = input.indexOf(`data-id="${nextMarker}"`, markerIndex + marker.length);
  if (markerIndex < 0 || nextMarkerIndex < 0) return input;
  const start = input.lastIndexOf("<div", markerIndex);
  const end = input.lastIndexOf("<div", nextMarkerIndex);
  if (start < 0 || end <= start) return input;
  return `${input.slice(0, start)}${replacement}${input.slice(end)}`;
}

function replaceHeader(input) {
  const marker = '<div class="ekit-template-content-markup ekit-template-content-header';
  const start = input.indexOf(marker);
  const pageMarker = '<div data-elementor-type="wp-page"';
  const end = input.indexOf(pageMarker, start);
  if (start < 0 || end < 0) return input;
  return `${input.slice(0, start)}${kiraHeader}${input.slice(end)}`;
}

function replaceFooter(input) {
  const marker = '<div class="ekit-template-content-markup ekit-template-content-footer';
  const start = input.indexOf(marker);
  if (start < 0) return input;
  const endCandidates = [
    input.indexOf("<link rel='stylesheet' id='jeg-dynamic-style-css'", start),
    input.indexOf('<script id="jquery-core-js"', start),
    input.indexOf("<script id='jquery-core-js'", start),
    input.indexOf('<script src=', start),
  ].filter((value) => value > start);
  if (!endCandidates.length) return input;
  return `${input.slice(0, start)}${kiraFooter}${input.slice(Math.min(...endCandidates))}`;
}

function replacePageBody(input, replacement) {
  const start = input.indexOf('<div data-elementor-type="wp-page"');
  const end = input.indexOf('<div class="ekit-template-content-markup ekit-template-content-footer', start);
  if (start < 0 || end < 0) return input;
  return `${input.slice(0, start)}${replacement}${input.slice(end)}`;
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

  output = output
    .replace(/<link rel="alternate"[^>]+oEmbed[^>]*>\s*/gi, "")
    .replaceAll("https:\\/\\/estatex.kitkitgo.com\\/", "\\/kira\\/")
    .replaceAll("https:\\/\\/kira-real-estate.kitkitgo.com\\/", "\\/kira\\/")
    .replaceAll("//kira-real-estate.kitkitgo.com/", "/kira/")
    .replaceAll("https%3A%2F%2Fkira-real-estate.kitkitgo.com%2F", "%2F")
    .replace(/<img(?![^>]*\bdecoding=)/gi, '<img decoding="async"');

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
  output = replaceHeader(output);
  if (output.includes("page-id-83")) output = replacePageBody(output, kiraContactPage);
  if (output.includes("page-id-142")) output = replacePageBody(output, kiraServicesPage);
  output = replaceHomepageServices(output);
  output = replaceTopLevelSection(output, "49f5c3a4", "77cbe26c", kiraListingsSection);
  output = replaceTopLevelSection(output, "77cbe26c", "1eed4168", kiraTestimonialsSection);
  output = replaceTopLevelSection(output, "30b5f642", "2b47d2ea", kiraAgentsSection);
  output = replaceTopLevelSection(output, "2b47d2ea", "5aa1500a", kiraMoreHomesSection);
  output = replaceFooter(output);
  for (const [pattern, replacement] of copyReplacements) output = output.replace(pattern, replacement);

  output = output
    .replace("</head>", `${brandStyle}${kiraInnerPageStyle}<link rel="preload" as="image" href="/kira/wp-content/uploads/2025/10/image-53-1.png"></head>`)
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
