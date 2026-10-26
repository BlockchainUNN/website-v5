import { icon } from "./icons.js";
import { designAssets } from "./design-assets.js";
import { registrationPage, submissionPage, adminPage, initForms } from "./forms.js";

const asset = (page, name) => designAssets[`${page}-${name}`].src;
const designIcon = (page, name) => {
  const { src, width, height } = designAssets[`${page}-${name}`];
  return `<span class="design-icon-box" style="--icon-width:${width}px;--icon-height:${height}px"><img class="design-icon" src="${src}" width="${width}" height="${height}" alt="" aria-hidden="true"></span>`;
};
const designPhoto = (page, name, alt, className = "") => `<img class="${className}" src="${asset(page, name)}" alt="${alt}" loading="${className.includes("hero-photo") ? "eager" : "lazy"}" decoding="async">`;

const route = location.pathname.replace(/\/$/, "") || "/";
document.title = ({ "/": "Home", "/about": "About", "/community": "Community", "/events": "Events", "/register": "Register", "/submit-project": "Submit Project", "/admin": "Admin", "/admin/export": "Admin" }[route] || "Home") + " | Blockchain UNN";
const photoNames = {
  eduvault: "imgImg13221", poolfi: "imgImg13161", ecopay: "imgImg13111",
  blockchain_development: "imgBlockchainDev", crypto_education: "imgCryptoEdu",
  writing: "imgWriting", design: "imgDesign",
};
const photo = (name, alt, className = "") => designPhoto("home", photoNames[name], alt, className);
const logo = `<a class="brand" href="/" aria-label="Blockchain UNN home"><img src="${asset("home", "imgWhiteTransparentLogo1")}" alt="Blockchain UNN" width="279" height="73"></a>`;
const footerLogo = `<a class="brand" href="/" aria-label="Blockchain UNN home"><img src="${asset("home", "imgWhiteTransparentLogo2")}" alt="Blockchain UNN" width="470" height="123" loading="lazy"></a>`;
const pillIcons = { "About B-UNN": ["home", "imgArcticonsGoabout"], "What we do": ["home", "imgQuillToDo"], "Featured projects": ["home", "imgPajamasProject"], "Upcoming Events": ["home", "imgMaterialSymbolsEventOutline"], "THE COMMUNITY": ["community", "imgBoxiconsCommunity"], EVENTS: ["events", "imgIcBaselineEventNote"], "HALL OF FAME": ["community", "imgEpTrophyBase"] };
const pill = (text, iconName = "sparkles") =>
  `<span class="section-pill">${pillIcons[text] ? designIcon(...pillIcons[text]) : icon(iconName)} ${text}</span>`;
const action = (text, target, className = "") =>
  `<a class="action ${className}" href="${target}">${text}${icon("arrow-right")}</a>`;
const communityForm = "https://docs.google.com/forms/d/e/1FAIpQLScMcjJOPWRYRnY8dofAimFZxbFZEHeDAeOi5FJufJk0hHQ2ow/viewform?usp=header";
const joinButton = (text = "Join Community", className = "") =>
  `<a class="action ${className}" href="${communityForm}" target="_blank" rel="noopener noreferrer">${text}${className.includes("nav-join") ? designIcon("home", "imgAkarIconsArrowRight") : icon("arrow-right")}</a>`;
const heading = (badge, title, subtitle = "", iconName = "sparkles") =>
  `<div class="center-heading reveal">${pill(badge, iconName)}<h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ""}</div>`;
