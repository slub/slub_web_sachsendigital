// @ts-check

import SimpleModal from './SimpleModal';

/**
 * @template T
 * @typedef Modals
 * @property {(modal: ValueOf<T>) => void} toggleExclusive Try to toggle the
 * modal while not inducing a state of two open modals.
 * @property {() => boolean} hasOpen
 * @property {() => void} closeNext
 * @property {() => void} closeAll
 * @property {() => Promise<void>} update
 * @property {() => void} resize
 */

/**
 * Mixin to add modal-related utility functions to set of modals.
 *
 * @template {Record<string, SimpleModal<any>>} T
 * @param {T} modals
 * @returns {T & Modals<T>}
 */
export default function Modals(modals) {
  const modalsArray = Object.values(modals);

  /** @type {T & Modals<T>} */
  const result = {
    ...modals,
    toggleExclusive: (modal) => {
      if (modal.isOpen) {
        modal.close();
      } else if (!result.hasOpen()) {
        modal.open();
      }
    },
    hasOpen: () => {
      return modalsArray.some(modal => modal.isOpen);
    },
    closeNext: () => {
      for (const modal of modalsArray) {
        // TODO: Close topmost? Close most recently opened?
        if (modal.isOpen) {
          modal.close();
          break;
        }
      }
    },
    closeAll: () => {
      for (const modal of modalsArray) {
        modal.close();
      }
    },
    update: async () => {
      await Promise.all(
        modalsArray.map(modal => modal.update())
      );
    },
    resize: () => {
      for (const modal of modalsArray) {
        modal.resize();
      }
    },
  };

  // Set DOM element that is used to cover the background of the modals. It is
  // used to make sure that when a modal is open, the background won't respond
  // to mouse actions. It also makes it simpler to detect clicking outside of
  // an open modal.
  const modalCover = document.createElement('div');
  modalCover.className = "sxnd-modal-cover";
  modalCover.addEventListener('click', () => {
    result.closeAll();
  });
  document.body.append(modalCover);

  // TODO: Performance
  window.addEventListener('resize', () => {
    result.resize();
  });

  for (const modal of modalsArray) {
    modal.on('updated', () => {
      if (result.hasOpen()) {
        modalCover.classList.add('shown');
      } else {
        modalCover.classList.remove('shown');
      }
    });
  }

  return result;
}
