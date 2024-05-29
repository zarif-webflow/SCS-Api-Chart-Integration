import { setFinishedFetchFunctions } from '@/utils/fetch-state';
import { clientId, scsClient } from '@/utils/scs-client';

(function () {
  const textElClassName = '.total-plastic-removed-data';
  const seaTurtleElClassName = '.sea-turtle-data';

  const textElements = document.querySelectorAll(textElClassName);
  const seaTurtleElements = document.querySelectorAll(seaTurtleElClassName);

  if (textElements.length === 0) {
    console.error(`Element ${textElClassName} wasn't found!`);
  }
  if (seaTurtleElements.length === 0) {
    console.error(`Element ${seaTurtleElClassName} wasn't found!`);
  }

  scsClient.clientTotalPlasticRemoved({ clientId: clientId, year: 0 }).then((res) => {
    const [value] = res;
    textElements.forEach((textEl) => {
      textEl.textContent = value.toLocaleString();
    });
    seaTurtleElements.forEach((seaTurtleEl) => {
      seaTurtleEl.textContent = Math.floor(value / 150).toString();
    });
    setFinishedFetchFunctions('clientTotalPlasticRemoved');
    return;
  });
})();
