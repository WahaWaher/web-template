/**
 * Lazy Sizes reset
 */
window.lazySizesConfig = {
  init: !1
};

export type loadScriptType = (
  src: string,
  options: {
    bodyJson: string;
    targetNode: HTMLElement;
  }
) => void;

/**
 * loadScript
 */
window.loadScript = (src, options) => {
  const script = document.createElement('script');

  options = options || {};

  if (options.bodyJson) {
    const body = JSON.stringify(options.bodyJson);

    script.innerText = body;
  }

  script.src = src;

  if (options.targetNode) {
    options.targetNode.appendChild(script);
  } else {
    document.body.appendChild(script);
  }
};

/**
 * runOn
 */
export type RunOnType = (fn: () => void, events?: [string]) => void;

window.runOn = (fn, events) => {
  const e = events || ['mouseover', 'touchstart'];

  const f = () => {
    for (let i = 0; i < e.length; i++) {
      document.removeEventListener(e[i], f);
    }
    fn();
  };

  for (let i = 0; i < e.length; i++) {
    document.addEventListener(e[i], f);
  }
};
