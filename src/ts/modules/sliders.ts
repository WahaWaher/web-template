import Swiper, { SwiperOptions } from 'swiper';
import deepmerge from 'deepmerge';
import { dataAttrToObject } from '@/utils/dataAttrToObject';

const initSliders = (): void => {
  document.querySelectorAll('[data-slider]').forEach((rootContainer) => {
    const swiper = rootContainer.querySelector<HTMLElement>('[data-swiper]');

    if (!swiper) return;

    const prevEl =
      rootContainer.querySelector<HTMLElement>('[data-slider-prev]');
    const nextEl =
      rootContainer.querySelector<HTMLElement>('[data-slider-next]');

    // Default slider options
    const defaultOptions: SwiperOptions = {
      modules: window.SwiperModules,
      slidesPerView: 1,
      spaceBetween: 15,
      preloadImages: false,
      watchSlidesProgress: true, // If you use slidesPerView: 'auto' or slidesPerView > 1
      lazy: {
        checkInView: true
        // loadPrevNext: true,
        // loadPrevNextAmount: 1
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

    const attrOptions = dataAttrToObject(
      swiper.getAttribute('data-swiper-options')
    );

    // Init slider
    new Swiper(
      swiper,
      deepmerge(defaultOptions, attrOptions, { clone: false })
    );
  });
};

export { initSliders };