const network = `<div class="network-art" role="img" aria-label="A connected blockchain network"></div>`;
const galleryGroups = [
  ["imgImg10071", "imgImg10981"],
  ["imgImg11281", "imgImg13551", "imgImg11601"],
  ["imgImg12951"], ["imgImg10791"],
  ["imgImg13871", "imgImg05781", "imgImg01531"],
  ["imgImg09931", "imgImg08251", "imgImg05991"],
];
const gallery = `<div class="image-gallery" aria-label="Blockchain UNN community moments">${galleryGroups.map((group, column) => `<div class="gallery-column">${group.map((name, row) => designPhoto("home", name, `Blockchain UNN community moment ${column + 1}-${row + 1}`)).join("")}</div>`).join("")}</div>`;
const projectDetails = [
  [
    "EduVault",
    "A solution to navigating international payments for education without stress.",
    "DApps",
    "eduvault",
  ],
  [
    "PoolFi",
    "A solution to generating and gathering money pools easy and quick.",
    "DApps",
    "poolfi",
  ],
  [
    "EcoPay",
    "A solution to financial inclusion, transparency and accessibility of finance.",
    "DeFi",
    "ecopay",
  ],
];
const projectCards = () =>
  `<div class="project-grid">${projectDetails.map(([name, description, type, image], i) => `<button class="project-card reveal" data-project="${i}" aria-label="View ${name} project"><div class="project-photo">${photo(image, `${name} project team`)}<span>${designIcon("home", "imgSolarHashtagBroken")} ${type}</span></div><div class="project-info"><h3>${name}</h3><p>${description}</p><span class="project-link">View Project ${designIcon("home", "imgLsiconRightFilled")}</span></div></button>`).join("")}</div>`;
const footer = `<footer><div class="footer-inner"><div class="footer-top"><div class="footer-address">${footerLogo}<p>Lion Science Park, Off Sullivan Chime<br> Drive, By Green House Gate, UNN,<br> Nsukka, Enugu state.</p></div><div class="footer-links"><h3>Quick Links</h3><div><a href="/">Home</a><a href="/submit-project">Project Submission</a><a href="/community#hall-of-fame">Hall of Fame</a><a href="/about#team">Team</a><a href="/community">About Community</a><a href="/events">Events</a></div></div></div><div class="footer-bottom">2026 Blockchain UNN. All Rights Reserved</div></div></footer>`;

function home() {
  return `<section class="home-hero"><div class="hero-text"><h1>Building the Decentralized<br>  Future Together</h1><p>A student-led blockchain community where ideas turn<br>  into real-world projects, collaboration and impact</p><div class="hero-actions">${joinButton("Join Community", "white")}${action("View Events", "/events", "outline")}</div></div></section><div class="network-bg"><section class="momentum wrap reveal"><div class="momentum-photo"><div class="momentum-image">${designPhoto("home", "imgImg01171", "Blockchain UNN members at a Buildathon")}</div><span class="sticker sticker-top">${designIcon("home", "imgGroup")} innovation</span><span class="sticker sticker-bottom">${designIcon("home", "imgGroup1")} decentralized</span></div><div class="momentum-content"><h2>Driving momentum<br> in Web3........</h2><div class="stat-tiles"><div><strong>3000+</strong><span>Active Members</span></div><div><strong>40+</strong><span>Hackathons</span></div><div><strong>100+</strong><span>Projects built</span></div><div><strong>20+</strong><span>Partners</span></div><span class="mission-sticker">One Mission</span></div></div></section><section class="home-about wrap reveal">${pill("About B-UNN", "network")}<p>BlockchainUNN is a Tech community established with the aim of educating members of the university community with both basic and advanced practical knowledge of cryptocurrency, blockchain technology, its development, and its opportunities. Though we are focused on the University of Nigeria, we have a diverse community made up of people from diverse fields, institutions and campuses who are blockchain enthusiasts.</p><strong>The vision is to empower the next generation to shape the decentralized future</strong></section>${gallery}<section class="home-activities wrap">${heading("What we do", "Your journey starts here", "Here’s how you can get involved, build real skills, and grow in Web3", "target")}<div class="activity-window"><div class="activity-track" tabindex="0" role="region" aria-roledescription="carousel" aria-label="What we do">${[
    [
      "Blockchain Development",
      "Our bootcamp has introduced 150+ developers to blockchain development, with many building stable, income-generating careers.",
      "DEVELOPMENT",
      "blockchain_development",
    ],
    [
      "Crypto Education",
      "At BlockchainUNN, we offer in-depth crypto training and access to trading lessons from partner communities.",
      "AIRDROP EDU",
      "crypto_education",
    ],
    [
      "Content Writing",
      "BlockchainUNN promotes careers in Web3, blockchain, web development, and content writing, providing opportunities to enhance your skills in our sub-community.",
      "WRITING",
      "writing",
    ],
    [
      "Visual Design",
      "Join our design sub-community to unleash your creativity, connect with experts, and share your work while learning UI/UX and graphic design.",
      "DESIGN",
      "design",
    ],
  ]
    .map(
      ([title, copy, tag, image], i) =>
        `<article class="activity-card" role="group" aria-roledescription="slide" aria-label="${i + 1} of 4: ${title}">${photo(image, title)}<div><span class="yellow-tag">${tag}</span><h3>${title}</h3><p>${copy}</p></div></article>`,
    )
    .join(
      "",
    )}</div><div class="carousel-controls"><button class="carousel-arrow prev" aria-label="Previous activity" data-carousel="activities" data-step="-1" disabled>${icon("arrow-left")}</button><button class="carousel-arrow next" aria-label="Next activity" data-carousel="activities" data-step="1">${icon("arrow-right")}</button></div></div><div class="dots" data-dots="activities"></div></section><section class="home-projects wrap">${heading("Featured projects", "What we’ve built together", "Discover how our community is shaping Web3 through<br> real projects.", "blocks")}${projectCards()}<a class="more-projects" href="/community#hall-of-fame">View more projects&nbsp; ${icon("arrow-right")}</a></section><section class="home-events">${heading("Upcoming Events", "Don’t Miss Out!!", "Be part of what’s happening next with events designed to help you learn and build.", "calendar-days")}<div class="event-banner">${designPhoto("home", "imgWhatsAppImage20260610At1708041", "Anticipate the next Blockchain UNN event")}</div></section><section class="partners wrap reveal"><h2>Our Partners</h2><p>In collaboration with industry-leading partners, we’re creating an environment where students can<br> explore blockchain, gain hands-on experience, and develop into the next generation of Web3 leaders.</p><div class="partner-grid">${Array.from({ length: 9 }, () => `<div class="partner-mark"><img class="gida-logo" src="${asset("home", "imgGidaLogoOnblack9")}" alt="GIDA — Ginakev Digital Academy" loading="lazy"></div>`).join("")}</div></section></div><section class="newsletter"><h2>Subscribe to our Newsletter</h2><p>Stay connected with the latest tech and blockchain trends and news and discover<br> how we are shaping the future.</p><form id="newsletter-form"><label for="newsletter-email">Email Address</label><input id="newsletter-email" type="email" placeholder="e.g: johndoe@email" required><button type="submit">Subscribe</button><span class="form-status" role="status"></span></form></section>`;
}

