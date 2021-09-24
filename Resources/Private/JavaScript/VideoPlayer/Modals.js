/**
 * @template T
 * @param {T} modals
 */
export default function Modals(modals) {
  const result = Object.assign({}, modals);

  const modalsArray = Object.values(modals);

  result.hasOpen = () => {
    return modalsArray.some(modal => modal.isOpen);
  }

  result.closeNext = () => {
    for (const modal of modalsArray) {
      if (modal.isOpen) {
        modal.close();
        break;
      }
    }
  }

  return result;
}
