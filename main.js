const byId = (id) => document.getElementById(id);
const make = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
};
const setText = (id, value) => { if (value) byId(id).textContent = value; };
const emptyState = (container, message) => container.append(make("p", "empty-note", message));

function renderDetails() {
  const personal = byId("personal-details");
  if (personal) {
    data.personal.filter((item) => item.value).forEach((item) => {
      const row = make("div", "detail-row");
      row.append(make("dt", "", item.label), make("dd", "", item.value));
      personal.append(row);
    });
    if (!personal.children.length) emptyState(personal, "Add the personal details you would like to share in data.js.");
  }

  const family = byId("family-list");
  if (family) {
    data.family.forEach((person) => {
      const row = make("div", "family-item");
      row.append(make("span", "family-role", person.role), make("span", "family-name", person.name));
      family.append(row);
    });
    if (!family.children.length) emptyState(family, "Family details are optional. Add only what you are comfortable sharing.");
  }
}

function renderCareer() {
  const timeline = byId("career-timeline");
  data.career.forEach((item) => {
    const entry = make("article", "timeline-item");
    const copy = make("div");
    copy.append(make("div", "timeline-role", item.role), make("div", "timeline-org", item.organization));
    if (item.description) copy.append(make("p", "timeline-description", item.description));
    entry.append(make("div", "timeline-date", item.duration), copy);
    timeline.append(entry);
  });
  if (!timeline.children.length) emptyState(timeline, "Add roles, organizations, and career milestones in data.js when you are ready.");

  const achievements = byId("achievement-list");
  data.achievements.forEach((item, index) => {
    const entry = make("article", "achievement-item");
    const copy = make("div");
    copy.append(make("div", "achievement-title", item.title));
    if (item.organization || item.year) copy.append(make("p", "achievement-meta", [item.organization, item.year].filter(Boolean).join(" · ")));
    if (item.description) copy.append(make("p", "achievement-description", item.description));
    entry.append(make("span", "achievement-mark", String(index + 1).padStart(2, "0")), copy);
    achievements.append(entry);
  });
  if (!achievements.children.length) emptyState(achievements, "Certifications, awards, and milestones can be added to data.js.");
}

function renderProfessional() {
  const summary = byId("professional-summary");
  [
    ["Current designation", data.professional.designation],
    ["Organization", data.professional.organization],
    ["Experience", data.professional.experience],
    ["Future direction", data.professional.futureDirection]
  ].forEach(([label, value]) => {
    const item = make("div", "summary-item");
    item.append(make("span", "summary-label", label), make("span", "summary-value", value || "Add in data.js"));
    summary.append(item);
  });
  if (data.professional.expertise) {
    const expertise = make("p", "empty-note", data.professional.expertise);
    summary.after(expertise);
  }

  const groups = byId("skill-groups");
  data.skills.forEach((group) => {
    const section = make("div", "skill-group");
    section.append(make("h4", "", group.category));
    const tags = make("div", "skill-tags");
    group.items.forEach((skill) => tags.append(make("span", "skill-tag", skill)));
    section.append(tags);
    groups.append(section);
  });
  if (!groups.children.length) emptyState(groups, "Add your technical and professional skills in data.js.");

  const projects = byId("project-list");
  data.projects.forEach((project) => {
    const item = make("article", "project-item");
    const copy = make("div");
    copy.append(make("div", "project-title", project.name));
    if (project.description) copy.append(make("p", "project-description", project.description));
    if (project.technologies?.length) copy.append(make("div", "project-tools", project.technologies.join(" · ")));
    const links = make("div", "project-links");
    [["GitHub", project.github], ["Live", project.demo]].forEach(([label, href]) => {
      if (!href) return;
      const link = make("a", "", label + " ↗");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      links.append(link);
    });
    item.append(copy, links);
    projects.append(item);
  });
  if (!projects.children.length) emptyState(projects, "Your projects will appear here once you add them to data.js. No sample projects are included.");
}

