import { scrollTo } from '@/utils/scrollTo';

const initScrollToTop = (): void => {
  const navButton = document.createElement('button');

  navButton.id = 'btn-top';
  document.body.append(navButton);

  const threshold: number = window.outerHeight; // Hidden before (screenHeight or Number), px

  const DOWN = 'down' as const;
  const UP = 'up' as const;

  /* Button comes "to top" */
  const comeTop = () => {
    navButton.classList.remove(DOWN);
    navButton.classList.add(UP);
    navButton.setAttribute('title', 'Наверх');
  };
  /* Button comes "to back" */
  const comeBack = () => {
    navButton.classList.remove(UP);
    navButton.classList.add(DOWN);
    navButton.setAttribute('title', 'Вернуться');
  };
  /* Button comes "neutral" */
  const comeNeutral = () => {
    navButton.classList.remove(UP, DOWN);
    navButton.removeAttribute('title');
  };
  /* Gets the number of scrolled pixels of the window */
  const getScrollTop = (): number =>
    Math.abs(document.body.getBoundingClientRect().top);
  /* Is button ready to scroll down */
  const isReadyToBack = (): boolean => navButton.classList.contains(DOWN);
  /* Is button ready to scroll up */
  const isReadyToUp = (): boolean => navButton.classList.contains(UP);
  /* Is neutral */
  const isNeutral = (): boolean => !isReadyToUp() && !isReadyToBack();

  /* Main onScroll handler */
  const onScroll = (): void => {
    const scrollOut: number = getScrollTop();

    if (scrollOut < threshold && isReadyToUp()) {
      comeNeutral();
    }

    if (scrollOut > threshold && isNeutral()) {
      comeTop();
    }

    if (scrollOut > threshold && isReadyToBack()) {
      comeTop();
    }
  };

  /* Adds onScroll handler */
  const addHandler = () => window.addEventListener('scroll', onScroll);
  /* Removes onScroll handler */
  const delHandler = () => window.removeEventListener('scroll', onScroll);
  /* Makes the button unresponsive to events (and backwards)*/
  const freeze = (on: boolean = true) =>
    (navButton.style.pointerEvents = on ? 'none' : '');

  let lastPos: number = 0;

  /* Main OnClick handler */
  const onClick = () => {
    if (isReadyToUp()) {
      lastPos = getScrollTop();

      delHandler();
      freeze();

      scrollTo({ top: 0 }).then(() => {
        comeBack();
        addHandler();
        freeze(false);
      });

      return;
    }

    if (isReadyToBack()) {
      delHandler();
      freeze();

      scrollTo({ top: lastPos }).then(() => {
        comeTop();
        addHandler();
        freeze(false);
      });

      return;
    }
  };

  addHandler();
  navButton.addEventListener('click', onClick);
};

export { initScrollToTop };
