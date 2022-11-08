declare module 'wdrawer' {
  type Options = {
    /** Drawer width, px */
    width: number;
    /** Drawer appearing from "left" or "right" */
    position: 'right' | 'left';
    /** Prefix for main classes */
    prefix: string | null;
    /** Selector for page content node */
    page: string | null;
    /** Initial drawer state */
    open: boolean;
  };

  type Nodes = {
    drawer: HTMLElement;
    backdrop: HTMLElement;
    page: HTMLElement | null;
  };

  type State = {
    open?: boolean;
  };

  export default class WDrawer {
    constructor(entity: string | HTMLElement, options: Partial<Options>);

    /** Default settings */
    public defaults: Options;
    /** Layout nodes */
    public nodes: Nodes;
    /** Actual settings */
    public settings: Options;
    /** Drawer state */
    public state: State;

    open(): void;
    close(): void;
    switch(): void;
  }

  export = WDrawer;
}
