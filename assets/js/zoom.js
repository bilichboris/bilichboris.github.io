// Initialize medium zoom.
$(document).ready(function () {
  const PROFILE_ZOOM_CLASS = "profile-zoomable";
  const PROFILE_MIN_ZOOM = 1.5;

  const getTransformScale = (transformValue) => {
    if (!transformValue || transformValue === "none") return 1;

    try {
      const matrix = new DOMMatrixReadOnly(transformValue);
      return Math.hypot(matrix.a, matrix.b) || 1;
    } catch {
      const scaleMatch = transformValue.match(/scale\(([-\d.]+)\)/);
      return scaleMatch ? Number.parseFloat(scaleMatch[1]) || 1 : 1;
    }
  };

  medium_zoom = mediumZoom("[data-zoomable]", {
    background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee", // + 'ee' for trasparency.
  });

  medium_zoom.on("opened", function () {
    const openedImage = document.querySelector("img.medium-zoom-image--opened");
    if (!openedImage || !openedImage.classList.contains(PROFILE_ZOOM_CLASS)) return;

    const currentTransform = openedImage.style.transform;
    const currentScale = getTransformScale(currentTransform);
    if (currentScale >= PROFILE_MIN_ZOOM) return;

    const extraScale = PROFILE_MIN_ZOOM / currentScale;
    openedImage.style.transform = `${currentTransform} scale(${extraScale})`;
  });
});
