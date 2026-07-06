// ============================================================
// Typing effect for the hero console — rotates through lines
// that describe what's currently being learned/built.
// ============================================================
const lines = [
  'console.log("learning: PHP + MySQL");',
  'console.log("status: building foundation");',
  'console.log("task: 1 of 5 complete soon");',
  'console.log("mood: shipping daily");'
];

const typedEl = document.getElementById("typedLine");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedEl) return;

  const current = lines[lineIndex];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }

  setTimeout(typeLoop, deleting ? 30 : 55);
}

if (prefersReducedMotion) {
  if (typedEl) typedEl.textContent = lines[0];
} else {
  typeLoop();
}

// ============================================================
// Mobile nav toggle
// ============================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.style.display === "flex";
    navLinks.style.display = isOpen ? "none" : "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "64px";
    navLinks.style.right = "24px";
    navLinks.style.background = "#FAFAF8";
    navLinks.style.border = "1px solid #E3E3DE";
    navLinks.style.borderRadius = "6px";
    navLinks.style.padding = "16px 20px";
    navLinks.style.gap = "12px";
  });
}

// ============================================================
// Reveal sections on scroll
// ============================================================
const revealTargets = document.querySelectorAll(".section, .hero");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => {
  if (!prefersReducedMotion) {
    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  }
  observer.observe(el);
});
