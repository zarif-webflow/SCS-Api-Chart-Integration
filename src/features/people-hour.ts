import { setFinishedFetchFunctions } from '@/utils/fetch-state';
import { clientId, scsClient } from '@/utils/scs-client';

(function () {
  const peopleHourElClassName = '.people-hour-data';

  const peopleHourElements = document.querySelectorAll(peopleHourElClassName);

  if (peopleHourElements.length === 0) {
    console.error(`Element ${peopleHourElClassName} wasn't found!`);
    return;
  }

  scsClient.clientPeopleHour({ clientId: clientId, year: 0 }).then((res) => {
    const value = Array.isArray(res) ? res[0] : res;
    if (value === undefined || value == null) {
      console.error('clientPeopleHour data error');
      return;
    }
    peopleHourElements.forEach((peopleHourEl) => {
      const clonedEL = peopleHourEl.cloneNode();
      clonedEL.textContent = value.toLocaleString();
      peopleHourEl.replaceWith(clonedEL);
    });
    setFinishedFetchFunctions('clientPeopleHour');
    return;
  });
})();