function renderSocialAndContact() {
  const socials = byId("social-links");
  data.social.forEach((item) => {
    const link = make("a", "", item.label + " ↗");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    socials.append(link);
  });

  const contact = byId("contact-list");
  const rows = [
    ["Email", data.contact.email, data.contact.email ? "mailto:" + data.contact.email : ""],
    ["Phone", data.contact.phone, data.contact.phone ? "tel:" + data.contact.phone : ""],
    ["LinkedIn", data.contact.linkedin, data.contact.linkedin],
    ["GitHub", data.contact.github, data.contact.github],
    ["Location", data.contact.location, ""]
  ];
  rows.filter((row) => row[1]).forEach(([label, value, href]) => {
    const row = make("div", "contact-row");
    const content = make("dd");
    if (href) {
      const link = make("a", "", value);
      link.href = href;
      if (href.startsWith("http")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
      content.append(link);
    } else content.textContent = value;
    row.append(make("dt", "", label), content);
    contact.append(row);
  });
  if (!contact.children.length) emptyState(contact, "Add your preferred contact details in data.js. Keep private details out of this public page.");
}

function renderHobbies() {
  const list = byId("hobby-list");
  data.hobbies.forEach((hobby) => list.append(make("li", "", hobby)));
  if (!list.children.length) emptyState(list, "Add a few hobbies or interests in data.js to make this profile more personal.");
}

function renderGallery() {
  const grid = byId("gallery-grid");
  const dialog = byId("lightbox");
  let activeIndex = 0;

  data.gallery.forEach((photo, index) => {
    const button = make("button", "gallery-tile");
    button.type = "button";
    button.setAttribute("aria-label", "View photo: " + photo.caption);
    const image = make("img");
    image.src = photo.src;
    image.alt = photo.alt;
    image.loading = "lazy";
    image.decoding = "async";
    button.append(image, make("span", "", photo.caption));
    button.addEventListener("click", () => openAt(index));
    grid.append(button);
  });
  if (!data.gallery.length) emptyState(grid, "Add personal, family, travel, or professional photos in data.js.");

  function openAt(index) {
    activeIndex = (index + data.gallery.length) % data.gallery.length;
    const photo = data.gallery[activeIndex];
    byId("lightbox-image").src = photo.src;
    byId("lightbox-image").alt = photo.alt;
    byId("lightbox-caption").textContent = photo.caption;
    dialog.showModal();
  }
  byId("lightbox-close").addEventListener("click", () => dialog.close());
  byId("lightbox-prev").addEventListener("click", () => openAt(activeIndex - 1));
  byId("lightbox-next").addEventListener("click", () => openAt(activeIndex + 1));
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") openAt(activeIndex - 1);
    if (event.key === "ArrowRight") openAt(activeIndex + 1);
  });
}

function setupNavigation() {
  const button = document.querySelector(".menu-toggle");
  const nav = byId("site-nav");
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !isOpen);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation");
    }
  });
}

function setupContactForm() {
  byId("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!data.contact.email) {
      byId("form-note").textContent = "Add your email address in data.js before using the contact form.";
      return;
    }
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Portfolio message from " + form.get("name"));
    const body = encodeURIComponent("From: " + form.get("name") + " (" + form.get("email") + ")\n\n" + form.get("message"));
    window.location.href = "mailto:" + data.contact.email + "?subject=" + subject + "&body=" + body;
  });
}

function init() {
  setText("header-name", data.name);
  setText("header-tagline", data.tagline);
  setText("profile-name", data.name);
  setText("profile-role", data.title);
  setText("profile-intro", data.introduction);
  setText("profile-location", data.location);
  setText("portrait-caption", data.portraitCaption);
  setText("footer-name", data.name);
  byId("footer-year").textContent = new Date().getFullYear();
  if (data.photo) byId("profile-photo").src = data.photo;
  renderDetails();
  renderCareer();
  renderProfessional();
  renderSocialAndContact();
  renderHobbies();
  renderGallery();
  setupNavigation();
  setupContactForm();
}

init();