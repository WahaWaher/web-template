import { initDrawers } from '@/modules/drawers';
import { initModals } from '@/modules/modals';
import { initScrollTo } from '@/modules/scrollTo';
import { initSliders } from '@/modules/sliders';

window.addEventListener('load', () => {
  const { drawers } = initDrawers();

  initModals();
  initSliders();
  initScrollTo({ drawers });
});
