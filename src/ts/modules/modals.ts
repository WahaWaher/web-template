import MicroModal from 'micromodal';

const initModals = (): void => {
  // Changes markup for default modals
  document.querySelectorAll('[data-micromodal]').forEach((modal) => {
    modal.classList.add('modal', 'modal__default');
    modal.innerHTML = `
      <div class="modal__overlay" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true">
          <button class="modal__close" data-micromodal-close></button>
          <div class="modal__content">
            ${modal.innerHTML}
          </div>
        </div>
      </div>
    `;
  });

  // Init plugin
  MicroModal.init({
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
  });
};

export { initModals };
