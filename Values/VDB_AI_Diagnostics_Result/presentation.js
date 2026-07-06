(function () {
  const deck = document.querySelector("[data-am-presentation]");
  if (!deck) return;

  const shell = deck.closest(".am-presentation-shell") || document.body;
  const slides = Array.from(deck.querySelectorAll(".am-slide"));
  if (!slides.length) return;

  let index = 0;
  const hashMatch = window.location.hash.match(/^#slide-(\d+)$/);
  if (hashMatch) {
    index = Math.max(0, Math.min(slides.length - 1, Number(hashMatch[1]) - 1));
  }

  function resize() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const left = Math.max(0, (window.innerWidth - 1920 * scale) / 2);
    const top = Math.max(0, (window.innerHeight - 1080 * scale) / 2);
    document.documentElement.style.setProperty("--am-scale", String(scale));
    document.documentElement.style.setProperty("--am-controls-bottom", `${top + 18}px`);
    deck.style.left = `${left}px`;
    deck.style.top = `${top}px`;
  }

  function show(nextIndex, writeHash = true) {
    index = Math.max(0, Math.min(slides.length - 1, nextIndex));
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
      slide.setAttribute("aria-hidden", slideIndex === index ? "false" : "true");
    });
    updateControls();
    if (writeHash) {
      history.replaceState(null, "", `#slide-${index + 1}`);
    }
  }

  function next() {
    show(index + 1);
  }

  function prev() {
    show(index - 1);
  }

  function restart() {
    show(0);
  }

  function createButton(className, label, title, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.setAttribute("aria-label", title);
    button.title = title;
    button.innerHTML = label;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    });
    return button;
  }

  let prevButton = null;
  let nextButton = null;
  let prevNumber = null;
  let nextNumber = null;

  function formatSlideNumber(slideIndex) {
    return String(slideIndex + 1).padStart(2, "0");
  }

  function installControls() {
    if (shell.querySelector(".am-presentation-controls")) return;

    const controls = document.createElement("nav");
    controls.className = "am-presentation-controls";
    controls.setAttribute("aria-label", "Presentation navigation");

    prevButton = createButton(
      "am-presentation-control am-presentation-control--prev",
      "<span class=\"am-presentation-control__num\" aria-hidden=\"true\"></span><span class=\"am-presentation-control__arrow am-presentation-control__arrow--prev\" aria-hidden=\"true\"></span>",
      "Previous slide",
      prev,
    );
    nextButton = createButton(
      "am-presentation-control am-presentation-control--next",
      "<span class=\"am-presentation-control__arrow am-presentation-control__arrow--next\" aria-hidden=\"true\"></span><span class=\"am-presentation-control__num\" aria-hidden=\"true\"></span>",
      "Next slide",
      next,
    );
    prevNumber = prevButton.querySelector(".am-presentation-control__num");
    nextNumber = nextButton.querySelector(".am-presentation-control__num");

    const restartButton = createButton(
      "am-presentation-control am-presentation-restart",
      "<svg class=\"am-presentation-restart__icon\" viewBox=\"0 0 16 16\" aria-hidden=\"true\"><path d=\"M12.5 6.1A4.8 4.8 0 1 0 13 8\"/><path d=\"M12.5 2.9v3.2H9.3\"/></svg><span class=\"am-presentation-restart__key\">R</span>",
      "Restart presentation",
      restart,
    );

    controls.append(prevButton, restartButton, nextButton);
    shell.append(controls);
  }

  function updateControls() {
    if (!prevButton || !nextButton) return;
    prevButton.disabled = index === 0;
    nextButton.disabled = index === slides.length - 1;
    if (prevNumber) {
      prevNumber.textContent = index > 0 ? formatSlideNumber(index - 1) : "";
    }
    if (nextNumber) {
      nextNumber.textContent = index < slides.length - 1 ? formatSlideNumber(index + 1) : "";
    }
  }

  installControls();
  deck.classList.add("am-js-ready");
  resize();
  show(index, Boolean(hashMatch));

  window.addEventListener("resize", resize);
  window.addEventListener("hashchange", () => {
    const match = window.location.hash.match(/^#slide-(\d+)$/);
    if (match) show(Number(match[1]) - 1, false);
  });

  window.addEventListener("keydown", (event) => {
    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      next();
    }
    if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      prev();
    }
    if (event.key === "Home") {
      event.preventDefault();
      show(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      show(slides.length - 1);
    }
    if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      restart();
    }
  });

  window.addEventListener("pointerup", (event) => {
    if (event.target.closest("a, button")) return;
    if (event.clientX > window.innerWidth * 0.55) next();
    if (event.clientX < window.innerWidth * 0.45) prev();
  });
})();