const teamGroups = [
  [
    "FOUNDERS",
    [
      ["Nduka Anthony Annaelechukwu", "Founder"],
      ["Okoye Kevin Chibuoyim", "Co-Founder"],
      ["Okoye Kevin Chibuoyim", "Co-Founder"],
    ],
  ],
  [
    "DESIGN & PRODUCT",
    [
      ["Delight Okechukwu", "Graphic Designer"],
      ["Chukwuemeka Chidimma", "Graphic Designer"],
      ["Okwara Munachi Adaugo", "UI/UX Designer"],
      ["Igwe Chinonso Favour", "UI/UX Designer"],
    ],
  ],
  [
    "SOCIAL MEDIA & COMMUNITY MANAGEMENT",
    Array.from({ length: 6 }, () => ["Full Name", "Specific Role"]),
  ],
  [
    "ENGINEERING & DEVELOPMENT",
    Array.from({ length: 4 }, () => ["Full Name", "Specific Role"]),
  ],
  ["ADVISORS", Array.from({ length: 4 }, () => ["Full Name", "Specific Role"])],
];
// Replace these temporary platform destinations with verified team profiles.
const teamSocialDestinations = {
  linkedin: "https://www.linkedin.com/",
  x: "https://x.com/",
};
const teamSocials = (name) =>
  `<div class="socials"><a href="${teamSocialDestinations.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn for ${name}">${designIcon("about", "imgGroup4")}</a><a href="${teamSocialDestinations.x}" target="_blank" rel="noopener noreferrer" aria-label="X for ${name}">${designIcon("about", "imgMynauiXTwitter")}</a></div>`;
