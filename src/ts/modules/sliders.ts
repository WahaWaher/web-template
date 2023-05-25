import Swiper, { SwiperOptions } from 'swiper';
import deepmerge from 'deepmerge';
import { parseDataAttr } from '@/utils/parseDataAttr';
import { deepMerge } from '@/utils/deepMerge';

const initSliders = (): void => {
  document
    .querySelectorAll<HTMLElement>('[data-slider]')
    .forEach((rootContainer) => {
      const swiper = rootContainer.querySelector<HTMLElement>('[data-swiper]');

      if (!swiper) return;

      const prevEl =
        rootContainer.querySelector<HTMLElement>('[data-slider-prev]');
      const nextEl =
        rootContainer.querySelector<HTMLElement>('[data-slider-next]');

      // Default slider options
      const defaultOptions: SwiperOptions = {
        modules: window.SwiperModules,
        loop: false, // if true, must be 2 x "slidesPerView"
        slidesPerView: 1,
        spaceBetween: 15,
        watchSlidesProgress: true, // If true. you use slidesPerView: 'auto' or slidesPerView > 1
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        grabCursor: true,
        navigation: { prevEl, nextEl }
        // breakpoints: {
        //   420: {
        //     slidesPerView: 2
        //   },
        //   768: {
        //     slidesPerView: 4
        //   },
        //   992: {
        //     slidesPerView: 5
        //   }
        // },
      };

      const attrOptions = parseDataAttr(
        swiper.getAttribute('data-swiper-options')
      );

      // Init slider
      new Swiper(swiper, deepMerge(defaultOptions, attrOptions));
    });
};

export { initSliders };
