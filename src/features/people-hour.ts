import { scsClient } from '../utils/scs-client';

(function () {
  const peopleHourElClassName = '.people-hour-data';

  const peopleHourElements = document.querySelectorAll(peopleHourElClassName);

  if (peopleHourElements.length === 0) {
    console.error(`Element ${peopleHourElClassName} wasn't found!`);
  }

  scsClient.clientPeopleHour({ clientId: 18, year: 0 }).then((res) => {
    const value = res;
    peopleHourElements.forEach((peopleHourEl) => {
      peopleHourEl.textContent = value.toLocaleString();
      peopleHourEl.classList.remove('is-loading');
    });
    return;
  });
})();
