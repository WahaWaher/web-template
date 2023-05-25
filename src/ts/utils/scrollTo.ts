const defaultOptions: ScrollToOptions = { top: 0, left: 0, behavior: 'smooth' };

const scrollTo = (options?: ScrollToOptions): Promise<void> => {
  return new Promise((resolve) => {
    const { top } = options || {};

    const checkScrollEnd = (): void => {
      const scrollTop: number = Math.abs(
        document.body.getBoundingClientRect().top
      );

      if (top !== undefined && scrollTop > top) {
        window.requestAnimationFrame(checkScrollEnd);
      } else {
        resolve();
      }
    };

    window.requestAnimationFrame(checkScrollEnd);
    window.scroll({ ...defaultOptions, ...options });
  });
};

export { scrollTo };
