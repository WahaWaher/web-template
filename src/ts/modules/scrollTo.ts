import { scrollTo } from '@/utils/scrollTo';

type TargetElement = HTMLElement;

type ScrollToArgs = {
  drawers?: NodeListOf<Element>;
};

const initScrollTo = ({ drawers }: ScrollToArgs): void => {
  const offset: number = 0; // For example, sticky header height

  document
    .querySelectorAll<HTMLAnchorElement>('a[data-scroll-to]')
    .forEach((anchor) => {
      const targetID: Nullable<string> = anchor.getAttribute('href');

      if (!targetID) return;

      const target: Nullable<TargetElement> = document.querySelector(targetID);

      if (!target) return;

      // Scroll to target
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo({ top: target.offsetTop - offset });
      });
    });

  // Close drawer after scroll
  document
    .querySelectorAll<HTMLElement>('#drawer-main-menu a')
    .forEach((element) => {
      if (drawers) {
        element.addEventListener('click', () =>
          drawers.forEach((drawers) => drawers.wDrawer?.close())
        );
      }
    });
};

export { initScrollTo };
