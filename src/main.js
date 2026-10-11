const arrow = '<span aria-hidden="true">↗</span>';
const photos = [
  "photo-1528605248644-14dd04022da1",
  "photo-1519389950473-47ba0277781c",
  "photo-1522071820081-009f0129c71c",
  "photo-1516321318423-f06f85e504b3",
];
const photo = (i, alt, cls = "") =>
  `<img class="${cls}" src="https://images.unsplash.com/${photos[i % photos.length]}?auto=format&fit=crop&w=1200&q=85" alt="${alt}" loading="lazy" width="1200" height="800">`;
const logo = `<a class="brand" href="/" aria-label="Blockchain UNN home"><svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 2 42 12 46 31 32 46 12 42 2 24 10 8Z M24 2 12 42 42 12 32 46 10 8 46 31 2 24 24 2 M10 8 24 34 42 12 M2 24 24 34 32 46" stroke="currentColor" stroke-width="1.2"/></svg><span>BLOCKCHAIN<small>UNIVERSITY OF NIGERIA</small></span></a>`;
const button = (text, href = "/community", cls = "primary") =>
  `<a class="button ${cls}" href="${href}">${text}${arrow}</a>`;
const label = (text) => `<p class="eyebrow"><span></span>${text}</p>`;
const heading = (tag, title, desc = "") =>
  `<div class="section-heading reveal">${label(tag)}<h2>${title}</h2>${desc ? `<p>${desc}</p>` : ""}</div>`;
