import animateScrollTo, { IUserOptions } from 'animated-scroll-to';

const headerHeight = 0; // Sticky header height

const scrollOptions: IUserOptions = {
  easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  minDuration: 500,
  maxDuration: 750
};

type ScrollToArgs = {
  drawers?: NodeListOf<Element>;
};

const initScrollTo = ({ drawers }: ScrollToArgs): void => {
  document.querySelectorAll<HTMLElement | SVGAElement>('[data-scroll-to]').forEach((element) => {
    const targetID: Nullable<string> = element.getAttribute('href');

    if (!targetID) return;

    const target: Nullable<HTMLElement> = document.querySelector(targetID);

    if (!target) return;
    
    // Scroll
    element.addEventListener('click', () =>
      animateScrollTo(
        target.offsetTop,
        scrollOptions
      )
    );
  });

  // Close drawer after scroll
  document.querySelectorAll<HTMLElement>('#drawer-main-menu a').forEach((element) => {
    if (drawers) {
      element.addEventListener('click', () =>
        drawers.forEach((drawers) => drawers.wDrawer?.close())
      );
    }
  });
};

export { initScrollTo };
