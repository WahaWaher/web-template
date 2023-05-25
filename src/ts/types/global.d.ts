export {};

import WDrawer from 'wdrawer';
import Swiper, { SwiperOptions } from 'swiper';
import MicroModal from 'micromodal';
import { loadScriptType, RunOnType } from '@/pre';
import { LazySizesConfigPartial } from 'lazysizes/types/lazysizes-config';
import { SwiperModule } from 'swiper/types/shared';

declare global {
  type Nullable<T> = T | null;
  type NonUndefined<T> = T extends undefined ? never : T;
  type ExtractStrict<U, T extends U> = Extract<U, T>;
  type PartialRecord<K extends keyof any, T> = { [P in K]?: T };
  type UnionFromTuple<T> = T[any];
  type EmptyObject = { [key in any]: never };

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
