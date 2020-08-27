import { getMicroAppConfig, isElementEmpty, hasElementRenderedChild } from './utils';
import { loadMicroApp } from './app-loader';

const render = (rootElement, pathname, configuration) => {
  const microAppConfig = getMicroAppConfig(pathname, configuration);

  if (!rootElement || !pathname || !microAppConfig) {
    throw new Error('Root element, pathname or app configuration not provided');
  }

  return loadMicroApp(microAppConfig)
    .then((config) => {
      const componentName = config.componentName || 'div';

      if (isElementEmpty(rootElement)) {
        rootElement.append(document.createElement(componentName));
        return config;
      }

      if (hasElementRenderedChild(rootElement, componentName)) {
        return config;
      }

      rootElement.removeChild(rootElement.firstChild);
      rootElement.appendChild(document.createElement(componentName));

      return config;
    })
    .catch(() => {
      if (rootElement.hasChildNodes()) {
        rootElement.removeChild(rootElement.firstChild);
      }
    });
};

export default render;
