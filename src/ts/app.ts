import { initDrawers } from '@/modules/drawers';
import { initModals } from '@/modules/modals';
import { initScrollTo } from '@/modules/scrollTo';
import { initScrollToTop } from '@/modules/scrollToTop';
import { initSliders } from '@/modules/sliders';

window.addEventListener('load', () => {
  const { drawers } = initDrawers();

  initModals();
  initSliders();
  initScrollToTop();
  initScrollTo({ drawers });
});
