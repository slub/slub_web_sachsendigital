/**
 * @template T
 * @param {T} modals
 */
export default function Modals(modals) {
  const result = Object.assign({}, modals);

  const modalsArray = Object.values(modals);

  // Set DOM element that is used to cover the background of the modals. It is
  // used to make sure that when a modal is open, the background won't respond
  // to mouse actions. It also makes it simpler to detect clicking outside of an
  // open modal.
  const modalCover = document.createElement('div');
  modalCover.className = "sxnd-modal-cover";
  modalCover.addEventListener('click', () => {
    result.closeAll();
  });
  document.body.append(modalCover);

  for (const modal of modalsArray) {
    modal.on('updated', () => {
      if (result.hasOpen()) {
        modalCover.classList.add('shown');
      } else {
        modalCover.classList.remove('shown');
      }
    });
  }

  result.hasOpen = () => {
    return modalsArray.some(modal => modal.isOpen);
  }

  result.closeNext = () => {
    for (const modal of modalsArray) {
      // TODO: Close topmost? Close most recently opened?
      if (modal.isOpen) {
        modal.close();
        break;
      }
    }
  }

  result.closeAll = () => {
    for (const modal of modalsArray) {
      modal.close();
    }
  }

  return result;
}