function about() {
  return `<section class="about-hero"><div class="about-hero-collage" aria-hidden="true"></div><h1>More than a student community,<br> we’re building the future of<br> Web3 from campus.</h1></section><section class="about-story wrap"><span class="side-label yellow">OUR STORY</span><p>Blockchain UNN was founded with a simple vision—to make blockchain education accessible to every student at the University of Nigeria, Nsukka. What began as a small group of curious learners has grown into a thriving community where students explore emerging technologies, collaborate on innovative projects, compete in hackathons, and connect with global opportunities in the Web3 ecosystem.</p><div class="mission-cards"><article>${designIcon("about", "imgRiTargetFill")}<h3>OUR MISSION</h3></article><article>${designIcon("about", "imgUitRocket")}<h3>OUR VISION</h3></article><article>${designIcon("about", "imgMaterialSymbolsLightDiamondOutline")}<h3>OUR VALUES</h3></article></div><div class="about-numbers"><div><strong>5000+</strong><span>COMMUNITY MEMBERS</span></div><div><strong>100+</strong><span>WORKSHOPS</span></div><div><strong>40+</strong><span>HACKATHONS</span></div><div><strong>20+</strong><span>PARTNER ORGANISATIONS</span></div></div></section><section class="experience"><div class="wrap"><span class="side-label">THE EXPERIENCE</span><h2>Grow in a Community That Moves Together.</h2><p>Blockchain UNN is more than a place to learn about blockchain—it’s a<br> community where students collaborate, innovate, and grow through<br> shared experiences and real-world opportunities.</p><div class="experience-grid"><div class="experience-photo"><div class="experience-image">${designPhoto("about", "imgImg94841", "Blockchain UNN community group")}</div></div><div class="experience-cards">${[
    ["book-open", "Learn", "Practical workshops, bootcamps, and technical sessions."],
    [
      "code-xml",
      "Build",
      "Work on projects, hackathons, and open-source initiatives.",
    ],
    [
      "users-round",
      "Connect",
      "Meet mentors, industry professionals, and like-minded peers.",
    ],
    [
      "hand-heart",
      "Belong",
      "Join an inclusive community that supports curiosity, collaboration, and continuous learning.",
    ],
  ]
    .map(
      ([iconName, title, copy], i) =>
        `<article class="${i === 1 || i === 2 ? "gold" : ""}">${designIcon("about", ["imgMdiLearnOutline", "imgCarbonBuildImage", "imgGroup6", "imgFluentPeopleCommunity48Regular"][i])}<h3>${title}</h3><p>${copy}</p></article>`,
    )
    .join(
      "",
    )}</div></div></div></section><section class="team wrap" id="team"><span class="side-label yellow">THE TEAM</span><h2>Powered by Passion, Driven by Purpose</h2>${teamGroups.map(([group, members]) => `<div class="team-group"><h3>${group}</h3><div class="team-grid">${members.map(([name, role]) => `<article class="team-card"><div class="team-portrait">${designPhoto("about", "imgUnsplashBa1EGcAFj5W", `${name} — team portrait`)}</div><div class="team-info"><strong>${name}</strong><span class="team-role">${designIcon("about", "imgCarbonInventoryManagement")}${role}</span>${teamSocials(name)}</div></article>`).join("")}</div></div>`).join("")}</section>`;
}

