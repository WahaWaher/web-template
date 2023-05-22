export const DOMAnimations = {
  /**
   * SlideUp
   */
  slideUp: (el: HTMLElement, dur: number = 250) =>
    new Promise((resolve) => {
      el.style.height = `${el.offsetHeight}px`;
      el.style.transitionProperty = 'height, margin, padding';
      el.style.transitionDuration = `${dur}ms`;
      el.offsetHeight;
      el.style.overflow = 'hidden';
      el.style.height = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
      el.style.marginTop = '0';
      el.style.marginBottom = '0';

      window.setTimeout(() => {
        el.style.display = 'none';
        el.style.removeProperty('height');
        el.style.removeProperty('padding-top');
        el.style.removeProperty('padding-bottom');
        el.style.removeProperty('margin-top');
        el.style.removeProperty('margin-bottom');
        el.style.removeProperty('overflow');
        el.style.removeProperty('transition-duration');
        el.style.removeProperty('transition-property');
        resolve(false);
      }, dur);
    }),

  /**
   * SlideDown
   */
  slideDown: (el: HTMLElement, dur: number = 250) =>
    new Promise(function (resolve) {
      el.style.removeProperty('display');
      let display = window.getComputedStyle(el).display;

      if (display === 'none') display = 'block';

      el.style.display = display;
      let height = el.offsetHeight;
      el.style.overflow = 'hidden';
      el.style.height = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
      el.style.marginTop = '0';
      el.style.marginBottom = '0';
      el.offsetHeight;
      el.style.transitionProperty = `height, margin, padding`;
      el.style.transitionDuration = `${dur}ms`;
      el.style.height = `${height}px`;
      el.style.removeProperty('padding-top');
      el.style.removeProperty('padding-bottom');
      el.style.removeProperty('margin-top');
      el.style.removeProperty('margin-bottom');

      window.setTimeout(() => {
        el.style.removeProperty('height');
        el.style.removeProperty('overflow');
        el.style.removeProperty('transition-duration');
        el.style.removeProperty('transition-property');
        resolve(false);
      }, dur);
    }),

  /**
   * SlideToggle
   */
  slideToggle: function (el: HTMLElement, dur: number = 250) {
    if (window.getComputedStyle(el).display === 'none') {
      return this.slideDown(el, dur);
    } else {
      return this.slideUp(el, dur);
    }
  }
};
