export function markHeroReady() {
  if (typeof window === "undefined") return;
  window.__heroMediaReady = true;
  window.dispatchEvent(new Event("hero-media-ready"));
}

export function isHeroReady() {
  return typeof window !== "undefined" && window.__heroMediaReady === true;
}
