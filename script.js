const mobileMenu = document.querySelector(".mobile-menu");
const burgerButton = document.querySelector(".burger");
const mobileCloseButton = document.querySelector(".mobile-menu-close");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const certTrack = document.querySelector(".cert-track");
const prevBtn = document.querySelector(".cert-prev");
const nextBtn = document.querySelector(".cert-next");
const certSection = document.querySelector(".cert-slider");
let activeCert = 0;
let autoCertTimer = null;
let cardImageTimers = [];

const certifications = [
  {
    title:
      "Blockchain Fundamentals - How it Works (Principles, Trust and Transparency)",
    description:
      "A complete Seminar on the principles of blockchain technology, including decentralized networks, cryptographic security, and real-world applications.",
    images: ["images/bert-c1.jpg"],
  },
  {
    title: "Virtual Information Session",
    description:
      "An engaging seminar covering the latest trends in technology, career opportunities, and industry insights for aspiring developers.",
    images: ["images/bert-c5.jpg"],
  },
  {
    title: "Digital Safety",
    description:
      "A comprehensive seminar on best practices for online security, privacy protection, and safe internet usage in the digital age.",
    images: ["images/bert-c3.jpg"],
  },
  {
    title: "Integrative Foundation for Innovative Systematic Solution",
    description:
      "A seminar focused on developing innovative solutions through integrative thinking, systematic problem-solving, and creative approaches to complex challenges.",
    images: ["images/bert-c4.jpg"],
  },
];

const loadCertificationCards = () => {
  const track = document.querySelector(".cert-track");
  track.innerHTML = certifications
    .map((cert, index) => {
      const image = cert.images[0];
      return `
      <article class="cert-card" data-index="${index}">
        <div class="cert-image">
          <img src="${image}" alt="${cert.title}" />
        </div>
        <div class="cert-copy">
          <h3>${cert.title}</h3>
          <p>${cert.description}</p>
        </div>
      </article>
    `;
    })
    .join("");
};

const updateCertSlide = () => {
  const width = certSection.clientWidth;
  certTrack.style.transform = `translateX(-${activeCert * width}px)`;
  const cards = document.querySelectorAll(".cert-card");
  cards.forEach((card, index) => {
    if (cardImageTimers[index]) {
      clearInterval(cardImageTimers[index]);
    }

    const certData = certifications[index];
    const imgEl = card.querySelector("img");
    let innerIndex = 0;
    if (certData.images.length > 1) {
      cardImageTimers[index] = setInterval(() => {
        innerIndex = (innerIndex + 1) % certData.images.length;
        imgEl.src = certData.images[innerIndex];
      }, 3200);
    } else {
      imgEl.src = certData.images[0];
    }
  });
};

const startAutoCert = () => {
  if (autoCertTimer) return;
  autoCertTimer = setInterval(() => {
    activeCert = (activeCert + 1) % certifications.length;
    updateCertSlide();
  }, 7600);
};

const stopAutoCert = () => {
  if (autoCertTimer) {
    clearInterval(autoCertTimer);
    autoCertTimer = null;
  }
};

burgerButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target === mobileMenu) {
    mobileMenu.classList.remove("open");
  }
});

mobileCloseButton?.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});

prevBtn.addEventListener("click", () => {
  activeCert = activeCert - 1 < 0 ? certifications.length - 1 : activeCert - 1;
  updateCertSlide();
});

nextBtn.addEventListener("click", () => {
  activeCert = (activeCert + 1) % certifications.length;
  updateCertSlide();
});

certSection.addEventListener("mouseenter", stopAutoCert);
certSection.addEventListener("mouseleave", startAutoCert);
window.addEventListener("resize", updateCertSlide);

loadCertificationCards();
updateCertSlide();
startAutoCert();

const sectionLinks = document.querySelectorAll(".nav-list a");
const sections = document.querySelectorAll("section");

const updateActiveLink = () => {
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-list a[href="#${id}"]`);
    if (scrollPos >= top && scrollPos < top + height) {
      link?.classList.add("active");
    } else {
      link?.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();
