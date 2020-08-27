import './styles/main.scss';
import './shell-header/header';

import Microfrontendly from './js';

(function shell() {
  const container = document.body;

  const renderHeader = (configuration) => {
    const header = document.getElementById('shell-header');
    header.configuration = configuration;
    return header;
  };

  new Microfrontendly('assets/configuration.json')
    .withContainer(document.body)
    .render()
    .then((configuration) => {
      const header = renderHeader(configuration, container);
      header.renderLinks();
    });
}());
