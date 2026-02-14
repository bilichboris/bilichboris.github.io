(function () {
  const SAFE_MARGIN = 8;
  const EDGE_INSET_MIN = 4;
  const EDGE_INSET_MAX = 16;
  const WANDER_MIN_MS = 8000;
  const WANDER_MAX_MS = 15000;
  const ESCAPE_CLASS_MS = 300;
  const CAPTION_CLASS_MS = 1800;
  let ibex = null;
  let currentSide = null;
  let wanderTimer = null;
  let resizeTimer = null;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function chooseSide() {
    const sides = ["left", "right", "top", "bottom"];
    const pool = currentSide ? sides.filter((side) => side !== currentSide) : sides;
    return randomChoice(pool);
  }

  function viewBounds(size) {
    const navOffset = document.body.classList.contains("fixed-top-nav") ? 58 : 0;
    const minX = SAFE_MARGIN;
    const maxX = Math.max(minX, window.innerWidth - size - SAFE_MARGIN);
    const minY = navOffset + SAFE_MARGIN;
    const maxY = Math.max(minY, window.innerHeight - size - SAFE_MARGIN);
    return { minX, maxX, minY, maxY };
  }

  function marginPosition(side, size) {
    const bounds = viewBounds(size);
    const edgeInset = randomInt(EDGE_INSET_MIN, EDGE_INSET_MAX);

    if (side === "left") {
      return {
        left: edgeInset,
        top: randomInt(bounds.minY, bounds.maxY),
      };
    }

    if (side === "right") {
      return {
        left: Math.max(bounds.minX, window.innerWidth - size - edgeInset),
        top: randomInt(bounds.minY, bounds.maxY),
      };
    }

    if (side === "top") {
      return {
        left: randomInt(bounds.minX, bounds.maxX),
        top: Math.max(bounds.minY, edgeInset),
      };
    }

    return {
      left: randomInt(bounds.minX, bounds.maxX),
      top: Math.max(bounds.minY, window.innerHeight - size - edgeInset),
    };
  }

  function scheduleWander() {
    clearTimeout(wanderTimer);
    wanderTimer = window.setTimeout(function () {
      moveIbex(true);
    }, randomInt(WANDER_MIN_MS, WANDER_MAX_MS));
  }

  function moveIbex(isEscaping) {
    if (!ibex) {
      return;
    }

    const size = Math.round(ibex.getBoundingClientRect().width) || 66;
    const side = chooseSide();
    const target = marginPosition(side, size);
    currentSide = side;
    ibex.style.left = target.left + "px";
    ibex.style.top = target.top + "px";

    if (isEscaping) {
      ibex.classList.add("is-escaping");
      ibex.classList.add("show-caption");
      window.setTimeout(function () {
        ibex.classList.remove("is-escaping");
      }, ESCAPE_CLASS_MS);
      window.setTimeout(function () {
        ibex.classList.remove("show-caption");
      }, CAPTION_CLASS_MS);
    }

    scheduleWander();
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      moveIbex(false);
    }, 120);
  }

  function onVisibilityChange() {
    if (document.hidden) {
      clearTimeout(wanderTimer);
      return;
    }
    scheduleWander();
  }

  function createIbex() {
    const imageSrc = window.funnyIbexImagePath || "/assets/img/funny-ibex.png";
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.className = "funny-ibex";
    button.type = "button";
    button.setAttribute("aria-label", "Escaping ibex");
    button.title = "Try to catch the ibex";

    image.src = imageSrc;
    image.alt = "Funny ibex";
    button.appendChild(image);

    button.addEventListener("click", function (event) {
      event.preventDefault();
      moveIbex(true);
    });

    document.body.appendChild(button);
    ibex = button;
    moveIbex(false);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createIbex);
  } else {
    createIbex();
  }
})();