const communityBenefits = [
  [
    "book-open",
    "Learn",
    "Occasional study circles on Solidity, Rust, cryptography and token design — beginner friendly, no prior experience needed.",
  ],
  [
    "code-xml",
    "Build",
    "Bootcamps and build sprints where members ship real products with mentors from the ecosystem.",
  ],
  [
    "network",
    "Connect",
    "Campus meetups, partner AMAs and intro paths into internships, grants and full-time Web3 roles.",
  ],
  [
    "hand-heart",
    "Belong",
    "A home for students across every faculty — designers, writers, marketers and researchers, not just developers.",
  ],
];
const guilds = [
  [
    "Developer Guild",
    "Smart contracts, dApps and protocol tooling. Runs the Solidity and Rust tracks.",
    "820",
  ],
  [
    "Design Guild",
    "Product and brand design for Web3 — wallets, dashboards, event identity.",
    "310",
  ],
  [
    "Research & Writing",
    "Ecosystem research, protocol breakdowns and the community newsletter.",
    "260",
  ],
  [
    "Growth & Community",
    "Events, partnerships, campus ambassadors and onboarding new members.",
    "440",
  ],
];
const achievements = [
  ["EduVault", "On-chain credential vault issuing tamper-proof academic certificates for universities.", "2025", "PROJECT", "Grant Recipient", "imgImg13381", [110.75,129.5,-2.45,-29.13]],
  ["EcoPay", "Micro-payment rails for campus vendors with instant settlement and low fees.", "2025", "PROJECT", "Most Used On Campus", "imgImg13401", [121.6,142.3,-8.4,-43.98]],
  ["PoolFi", "A stablecoin-powered savings pool that lets student groups run transparent contributions.", "2025", "PROJECT", "Community pick", "imgImg13391", [116.9,136.8,-3.72,-38.1]],
  ["ChainRoots", "Agricultural supply-chain tracking for smallholder farmers in Enugu State.", "2024", "HACKATHON", "1st Place - Web3Enugu Hack", "imgImg13371", [173.4,101.4,-32.55,-1.49]],
  ["MediLedger UNN", "Patient-owned medical records with selective disclosure for teaching hospitals.", "2024", "HACKATHON", "Top 3 - Base Africa Buildathon", "imgImg13371", [173.4,101.4,-32.55,-1.49]],
  ["VoteChain", "Verifiable student union elections with anonymous, auditable on-chain ballots.", "2024", "HACKATHON", "Best Student Project", "imgImg13371", [173.4,101.4,-32.55,-1.49]],
];
const achievementCards = () => achievements.map(([title,copy,year,type,award,image,crop],i) => `<article class="hall-card" aria-label="${i+1} of ${achievements.length}: ${title}" style="--photo-width:${crop[0]}%;--photo-height:${crop[1]}%;--photo-left:${crop[2]}%;--photo-top:${crop[3]}%"><span class="hall-year">• ${year}</span>${designPhoto("community",image,`${title} award ceremony`,"hall-photo")}<div class="hall-info"><span>${designIcon("community",type === "PROJECT" ? "imgCodiconGithubProject" : "imgThesvgHackTheBox")} ${type}</span><h3>${title}</h3><p>${copy}</p><small>${designIcon("community","imgCilBadge")} ${award}</small></div></article>`).join("");