const values = [
  [
    "⌘",
    "Learn",
    "Turn curiosity into capability. Learn blockchain fundamentals with people who are figuring it out, too.",
  ],
  [
    "⧉",
    "Build",
    "Less watching from the sidelines. More shipping ideas, testing possibilities, and making things real.",
  ],
  [
    "↗",
    "Connect",
    "Find your people. Meet builders, mentors, and collaborators who open doors and share what they know.",
  ],
  [
    "◎",
    "Belong",
    "A place for every kind of mind. Developers, designers, writers, and the wonderfully curious.",
  ],
];
const valueCards = () =>
  `<div class="value-grid">${values.map(([icon, title, copy], i) => `<article class="value-card reveal"><span class="card-symbol">${icon}</span><span class="index">0${i + 1}</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>`;
const projects = [
  [
    "EduVault",
    "Verifiable credentials. Real possibilities.",
    "An on-chain credential vault making academic certificates secure and easy to verify.",
    "Infrastructure",
  ],
  [
    "PoolFi",
    "Shared goals. Collective growth.",
    "A simple way for communities to save together and make progress, together.",
    "DeFi",
  ],
  [
    "EcoPay",
    "A better way to move value.",
    "Exploring more accessible payments and financial opportunities for everyone.",
    "Payments",
  ],
];
const projectCards = () =>
  `<div class="project-grid">${projects.map(([name, title, copy, tag], i) => `<button class="project-card reveal" data-project="${i}" aria-label="Explore ${name}"><div class="project-image">${photo(i + 1, `${name} project placeholder: student collaborators`)}<span class="image-tag">${tag}</span><span class="round-arrow">↗</span></div><div class="project-copy"><small>BUILT IN OUR COMMUNITY</small><h3>${name}</h3><p>${title}</p><span>Explore project ↗</span></div></button>`).join("")}</div>`;
const cta = () =>
  `<section class="join-section reveal"><div class="orbit-icon">✳</div>${label("YOUR NEXT CHAPTER")}<h2>Your people.<br>Your possibilities.</h2><p>You don’t need to have it all figured out.<br>Just bring your curiosity. We’ll build from there.</p><button class="button primary" data-join>Find your place ${arrow}</button></section>`;
const stats = () =>
  `<div class="stats">${[
    ["300+", "ACTIVE MEMBERS"],
    ["40+", "HACKATHONS"],
    ["100+", "PROJECTS BUILT"],
    ["20+", "PARTNERS"],
  ]
    .map(([n, t]) => `<div><strong>${n}</strong><span>${t}</span></div>`)
    .join("")}</div>`;
function home() {
  return `<section class="hero"><div class="hero-glow"></div><div class="hero-content">${label("FROM CAMPUS. TO EVERYWHERE.")}<h1>Building the<br>decentralized<br><em>future. Together.</em></h1><p>A student-led community of curious minds and bold builders.<br>Learning, creating, and opening up what’s possible in Web3.</p><div class="hero-actions"><button class="button primary" data-join>Join the community ${arrow}</button>${button("See what’s happening", "/events", "secondary")}</div><div class="hero-proof"><div class="mini-avatars">${[0, 1, 2].map((i) => photo(i, "Community placeholder")).join("")}</div><span>Different minds. <strong>One shared future.</strong></span></div></div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><div class="cube"><div class="cube-top"></div><div class="cube-left"></div><div class="cube-right"></div></div><span class="art-label label-one">IDEAS INTO IMPACT ↗</span><span class="art-label label-two">BUILT TOGETHER</span><span class="art-coordinates">6.8648° N &nbsp; 7.4083° E<br>NSUKKA, NIGERIA</span><span class="spark s1">✳</span><span class="spark s2">+</span></div><a href="#momentum" class="scroll-cue">SCROLL TO EXPLORE <span>↓</span></a><span class="hero-side">A NEW GENERATION OF BUILDERS — UNN</span></section><section id="momentum" class="section intro"><div class="intro-image reveal">${photo(0, "Placeholder photograph of a community gathering")}<span class="paper-tag">A little curiosity goes a long way. ↗</span><span class="image-caption">THE NEXT BIG THING STARTS WITH US.</span></div><div class="intro-copy reveal">${label("THIS IS BLOCKCHAIN UNN")}<h2>Big ideas.<br>Real people.<br><span class="muted">Unstoppable momentum.</span></h2><p>We’re a community at the University of Nigeria, Nsukka, making blockchain education accessible—and turning what we learn into things that matter.</p>${button("Get to know us", "/about", "text-button")}${stats()}</div></section><div class="ticker" aria-hidden="true"><div>LEARN. BUILD. CONNECT. BELONG. <span>✳</span> LEARN. BUILD. CONNECT. BELONG. <span>✳</span> LEARN. BUILD. CONNECT. BELONG. <span>✳</span></div></div><section class="section">${heading("FIND YOUR START", "Curiosity is all you need.", "There’s no single way into Web3. Find the path that feels like you.")}${valueCards()}</section><section class="section projects-section"><div class="split-heading">${heading("MADE BY OUR MEMBERS", "Small teams.<br>Big possibilities.")}${button("Meet the builders", "/community#hall-of-fame", "text-button")}</div>${projectCards()}</section><section class="section event-feature"><div class="event-poster reveal"><div class="poster-top">BLOCKCHAIN UNN <span>CONFERENCE / 5.0</span></div><div class="poster-grid"></div><span class="poster-star">✳</span><h3>INTELLIGENCE<br>WITHOUT<br><em>BORDERS.</em></h3><div class="poster-bottom">AI × WEB3 <span>NSUKKA, NIGERIA ↗</span></div></div><div class="reveal">${label("THE NEXT BIG GATHERING")}<h2>Good things happen<br>when we show up.</h2><p>Ideas worth sharing. People worth meeting. Discover the workshops, meetups, and conferences bringing our community together.</p>${button("Explore our events", "/events")}</div></section><section class="partners section reveal">${label("BETTER, TOGETHER")}<h2>Great company to build in.</h2><p>Connected by a shared belief in the next generation.</p><div class="partner-logos"><span>GIDA<span class="partner-sub">DIGITAL ACADEMY</span></span><span class="partner-invite">Your next collaboration starts here. ↗</span></div><small class="placeholder-note">Partner names from design references; relationships to be confirmed before launch.</small></section><section class="newsletter section reveal"><div>${label("STAY IN THE LOOP")}<h2>A little signal.<br>A lot of possibility.</h2><p>Community updates, new opportunities, and the good stuff.<br>Delivered when there’s something worth sharing.</p></div><form id="newsletter"><label for="email">Your email address</label><div class="email-field"><input type="email" id="email" name="email" placeholder="you@example.com" required autocomplete="email"><button aria-label="Subscribe to newsletter">↗</button></div><p class="form-note" role="status">No noise. Just the things that move you forward.</p></form></section>`;
}
function about() {
  return `<section class="page-hero">${label("A CAMPUS. A COMMUNITY. A CATALYST.")}<h1>More than students.<br><em>A generation of builders.</em></h1><p>We believe the future belongs to the people willing to build it.<br>And there’s no better place to start than together.</p></section><section class="section story"><div>${label("OUR STORY")}<h2>Started with curiosity.<br>Growing with purpose.</h2></div><div><p>Blockchain UNN brings students from across the University of Nigeria, Nsukka together to explore blockchain technology and its possibilities.</p><p>Through hands-on learning, community projects, hackathons, and meaningful connections, we help people turn their first question into their next opportunity.</p></div></section><section class="section">${stats()}<div class="mission-grid">${[
    [
      "◎",
      "Our mission",
      "Make blockchain knowledge accessible, and empower students to turn that knowledge into meaningful impact.",
    ],
    [
      "↗",
      "Our vision",
      "A generation of confident builders shaping a more open, inclusive, and decentralized future.",
    ],
    [
      "✳",
      "Our values",
      "Curiosity. Collaboration. Integrity. We learn openly, build responsibly, and move forward together.",
    ],
  ]
    .map(
      ([i, t, p]) =>
        `<article class="reveal"><span>${i}</span><h3>${t}</h3><p>${p}</p></article>`,
    )
    .join(
      "",
    )}</div></section><section class="experience section">${photo(2, "Placeholder photograph of a collaborative team")}<div>${label("THE EXPERIENCE")}<h2>Grow in a community<br>that moves together.</h2><p>Learn something new. Find a collaborator. Take a chance on an idea. Here, the next step is always easier with people beside you.</p>${button("Explore the community", "/community")}</div></section><section class="section">${heading("THE PEOPLE BEHIND THE PURPOSE", "Built by people who care.", "Our community is powered by students, volunteers, and mentors.")}<div class="team-note reveal"><span>✳</span><h3>Real people deserve a proper introduction.</h3><p>Our team directory is coming soon. We’re gathering verified profiles, roles, and links before sharing them here.</p>${button("Meet your community", "/community", "text-button")}</div></section>${cta()}`;
}
function community() {
  return `<section class="page-hero">${label("FIND YOUR PEOPLE")}<h1>Different minds.<br><em>One shared future.</em></h1><p>For the developers, designers, storytellers, and “what if?” people.<br>There’s room for you here.</p><button class="button primary" data-join>Join the community ${arrow}</button></section><div class="photo-strip">${[0, 2, 1, 3].map((i) => photo(i, "Placeholder photograph of people collaborating")).join("")}</div><section class="section">${heading("WHAT COMMUNITY FEELS LIKE", "Come for the curiosity.<br>Stay for the people.")}${valueCards()}</section><section class="section" id="guilds">${heading("FIND YOUR CORNER", "Your interests. Your guild.", "Smaller circles, deeper connections. Find people who speak your language.")}<div class="guild-grid">${[
    [
      "⌘",
      "Developer Guild",
      "Smart contracts, dApps, and experiments that become real products.",
    ],
    [
      "◈",
      "Design Guild",
      "Thoughtful interfaces, strong identities, and better experiences for Web3.",
    ],
    [
      "✎",
      "Research & Writing",
      "Make sense of emerging ideas. Tell the stories that help others understand.",
    ],
    [
      "◎",
      "Growth & Community",
      "Bring people together. Build partnerships and make opportunities happen.",
    ],
  ]
    .map(
      ([i, t, p]) =>
        `<button class="guild reveal" data-guild="${t}"><span>${i}</span><h3>${t}</h3><p>${p}</p><span class="guild-link">Find your people ↗</span></button>`,
    )
    .join(
      "",
    )}</div></section><section class="section" id="hall-of-fame">${heading("COMMUNITY HALL OF FAME", "Ideas that made it<br>out of the group chat.", "A glimpse of what happens when our members build together.")}${projectCards()}</section><section class="section">${heading("YOUR PATH", "From “I’m curious” to “I built this.”")}<div class="path-grid">${[
    [
      "Join the community",
      "Say hello. Share your interests. Find a conversation that draws you in.",
    ],
    [
      "Find your guild",
      "Meet people with shared interests and learn alongside them.",
    ],
    [
      "Build something",
      "Join a workshop, a project, or a hackathon. Start small. Keep going.",
    ],
    [
      "Give back",
      "Share what you learn and help the next person find their way.",
    ],
  ]
    .map(
      ([t, p], i) =>
        `<article class="reveal"><span>0${i + 1}</span><h3>${t}</h3><p>${p}</p></article>`,
    )
    .join("")}</div></section>${cta()}`;
}
function events() {
  return `<section class="page-hero">${label("GET TOGETHER. GO FURTHER.")}<h1>Some things are better<br><em>when you’re there.</em></h1><p>Meetups, workshops, hackathons, and big conversations.<br>Your next connection starts here.</p></section><section class="section upcoming">${heading("ON THE HORIZON", "Something big is coming.")}<article class="upcoming-card reveal"><div class="mini-poster">✳<span>AI × WEB3</span><strong>WITHOUT<br>BORDERS.</strong></div><div><span class="event-category">BLOCKCHAIN UNN CONFERENCE 5.0</span><h2>Intelligence<br>without borders.</h2><p>⌖ University of Nigeria, Nsukka</p><p>New ideas, real connections, and a fresh look at the possibilities of AI and Web3.</p><span class="date-note">Date and registration details to be announced</span></div><button class="button dark" data-notify>Keep me posted ${arrow}</button></article></section><section class="section">${heading("THE ENERGY. THE MEMORIES.", "A look back. A step forward.")}<div class="filter-bar" role="group" aria-label="Filter past events">${["All events", "Conferences", "Meetups", "Workshops"].map((x, i) => `<button class="filter ${i === 0 ? "active" : ""}" data-filter="${x}" aria-pressed="${i === 0}">${x}</button>`).join("")}</div><div class="past-grid">${[
    [
      "Bitcoin Pizza Day",
      "Meetups",
      "A celebration of the idea that started it all. Conversations, community, and a few slices of history.",
      0,
    ],
    [
      "BUNN Conference 4.0",
      "Conferences",
      "Big conversations and fresh perspectives from builders across the ecosystem.",
      2,
    ],
    [
      "Building your first dApp",
      "Workshops",
      "Learning by doing, one smart contract and one shared discovery at a time.",
      1,
    ],
  ]
    .map(
      ([t, c, p, i]) =>
        `<article class="past-card reveal" data-category="${c}">${photo(i, `Placeholder photograph for ${t}`)}<div><small>${c.toUpperCase()} · COMMUNITY ARCHIVE</small><h3>${t}</h3><p>${p}</p></div></article>`,
    )
    .join(
      "",
    )}</div><p class="placeholder-note">Archive entries are adapted from the design and await verified event details.</p></section><section class="join-section reveal"><div class="orbit-icon">↗</div>${label("LET’S MAKE SOMETHING HAPPEN")}<h2>Bring your ideas.<br>We’ll bring the community.</h2><p>Want to host a workshop, partner on an event,<br>or support the next generation of builders?</p><button class="button primary" data-contact>Start a conversation ${arrow}</button></section>`;
}
const pages = {
  "/": home,
  "/about": about,
  "/community": community,
  "/events": events,
};
const route = location.pathname.replace(/\/$/, "") || "/";
const footer = `<footer><div class="footer-main"><div>${logo}<p>Lion Science Park, Off Sullivan Chime Drive,<br>By Green House Gate, UNN,<br>Nsukka, Enugu State, Nigeria.</p></div><div class="footer-links"><div><small>EXPLORE</small><a href="/about">Our story</a><a href="/community">Community</a><a href="/events">Events</a></div><div><small>GET INVOLVED</small><a href="/community#guilds">Find your guild</a><a href="/community#hall-of-fame">Hall of fame</a><button data-contact>Partner with us ↗</button></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Blockchain UNN. Built for what’s next.</span><span>FROM NSUKKA, WITH POSSIBILITY. ✳</span></div></footer>`;
document.querySelector("#app").innerHTML =
  `<header><div class="nav-shell">${logo}<nav aria-label="Main navigation">${[
    ["/about", "About"],
    ["/community", "Community"],
    ["/events", "Events"],
  ]
    .map(
      ([href, t]) =>
        `<a href="${href}" ${route === href ? 'aria-current="page"' : ""}>${t}</a>`,
    )
    .join(
      "",
    )}</nav><button class="button nav-join" data-join>Join community ${arrow}</button><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button></div></header><main id="main">${pages[route] ? pages[route]() : `<section class="page-hero"><h1>A little off the path.</h1><p>This page doesn’t exist. Let’s get you back to the community.</p>${button("Back home", "/")}</section>`}</main>${footer}<dialog id="detail-dialog" aria-label="Community information"><button class="dialog-close" aria-label="Close dialog">×</button><div id="dialog-content"></div></dialog>`;
const dialog = document.querySelector("dialog");
function show(content) {
  document.querySelector("#dialog-content").innerHTML = content;
  dialog.showModal();
}
document.addEventListener("click", (e) => {
  const el = e.target.closest("button");
  if (!el) return;
  if (el.matches(".menu-toggle")) {
    const open = el.getAttribute("aria-expanded") !== "true";
    el.setAttribute("aria-expanded", open);
    el.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    document.querySelector("header").classList.toggle("menu-open", open);
  }
  if (el.matches("[data-project]")) {
    const [name, title, copy, tag] = projects[Number(el.dataset.project)];
    show(
      `${label(tag)}<h2>${name}</h2><h3>${title}</h3><p>${copy}</p><p class="dialog-note">This project is featured in the supplied design. Live demos and verified team links will be added when available.</p>${button("Discover the community", "/community", "secondary")}`,
    );
  }
  if (el.matches("[data-join], [data-guild]"))
    show(
      `${label(el.dataset.guild || "YOU BELONG HERE")}<h2>Your next chapter<br>starts with hello.</h2><p>We’re preparing our public community invitation. In the meantime, explore our guilds and find the one that feels like you.</p><p class="dialog-note">The official community invite will be published here once confirmed by the Blockchain UNN team.</p>${button("Explore the guilds", "/community#guilds")}`,
    );
  if (el.matches("[data-contact]"))
    show(
      `${label("LET’S CONNECT")}<h2>Build with us.</h2><p>For partnerships, sponsorships, and event collaborations, visit the team at Lion Science Park, University of Nigeria, Nsukka.</p><p class="dialog-note">A verified contact address will be added before launch.</p>`,
    );
  if (el.matches("[data-notify]"))
    show(
      `${label("CONFERENCE 5.0")}<h2>You’ll want to be there.</h2><p>Registration isn’t open yet. Follow community announcements for the confirmed date, speakers, and registration link.</p>${button("Explore the community", "/community")}`,
    );
  if (el.matches(".dialog-close")) dialog.close();
  if (el.matches("[data-filter]")) {
    document.querySelectorAll(".filter").forEach((b) => {
      b.classList.toggle("active", b === el);
      b.setAttribute("aria-pressed", String(b === el));
    });
    document
      .querySelectorAll("[data-category]")
      .forEach(
        (card) =>
          (card.hidden =
            el.dataset.filter !== "All events" &&
            card.dataset.category !== el.dataset.filter),
      );
  }
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
document.querySelector("#newsletter")?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".form-note").textContent =
    "Thanks for your interest! Newsletter signup will open when our mailing list is connected. Your email has not been stored.";
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
