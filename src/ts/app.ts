import { initDrawers } from '@/modules/drawers';
import { initModals } from '@/modules/modals';
import { initSliders } from '@/modules/sliders';

window.addEventListener('load', () => {
  initDrawers();
  initModals();
  initSliders();
});
