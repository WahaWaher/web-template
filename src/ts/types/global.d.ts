export {};

import WDrawer from 'wdrawer';
import Swiper, { SwiperOptions } from 'swiper';
import MicroModal from 'micromodal';
import { loadScriptType, RunOnType } from '@/pre';
import { LazySizesConfigPartial } from 'lazysizes/types/lazysizes-config';
import { SwiperModule } from 'swiper/types/shared';

declare global {
  type Nullable<T> = T | null;

  interface Window {
    WDrawer?: typeof WDrawer;
    MicroModal?: typeof MicroModal;
    Swiper?: typeof Swiper;
    SwiperModules?: SwiperModule[];
    lazySizesConfig?: LazySizesConfigPartial;
    loadScript?: loadScriptType;
    runOn?: RunOnType;
  }

  interface Element {
    wDrawer?: InstanceType<typeof WDrawer>;
  }
}
