import WDrawer from 'wdrawer';

export const initDrawers = (): void => {
  const $drawers = document.querySelectorAll('[data-drawer]');
  const activeClass = 'is-active';

  // Init plugin on each drawer-dom-element
  $drawers.forEach((element) => {
    element.wDrawer = new WDrawer(element as HTMLElement, {
      width: 300,
      page: '.app'
    }); 
  });

  const $toggleBtns = document.querySelectorAll('[data-drawer-toggle]');

  // Bind switch buttons
  $toggleBtns.forEach((button) => {
    const drawerID = button.getAttribute('data-drawer-toggle');
    const [targetDrawerElement] = Array.from($drawers).filter(
      (element) => element.getAttribute('data-drawer') === drawerID
    );
    const { wDrawer: targetDrawerInst } = targetDrawerElement;

    if (!targetDrawerInst) return;

    targetDrawerElement.addEventListener('wdrawer.open', () => {
      button.classList.add(activeClass);
    });

    targetDrawerElement.addEventListener('wdrawer.close', () => {
      button.classList.remove(activeClass);
    });

    button.addEventListener('click', () => targetDrawerInst.switch());
  });
};
