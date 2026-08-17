// MultiMichel content graph — single source of truth for indexes & archive.
// Provenance: research/sources.json. verification: primary | secondary | user | review
window.MM = {
person: {name:"Michel Ferreira", aka:"MultiMichel", location:"Sydney, Australia", role:"Designer Advocate at Figma", since:1998, contact:"michel@multimichel.com"},
// The route is a fast career scan, not a full CV. It stops at Album Agency —
// everything before 1998–2007 lives on LinkedIn and is linked, never restated
// here as a synthetic catch-all row.
experience: [
{company:"Figma", role:"Designer Advocate", start:"Sep 2025", end:"present", city:"Sydney", verification:"user"},
{company:"Xero", role:"Lead Product Designer", start:"Mar 2025", end:"Sep 2025", city:"Sydney", verification:"user"},
{company:"Atlassian", role:"Senior Product Designer — Design Manager", start:"Jun 2019", end:"Jan 2025", city:"Sydney", verification:"user"},
{company:"Shopify", role:"Senior Product Designer", start:"May 2017", end:"Apr 2019", city:"Canada", verification:"user"},
{company:"Booking.com", role:"Designer", start:"Jun 2013", end:"May 2017", city:"Amsterdam", verification:"user"},
{company:"Album Agency", role:"Design Director", start:"Feb 2007", end:"May 2013", city:"California", verification:"user"}
],
items: [
{id:"work-atlassian", type:"Work", year:2024, title:"Jira Nav to Atlassian's System of Work", sub:"How a 2% satisfaction rate became the foundation for Atlassian's future", href:"work-atlassian.html", company:"Atlassian", verification:"primary"},
{id:"work-booking", type:"Work", year:2016, title:"Helping Booking.com's Help Center", sub:"Self-service that cut support tickets 30% and saved $1M+ in three months", href:"work-booking.html", company:"Booking.com", verification:"primary"},
{id:"w-fast-good", type:"Writing", year:2026, date:"Jun 2026", title:"Fast ≠ Good", sub:"Everyone wants us to deliver more faster. How does design defend building for good in the age of fast?", url:"https://multimichel.medium.com/fast-good-80a9af2f0fb8", platform:"Medium", featured:true, verification:"primary"},
{id:"w-dialects", type:"Writing", year:2025, date:"Oct 16, 2025", title:"Design Dialects: Breaking the Rules, Not the System", sub:"Design systems aren't component libraries — they're living languages. Fluent systems bend without breaking.", url:"https://alistapart.com/article/design-dialects-breaking-the-rules-not-the-system/", publication:"A List Apart", featured:true, verification:"primary"},
{id:"w-holistic", type:"Writing", year:2025, date:"Jul 23, 2025", title:"An Holistic Framework for Shared Design Leadership", sub:"Design Manager and Lead Designer on one team isn't about dividing territories. It's about multiplying impact.", url:"https://alistapart.com/article/an-holistic-framework-for-shared-design-leadership/", publication:"A List Apart", featured:true, verification:"primary"},
{id:"w-death-of", type:"Writing", year:2025, date:"Mar 29, 2025", title:"The Death of \u201CThe Death Of\u201D Posts", sub:"Why we keep staging funerals for ideas that are still very much alive.", url:"https://multimichel.medium.com/the-death-of-the-death-of-posts-c1ed95fb4526", platform:"Medium", verification:"primary"},
{id:"w-title", type:"Writing", year:2025, date:"Mar 13, 2025", title:"Title is (still) not important", sub:"The eternal existential conundrum.", url:"https://multimichel.medium.com/title-is-still-not-important-b36f91b25dac", platform:"Medium", verification:"primary"},
{id:"w-future-tech", type:"Writing", year:2023, date:"Apr 12, 2023", title:"Tech of the Future and the Future of Tech", sub:"Steering towards a sustainable and ethical industry.", url:"https://multimichel.medium.com/tech-of-the-future-and-the-future-of-tech-ea95b158eedf", platform:"Medium", verification:"primary"},
{id:"w-shipping", type:"Writing", year:2023, date:"Mar 25, 2023", title:"\u201CShipping in the next 2 weeks\u201D is tech's version of \u201CI just need to lose 5 pounds\u201D", url:"https://multimichel.medium.com/shipping-in-the-next-2-weeks-is-techs-version-of-i-just-need-to-loose-5-pounds-d17caba49cc", platform:"Medium", verification:"primary"},
{id:"w-magic", type:"Writing", year:2023, date:"Feb 23, 2023", title:"Seeing magic in everyday things", url:"https://multimichel.medium.com/seeing-magic-in-everyday-things-7c7846522301", platform:"Medium", verification:"primary"},
{id:"w-10-lessons", type:"Writing", year:2021, date:"Apr 30, 2021", title:"10 lessons learned from recording my first 10 podcast episodes of Latinxs Who Design", url:"https://multimichel.medium.com/10-lessons-learned-from-recording-my-first-10-podcast-episodes-of-latinxs-who-design-914861dd4184", platform:"Medium", related:["p-lwd"], verification:"primary"},
{id:"w-toolbelt", type:"Writing", year:2021, date:"Jan 22, 2021", title:"What are the essential tools on a Designer's Toolbelt?", url:"https://multimichel.medium.com/what-are-the-essential-tools-on-a-designers-toolbelt-d765b1abd4ca", publication:"Designer's Toolbelt", platform:"Medium", verification:"primary"},
{id:"w-fries", type:"Writing", year:2015, date:"Sep 21, 2015", title:"Would you like fries with that?", sub:"Discussing the hamburger icon.", url:"https://multimichel.medium.com/would-you-like-fries-with-that-4edf46849380", publication:"Booking.com Design", platform:"Medium", verification:"primary"},
{id:"w-rwd", type:"Writing", year:2014, date:"Oct 22, 2014", title:"RWD or Apps? YES!", sub:"Does responsive design negate the need for an app?", url:"https://multimichel.medium.com/803053bfcec3", platform:"Medium", verification:"primary"},
{id:"w-nba-bubble", type:"Writing", year:2020, date:"Oct 2, 2020", title:"11 Lessons from the NBA Bubble for Your Newly Remote Team", sub:"What the NBA's pandemic bubble can teach remote teams about collaboration and performance.", url:"https://www.atlassian.com/blog/teamwork/11-lessons-from-the-nba-bubble-for-your-newly-remote-team", publication:"Atlassian Blog", verification:"primary"},
{id:"t-design-matters", type:"Talk", year:2026, date:"Nov 2026", talkTitle:null, eventName:"Design Matters", location:"Tokyo", showLocation:true, status:"upcoming", format:"talk", role:"speaker", url:"https://dm26.spectrumtokyo.com/speakers/michel/", verification:"user"},
{id:"t-maker-collective", type:"Talk", year:2026, date:"Aug 2026", talkTitle:null, eventName:"Maker Collective", location:"Sydney", showLocation:true, status:"past", featured:true, format:"talk", role:"speaker", verification:"user"},
{id:"t-fof-perth", type:"Talk", year:2026, date:"Aug 2026", talkTitle:null, eventName:"Friends of Figma", location:"Perth", showLocation:true, status:"past", featured:true, format:"talk", role:"speaker", organization:"Figma", verification:"user"},
{id:"t-config", type:"Talk", year:2026, date:"Aug 2026", talkTitle:null, eventName:"Config", location:"San Francisco", showLocation:true, status:"past", featured:true, format:"talk", role:"speaker", organization:"Figma", sub:"Figma's annual conference.", url:"https://config.figma.com/san-francisco/speakers/", verification:"primary"},
{id:"t-aixdesign", type:"Talk", year:2026, date:"Jun 2026", talkTitle:"Fast ≠ Good", eventName:"AI × Design Melbourne", location:"Melbourne", showLocation:false, status:"past", featured:true, format:"talk", role:"speaker", url:"https://conffab.com/presentation/fast-≠-good/?gl=5ulxY9lWmOlu", videoUrl:"https://conffab.com/presentation/fast-≠-good/?gl=5ulxY9lWmOlu", sub:"AI and design at the practice level, not the hype level.", verification:"user"},
{id:"t-figma-down-under", type:"Talk", year:2026, date:"Apr 2026", talkTitle:null, eventName:"Figma Down Under", location:"Melbourne", showLocation:true, status:"past", featured:true, format:"talk", role:"speaker", organization:"Figma", verification:"user"},
{id:"t-cm-sydney", type:"Talk", year:2026, date:"Mar 2026", talkTitle:"Gambiarra", eventName:"CreativeMornings Sydney", location:"Sydney", showLocation:false, status:"past", featured:true, format:"talk", role:"speaker", verification:"user"},
{id:"t-uxcamp", type:"Talk", year:2025, date:"Nov 2025", talkTitle:"I think your design system is broken", eventName:"UXCamp Naarm / Melbourne", location:"Naarm / Melbourne", showLocation:false, status:"past", featured:true, format:"talk", role:"speaker", url:"https://youtu.be/vvY0Lh-7Hn0?si=L7V4Z_0b5_p02tBb", videoUrl:"https://youtu.be/vvY0Lh-7Hn0?si=L7V4Z_0b5_p02tBb", related:["t-ccx-sydney"], verification:"user"},
{id:"t-design-systems-next-era", type:"Talk", year:2025, date:"Nov 2025", talkTitle:null, eventName:"Design Systems for the Next Era", location:"Sydney", showLocation:true, status:"past", featured:true, format:"keynote", role:"co-presenter", organization:"Figma", sub:"Keynote at the MCA (Museum of Contemporary Art), Sydney. Co-presented with Samantha Lee.", verification:"user"},
{id:"t-design-systems-figma-sydney", type:"Talk", year:2026, talkTitle:null, eventName:"Design Systems with Figma: Sydney", location:"Sydney", showLocation:false, status:"past", featured:true, format:"talk", role:"speaker", organization:"Figma", sub:"Design systems, variables, and the next era of collaborative design.", note:"Exact date unconfirmed — only the year survives in prior drafts.", verification:"needs-review"},
{id:"t-ccx-sydney", type:"Talk", year:2026, date:"Apr 2026", talkTitle:"I think your design system is broken", eventName:"CCX Sydney", location:"Sydney", showLocation:false, status:"past", featured:true, format:"talk", role:"speaker", related:["t-uxcamp"], verification:"user"},
{id:"t-melbourne-service-jam", type:"Talk", year:2026, date:"Mar 2026", talkTitle:null, eventName:"Melbourne Service Jam", location:"Melbourne", showLocation:true, status:"past", format:"workshop", role:"mentor", note:"Role/format inferred from how Service Jam events are typically run (mentor-guided team workshop) — not independently confirmed. Confirm with Michel.", verification:"needs-review"},
{id:"t-echos-cis", type:"Talk", year:2024, date:"2024", talkTitle:null, eventName:"Creative Intelligence Summit — Echos", location:null, showLocation:false, status:"past", format:"panel", role:"panelist", organization:"Echos", sub:"Designing creativity in the age of AI, with Sheena Bhalla, Juliana Proserpio and Ricardo Ruffo.", verification:"user"},
{id:"t-echos-dl", type:"Talk", year:2021, date:"2021–2024", talkTitle:"Creating High Value Products", eventName:"Echos Design Leadership", location:null, showLocation:false, status:"past", format:"workshop", role:"workshop-leader", organization:"Echos", sub:"Masterclass speaker, and Design Leadership ambassador and Regional Leader for Brazil & the Americas.", url:"https://echos.cc/design-leadership/", verification:"user"},
{id:"t-outlook", type:"Talk", year:2026, talkTitle:"Product Deep-Dive: Figma", eventName:"The Outlook (TO26)", location:"Australia", showLocation:true, status:"past", format:"talk", role:"speaker", organization:"Figma", sub:"11:35am session block, Firebrand's TO26 conference.", url:"https://wearetheoutlook.com.au/program", verification:"secondary"},
{id:"t-ila21", type:"Talk", year:2021, talkTitle:"Design Out Loud", eventName:"Interaction Latin America (ILA21)", location:null, showLocation:false, status:"past", format:"panel", role:"panelist", sub:"Panel with Mariana Salgado, Paco Bravo and Darinka Buendía, for IxDA's Interaction Latin America conference.", url:"https://ila21.ixda.org/en/speakers.html", verification:"secondary"},
{id:"t-sogd-generate", type:"Talk", year:2016, date:"2016", talkTitle:"The Science of Good Design", eventName:"Generate Conference London", location:"London", showLocation:false, status:"past", featured:true, format:"talk", role:"speaker", url:"https://www.youtube.com/watch?v=4Nk0ray32i0", videoUrl:"https://www.youtube.com/watch?v=4Nk0ray32i0", sub:"The hypothesis that numbers, not creativity, hold the answer: A/B testing best practices, pitfalls, and validating design against business goals.", verification:"primary"},
{id:"t-sogd-codetalks", type:"Talk", year:2016, talkTitle:"The Science of Good Design", eventName:"code.talks", location:"Hamburg", showLocation:true, status:"past", format:"talk", role:"speaker", related:["t-sogd-generate"], sub:"A/B testing best practices, pitfalls, and validating design against business goals.", note:"Same talk as t-sogd-generate. No public recording of the Hamburg delivery survives — the Generate London recording is linked from that entry instead. Internal: never render.", verification:"secondary"},
{id:"t-data-design-tree", type:"Talk", year:2016, talkTitle:"Data & Design Sitting in a Tree", eventName:"Front-End Design Conference", location:"St. Petersburg, FL", showLocation:true, status:"past", format:"workshop", role:"workshop-leader", sub:"Workshop on running A/B tests to validate design ideas. Also delivered at Hack the Future refugee meetup, Amsterdam.", verification:"secondary"},
{id:"t-data-decisions", type:"Talk", year:2015, talkTitle:"Data, Designers and Decisions", eventName:"ConvergeSE", location:"Columbia, SC", showLocation:true, status:"past", format:"talk", role:"speaker", sub:"How and why to use data-driven design, with real examples from Booking.com. Also delivered at the Atlanta Booking.com design meetup.", verification:"secondary"},
{id:"p-lwd", type:"Podcast", year:2021, title:"Latinxs Who Design", sub:"Interview podcast of thriving Latinxs in the design industry — 29 episodes, 2021–2023. Guests include Jay Demetillo, Joanna Peña-Bickley, Aubrey Blanche, and Kevin Bethune.", url:"https://podcasts.apple.com/au/podcast/latinxs-who-design/id1554011225", spotify:"https://open.spotify.com/show/0J3JdhM454AvedlYlXqeRZ", verification:"primary"},
{id:"v-channel", type:"Video", year:2023, title:"@multimichel on YouTube", sub:"Videos on design, careers, and working smarter — plus video episodes of the podcast.", url:"https://www.youtube.com/@multimichel", kind:"YouTube", verification:"primary"},
{id:"v-fieldnotes-1", type:"Video", year:2025, title:"Field Notes — Design systems for your whole organization", series:"Field Notes from Figma", role:["writer","presenter","producer/editor"], sub:"How growing teams use Figma's Org plan to scale consistency with shared libraries and org-wide defaults.", url:"https://www.figma.com/field-notes/design-systems-for-your-whole-organization/", kind:"Figma", note:"exact publish date not shown on source page", verification:"primary"},
{id:"v-fieldnotes-2", type:"Video", year:2025, title:"Field Notes — Building up the organization on Figma Admin", series:"Field Notes from Figma", role:["writer","presenter","producer/editor"], sub:"How design leaders use Figma Org's centralized admin to manage access and stay audit-ready.", url:"https://www.figma.com/field-notes/building-up-the-organization-on-figma-admin/", kind:"Figma", note:"exact publish date not shown on source page", verification:"primary"},
{id:"v-fieldnotes-3", type:"Video", year:2025, title:"Field Notes — Scaling up your design system", series:"Field Notes from Figma", role:["writer","presenter","producer/editor"], sub:"How teams use branching, variable modes and library analytics to ship changes with confidence.", url:"https://www.figma.com/field-notes/scaling-up-your-design-system/", kind:"Figma", note:"exact publish date not shown on source page", verification:"primary"},
{id:"a-lovers", type:"Interview", year:2018, title:"Lovers Magazine — interview", url:"https://www.loversmagazine.com/interviews/michel-ferreira", kind:"Magazine", lang:"en", verification:"primary"},
{id:"a-bear", type:"Interview", year:2021, title:"Bear Academy — podcast interview", url:"https://www.youtube.com/watch?v=jblSD6JBbKc", kind:"Podcast", lang:"en", verification:"primary"},
{id:"a-desenhando", type:"Interview", year:2021, title:"Desenhando Produtos — podcast interview", url:"https://open.spotify.com/episode/287IbodADE0CaVjbpAnqRH", kind:"Podcast", lang:"pt-BR", verification:"primary"},
{id:"a-cultne", type:"Interview", year:2021, title:"Cultne — television interview", url:"https://www.youtube.com/watch?v=0I-Esj2a-bs", kind:"Television", lang:"pt-BR", verification:"primary"},
{id:"a-stbcast", type:"Interview", year:2021, title:"STBcast — podcast interview", url:"https://www.youtube.com/watch?v=jvt18XJRHOg", kind:"Podcast", lang:"pt-BR", verification:"primary"},
{id:"a-friendly-futurist", type:"Interview", year:2026, date:"Jun 10, 2026", title:"The Friendly Futurist — How Does Design Flow Through Everything?", sub:"With Alex and Michel from Figma, on AI, design and human-centred thinking.", url:"https://podcasts.apple.com/tw/podcast/how-does-design-flow-through-everything-interview-with/id1601365640?i=1000772087307", kind:"Podcast", lang:"en", verification:"secondary"},
{id:"x-copy-paste", type:"Experiment", year:2024, title:"The Copy Paste Club", sub:"An album made with AI, for fun.", url:"https://open.spotify.com/artist/4h20EEaSsJha8OKMiTfINg", verification:"user"},
{id:"x-mentor", type:"Artifact", year:2021, title:"Mentorship — Dribbble's Scaling Design Systems course & ADPList", url:"https://adplist.org/mentors/michel-ferreira", verification:"primary"},
{id:"x-github-io", type:"Artifact", year:2022, title:"multimichel.github.io — a previous home on the internet", url:"https://multimichel.github.io/", verification:"primary"}
]};

// ---------- link semantics ----------
// One arrow language across the whole site:
//   →  internal navigation (another page or section of this site)
//   ↗  external destination (leaves the site)
// Every list template routes through these so an arrow is decided once, in one
// place, and never appended twice to a string that already carries one.
window.MM.isExternal = function(href){
  return /^(https?:)?\/\//i.test(href || "") || /^mailto:/i.test(href || "");
};
window.MM.arrow = function(href){
  if (!href) return "";
  return window.MM.isExternal(href) ? " ↗" : " →";
};
// The action arrow for an editorial row. It is rendered as a SIBLING of the
// title, not appended to the title text, so it holds one quiet position at the
// row's right edge and a wrapping title never has to flow around it.
// Compact navigation labels ("ALL WRITING →") keep their arrow inline in the
// markup — they are labels, not rows.
window.MM.actionMark = function(href){
  if (!href) return "";
  return '<span class="go" aria-hidden="true">'
       + (window.MM.isExternal(href) ? '↗' : '→') + '</span>';
};
// External links leave the site: new tab + full rel. Internal links stay put.
window.MM.linkAttrs = function(href){
  return window.MM.isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : '';
};
