import { scsClient } from '../utils/scs-client';

(function () {
  const textParentClassName = '.total-plastic-removed-parent';
  const textNodeClassName = '.total-plastic-removed-data';
  const seaTurtleElClassName = '.sea-turtle-data';

  const textParents = document.querySelectorAll(textParentClassName);
  const seaTurtleElements = document.querySelectorAll(seaTurtleElClassName);

  if (textParents.length === 0) {
    console.error(`Element ${textParentClassName} wasn't found!`);
  }
  if (seaTurtleElements.length === 0) {
    console.error(`Element ${seaTurtleElClassName} wasn't found!`);
  }

  scsClient.clientTotalPlasticRemoved({ clientId: 18, year: 0 }).then((res) => {
    const [value] = res;
    textParents.forEach((textParent) => {
      const textNode = textParent.querySelector(textNodeClassName);
      if (!textNode) {
        console.error(`Element ${textNodeClassName} wasn't found!`);
        return;
      }
      textNode.textContent = value.toLocaleString();
      textParent.classList.remove('is-loading');
    });
    seaTurtleElements.forEach((seaTurtleEl) => {
      seaTurtleEl.textContent = Math.floor(value / 150).toString();
      seaTurtleEl.classList.remove('is-loading');
    });
    return;
  });
})();
