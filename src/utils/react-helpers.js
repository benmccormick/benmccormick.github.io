export const fadeIn = elem => {
  elem.style.opacity = 0;
  window.requestAnimationFrame(() => {
    // Now set a transition on the opacity
    elem.style.transition = 'opacity 500ms';
    // and set the opacity to 1
    elem.style.opacity = 1;
  });
};
