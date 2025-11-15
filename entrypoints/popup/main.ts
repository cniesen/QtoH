import './style.css';
import logo from '/icon/48.png';
import { setupCounter } from '@/components/extensionEnableToggle';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://github.com/cniesen/QtoH" target="_blank">
      <img src="${logo}" class="logo" alt="Q to H logo" />
    </a>
    <h1>Q to H</h1>
    <p>
      ${browser.i18n.getMessage('extensionDescription')}
    </p>
    <p>
      ${browser.i18n.getMessage('extensionDetailedDescription')}
    </p>
    <div class="card">
      <p id="toggelStatus">
        Extension is foobar
      </p>
      <button id="toggelButton" type="button"></button>
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLParagraphElement>('#toggelStatus')!, document.querySelector<HTMLButtonElement>('#toggelButton')!);