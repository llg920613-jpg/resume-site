const year = document.querySelector("#year");
const printButton = document.querySelector("#printButton");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealSections = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealSections.forEach((section) => revealObserver.observe(section));
} else {
  revealSections.forEach((section) => section.classList.add("is-visible"));
}

const experienceItems = document.querySelectorAll(".experience-item");

experienceItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    experienceItems.forEach((otherItem) => {
      if (otherItem !== item) otherItem.open = false;
    });
  });
});

const projectTrack = document.querySelector("#projectTrack");
const projectPrev = document.querySelector("#projectPrev");
const projectNext = document.querySelector("#projectNext");

if (projectTrack && projectPrev && projectNext) {
  const moveProjects = (direction) => {
    const projectCard = projectTrack.querySelector(".project-card");
    const cardGap = Number.parseFloat(getComputedStyle(projectTrack).gap) || 0;
    const step = projectCard ? projectCard.getBoundingClientRect().width + cardGap : projectTrack.clientWidth * 0.8;

    projectTrack.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  projectPrev.addEventListener("click", () => moveProjects(-1));
  projectNext.addEventListener("click", () => moveProjects(1));
}

const linkedProjectCards = document.querySelectorAll(".project-card[data-href]");

linkedProjectCards.forEach((card) => {
  const openProject = () => {
    const { href, newTab } = card.dataset;

    if (newTab === "true") {
      window.open(href, "_blank", "noopener");
      return;
    }

    window.location.href = href;
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    openProject();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  });
});

const linkedPerformanceCards = document.querySelectorAll(".performance-card[data-href]");

linkedPerformanceCards.forEach((card) => {
  const openInstagramPost = () => window.open(card.dataset.href, "_blank", "noopener");

  card.addEventListener("click", openInstagramPost);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInstagramPost();
    }
  });
});

const finderCategories = document.querySelectorAll("[data-finder-target]");
const finderPanels = document.querySelectorAll("[data-finder-panel]");

finderCategories.forEach((category) => {
  category.addEventListener("click", () => {
    const target = category.dataset.finderTarget;

    finderCategories.forEach((otherCategory) => {
      const isActive = otherCategory === category;
      otherCategory.classList.toggle("is-active", isActive);
      otherCategory.setAttribute("aria-selected", String(isActive));
    });

    finderPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.finderPanel === target);
    });
  });
});