function community() {
  return `<section class="community-hero">${pill("THE COMMUNITY", "users-round")}<h1>Bringing together students,<br> creators, and builders shaping<br> the Web3 ecosystem.</h1><p>BlockchainUNN brings together students from every faculty at the University<br> of Nigeria, Nsukka to learn blockchain fundamentals, build real products, and<br> grow into the next generation of Web3 leaders.</p><div class="community-hero-actions">${joinButton("Join Community")}${action("See Upcoming Events", "/events", "outline")}</div><div class="community-strip">${["imgImg92201", "imgImg91191", "imgImg13201", "imgImg91181", "imgImg93961", "imgImg94631", "imgImg94651", "imgImg92571", "imgImg94441", "imgImg90021", "imgImg13461", "imgImg13491"].map((name) => `<div>${designPhoto("community", name, "Blockchain UNN members", "hero-photo")}</div>`).join("")}</div></section><section class="community-story wrap">${network}<div><h2>Started small. Built by<br> students, for students.</h2><p>What began as a small circle of curious students has grown into one of the most active campus blockchain communities in Nigeria. We run bootcamps, host hackathons, partner with protocols, and connect members to global opportunities.</p><p>Our mission is simple: <strong>to make blockchain education accessible to every student, and give them the space, mentorship and network to build something real with it.</strong></p></div></section><section class="benefits"><div class="wrap"><h2>What the community gives you</h2><div class="benefit-grid">${communityBenefits.map(([iconName, title, copy], i) => `<article>${designIcon("community", ["imgFluentMdl2Education", "imgBiCodeSlash", "imgPhHandshakeThin", "imgGgCommunity"][i])}<h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></div></section><section class="guilds wrap" id="guilds"><span class="side-label">GUILDS</span><h2>Find your corner of the community</h2><div class="guild-grid">${guilds.map(([title, copy, count]) => `<article><span class="guild-count">${designIcon("community", "imgCiUsers")}${count} members</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></section><section class="hall wrap" id="hall-of-fame">${heading("HALL OF FAME", "Built by community members", "Products built at our conferences, and trophies brought home from<br> hackathons across the Southeast.", "trophy")}<div class="hall-carousel" aria-label="Community achievements"><div class="hall-track" tabindex="0" role="region" aria-roledescription="carousel">${achievementCards()}</div><button class="hall-preview" data-carousel="hall" data-step="1" aria-label="Next community achievement">${designPhoto("community", "imgImg13401", "")}<span>EcoPay</span></button></div><div class="dots" data-dots="hall"></div></section><section class="path wrap"><span class="side-label">THE PATH</span><h2>How a member grows here</h2><div class="path-grid">${[
    [
      "Join the Community",
      "Hop into the group chat, say hello, and pick the guild that matches your interest.",
    ],
    [
      "Find your Guild",
      "Find your people, sharpen your skills, and grow alongside a community of builders with shared interests",
    ],
    [
      "Ship in a Build Sprint",
      "Team up for a hackathon or internal sprint and put a real product in front of users.",
    ],
    [
      "Give Back",
      "Mentor others, share your skills, and contribute to the community that helped you grow.",
    ],
  ]
    .map(
      ([title, copy], i) =>
        `<article><b>0${i + 1}</b><h3>${title}</h3><p>${copy}</p></article>`,
    )
    .join(
      "",
    )}</div></section><section class="spotlight wrap"><span class="side-label">STANDOUT BUILDERS</span><h2>Members in the spotlight</h2><div class="spotlight-grid">${[0, 1, 2].map(() => `<article>${designPhoto("community", "imgFrame137", "Community member in the spotlight")}<div><h3>Chukwuemeka .C.</h3><p>Blockchain Developer</p><span>3x Hackathon Winner</span></div></article>`).join("")}</div></section><section class="community-cta"><span>${designIcon("community", "imgGroup")}</span><h2>Your name belongs on this page</h2><p>Join the community, team up with builders and<br> ship something the campus actually uses.</p>${joinButton()}</section>`;
}

const eventKinds = [
  [
    "graduation-cap",
    "Conferences",
    "Flagship gatherings that bring together builders, enthusiasts, industry leaders, and the wider community to learn, connect, and explore what’s next in Web3.",
  ],
  [
    "calendar-days",
    "BlockChain Holidays",
    "Celebrating iconic moments and milestones in blockchain history through community activities, conversations, and themed events.",
  ],
  [
    "code-xml",
    "Hackathons",
    "Opportunities for our builders to turn ideas into working products, compete, collaborate, and showcase what they can create.",
  ],
  [
    "handshake",
    "Community Collaborations",
    "Partnering with other communities to co-host events, share knowledge, and create opportunities that extend beyond our own ecosystem.",
  ],
];
function events() {
  return `<section class="events-hero">${pill("EVENTS", "calendar-days")}<h1>Don’t miss out.<br> Something is always happening here.</h1><p>Meetups, workshops, hackathons and conferences — the full<br> line-up of what BlockchainUNN hosts through the year, plus<br> everything we’ve already run.</p></section><section class="event-kinds"><div class="wrap">${eventKinds.map(([iconName, title, copy], i) => `<article>${designIcon("events", ["imgFluentMdl2Education", "imgBiCodeSlash", "imgPhHandshakeThin", "imgGgCommunity"][i])}<h3>${title}</h3><p>${copy}</p></article>`).join("")}</div></section><section class="upcoming wrap"><span class="event-label">UPCOMING EVENTS</span><h2>What’s next on the calendar</h2><article class="upcoming-card"><div class="conference-poster">${designPhoto("events", "imgWhatsAppImage20260906At1012571", "Blockchain UNN Conference 5.0 — Intelligence Without Borders: AI & Web3")}</div><div><strong>BlockChainUNN Conference 5.0</strong><h3>INTELLIGENCE WITHOUT BORDERS: AI &amp; WEB3</h3><p>${designIcon("events", "imgCarbonLocation")} Nsukka BlockHive · 13–14 November</p><p>Our annual campus conference: keynote talks, protocol showcases, a recruiting floor and the Hall of Fame awards.</p></div><button data-rsvp>Register</button></article><div class="event-secondary-link"><span>Already taking part in the hackathon?</span><a href="/submit-project">Submit your project ${icon("arrow-right")}</a></div></section><section class="past-events wrap"><span class="event-label">PAST EVENTS</span><h2>A Look Back at Our Events</h2><div class="past-grid">${Array.from(
    { length: 4 },
    (_, i) => {
      const pizza = i % 2 === 0;
      return `<article class="past-card">${designPhoto("events", pizza ? "imgImg94811" : "imgImg10781", pizza ? "Bitcoin Pizza Day 2026 community celebration" : "Audience at BUNN Conference 4.0")}<span class="year">•&nbsp; ${pizza ? "2026" : "2025"}</span><div><h3>${pizza ? "Bitcoin Pizza Day 2026" : "BUNN Conference 4.0"}</h3><p>${pizza ? "A community celebration of Bitcoin Pizza Day featuring conversations, activities, and shared experiences around the story and impact of Bitcoin." : "Our annual campus conference bringing together keynote speakers, workshops, panel discussions, networking opportunities."}</p><small>Over ${pizza ? "300" : "500"} attendees</small></div></article>`;
    },
  ).join(
    "",
  )}</div></section><section class="event-cta"><span>${designIcon("events", "imgRiShakeHandsLine")}</span><h2>Want to host or sponsor an event with us?</h2><p>We partner with protocols, companies and student<br> groups to bring real opportunities to campus.</p><button data-contact>Get In Touch ${icon("arrow-right")}</button></section>`;
}

const page =
  { "/": home, "/about": about, "/community": community, "/events": events, "/register": registrationPage, "/submit-project": submissionPage, "/admin": adminPage, "/admin/export": adminPage }[
    route
  ] || home;
document.querySelector("#app").innerHTML =
  `<header><div class="nav-wrap">${logo}<nav aria-label="Main navigation"><a href="/about" ${route === "/about" ? 'aria-current="page"' : ""}>About</a><a href="/community" ${route === "/community" ? 'aria-current="page"' : ""}>Community</a><a href="/events" ${route === "/events" ? 'aria-current="page"' : ""}>Events</a></nav>${joinButton("Join Community", "nav-join")}<button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">${icon("menu")}</button></div></header><main id="main" data-page="${route === "/" ? "home" : route.slice(1)}">${page()}</main>${footer}<dialog aria-label="Site information"><button class="dialog-close" aria-label="Close dialog">×</button><div id="dialog-body"></div></dialog>`;

const header = document.querySelector("header");
let previousScrollY = window.scrollY;
let directionDistance = 0;
let scrollScheduled = false;
window.addEventListener("scroll", () => {
  if (scrollScheduled) return;
  scrollScheduled = true;
  requestAnimationFrame(() => {
    const currentY = window.scrollY;
    const delta = currentY - previousScrollY;
    directionDistance = Math.sign(delta) === Math.sign(directionDistance)
      ? directionDistance + delta
      : delta;
    header.classList.toggle("is-scrolled", currentY > 40);
    if (currentY < 100 || header.classList.contains("menu-open")) {
      header.classList.remove("is-hidden");
    } else if (directionDistance > 18) {
      header.classList.add("is-hidden");
    } else if (directionDistance < -18) {
      header.classList.remove("is-hidden");
    }
    previousScrollY = currentY;
    scrollScheduled = false;
  });
}, { passive: true });
header.addEventListener("focusin", () => header.classList.remove("is-hidden"));

function hydrateAboutHero() {
  const collage = document.querySelector(".about-hero-collage");
  if (!collage) return;
  const groups = [["imgImg98801", "imgImg98421"], ["imgImg99301", "imgImg97971", "imgImg97981"], ["imgImg98701", "imgImg98381", "imgImg98531", "imgImg00601"], ["imgImg01371", "imgImg02791", "imgImg99321"]];
  const sequence = `<div class="about-hero-sequence">${groups.map((group, i) => `<div class="about-hero-column col-${i}">${group.map(name => designPhoto("about", name, "", "hero-photo")).join("")}</div>`).join("")}</div>`;
  collage.innerHTML = `<div class="about-hero-track">${sequence}${sequence}</div>`;
}
hydrateAboutHero();
initForms();

const dialog = document.querySelector("dialog");
let activityTargetIndex = 0;
function showDialog(title, body) {
  document.querySelector("#dialog-body").innerHTML =
    `<h2>${title}</h2><p>${body}</p>`;
  dialog.showModal();
}
document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.matches(".menu-toggle")) {
    const open = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    button.innerHTML = icon(open ? "x" : "menu");
    header.classList.toggle("menu-open", open);
    header.classList.remove("is-hidden");
  }
  if (button.matches("[data-project]"))
    showDialog(
      projectDetails[Number(button.dataset.project)][0],
      "A project link has not yet been supplied. The project card is ready for the team’s URL.",
    );
  if (button.matches("[data-rsvp]")) location.assign("/register");
  if (button.matches("[data-contact]"))
    showDialog(
      "Get in Touch",
      "The team’s contact address has not yet been supplied. Add the verified email or contact form before launch.",
    );
  if (button.matches(".dialog-close")) dialog.close();
  if (button.matches("[data-carousel]"))
    moveCarousel(button.dataset.carousel, Number(button.dataset.step));
  if (button.matches("[data-dot]")) {
    const track = document.querySelector(
      button.dataset.dot === "hall" ? ".hall-track" : ".activity-track",
    );
    const index = Number(button.dataset.index);
    if (button.dataset.dot === "activities") activityTargetIndex = index;
    track.scrollTo({
      left: track.children[index].offsetLeft - track.children[0].offsetLeft,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }
});
function currentSlide(track) {
  const firstOffset = track.children[0].offsetLeft;
  return [...track.children].reduce((closest, child, index) =>
    Math.abs(child.offsetLeft - firstOffset - track.scrollLeft) <
    Math.abs(track.children[closest].offsetLeft - firstOffset - track.scrollLeft)
      ? index : closest, 0);
}
function moveCarousel(type, step) {
  const track = document.querySelector(type === "hall" ? ".hall-track" : ".activity-track");
  if (!track) return;
  const index = type === "hall"
    ? (currentSlide(track) + step + track.children.length) % track.children.length
    : Math.max(0, Math.min(track.children.length - 1, activityTargetIndex + step));
  if (type === "activities") activityTargetIndex = index;
  track.scrollTo({
    left: track.children[index].offsetLeft - track.children[0].offsetLeft,
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
  });
}
function updateDots(type) {
  const track = document.querySelector(
    type === "hall" ? ".hall-track" : ".activity-track",
  );
  const dots = document.querySelector(`[data-dots="${type}"]`);
  if (!track || !dots) return;
  const index = currentSlide(track);
  [...dots.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    dot.setAttribute("aria-current", i === index ? "true" : "false");
  });
  if (type === "hall") {
    const next = achievements[(index + 1) % achievements.length];
    const preview = document.querySelector(".hall-preview");
    preview.querySelector("img").src = asset("community", next[5]);
    preview.querySelector("span").textContent = next[0];
    preview.setAttribute("aria-label", `Next community achievement: ${next[0]}`);
  }
  if (type === "activities") {
    document.querySelector(".carousel-arrow.prev").disabled = index === 0;
    document.querySelector(".carousel-arrow.next").disabled = index === track.children.length - 1;
  }
}
for (const type of ["activities", "hall"]) {
  const track = document.querySelector(
    type === "hall" ? ".hall-track" : ".activity-track",
  );
  const dots = document.querySelector(`[data-dots="${type}"]`);
  if (!track || !dots) continue;
  dots.innerHTML = [...track.children]
    .map(
      (_, i) =>
        `<button aria-label="Go to slide ${i + 1}" data-dot="${type}" data-index="${i}" ${i === 0 ? 'class="active"' : ""}></button>`,
    )
    .join("");
  track.addEventListener("scroll", () => updateDots(type), { passive: true });
  if (type === "activities") {
    track.addEventListener("scrollend", () => {
      activityTargetIndex = currentSlide(track);
    });
  }
  updateDots(type);
}
window.addEventListener("resize", () => {
  for (const type of ["activities", "hall"]) updateDots(type);
}, { passive: true });
document
  .querySelector("#newsletter-form")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector(".form-status").textContent =
      "Newsletter signup is awaiting a mailing list connection. Your email was not stored.";
  });
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
