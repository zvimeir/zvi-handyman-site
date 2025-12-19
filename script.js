document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ====== Carousel hide/show logic ======
  const params = new URLSearchParams(window.location.search);
  const previewMode =
    params.get("preview") === "1" ||
    params.get("edit") === "1" ||
    params.get("dev") === "1";

  const carouselSection = document.getElementById("packages");
  if (carouselSection) {
    const enabled = carouselSection.getAttribute("data-enabled") === "1";

    const track = carouselSection.querySelector("[data-carousel-track]");
    const slides = track ? track.querySelectorAll("[data-carousel-slide]") : [];

    // "Ready" means: enabled AND has at least 1 slide with an image src
    const hasValidSlide =
      slides.length > 0 &&
      Array.from(slides).some((s) => {
        const img = s.querySelector("img");
        return img && img.getAttribute("src") && img.getAttribute("src").trim().length > 0;
      });

    // Default behavior:
    // - If not enabled OR no valid slides => hide (even if someone forgot to remove is-hidden)
    // - If previewMode => show even if not enabled (so you can work on it), BUT still show only if you want
    //   We'll show in preview always; you can toggle with "C".
    let shown = previewMode;

    const hide = () => carouselSection.classList.add("is-hidden");
    const show = () => carouselSection.classList.remove("is-hidden");

    if (previewMode) {
      // Preview mode: show section so you can work, even if empty
      show();
    } else {
      // Normal visitor: only show if it's enabled AND has real content
      if (enabled && hasValidSlide) show();
      else hide();
    }

    // Optional keyboard toggle for you: press "C" to show/hide carousel in preview
    document.addEventListener("keydown", (e) => {
      const tag = e.target?.tagName?.toLowerCase() || "";
      if (tag === "input" || tag === "textarea") return;

      if (e.key.toLowerCase() === "c") {
        shown = !shown;
        if (shown) show();
        else hide();
        console.log(`Carousel section: ${shown ? "shown" : "hidden"}`);
      }
    });
  }

  // Click tracking (optional)
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => console.log("Phone link clicked"));
  });
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
    link.addEventListener("click", () => console.log("WhatsApp link clicked"));
  });

  console.log("Website loaded");
});
