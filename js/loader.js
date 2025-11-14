document.addEventListener("DOMContentLoaded", () => {
  const placeholders = document.querySelectorAll("[data-include]");

  placeholders.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const res = await fetch(`../components/${file}.html`);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error("Component load error:", err);
    }
  });
});
