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
    const value = res;
    peopleHourElements.forEach((peopleHourEl) => {
      peopleHourEl.textContent = value.toLocaleString();
    });
    setFinishedFetchFunctions('clientPeopleHour');
    return;
  });
})();
