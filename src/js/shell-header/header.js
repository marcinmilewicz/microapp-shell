import * as renderer from '../renderer';
import './header.scss';

const header = document.createElement('div');

header.innerHTML = `

<!-- Toolbar -->
<div class="toolbar" role="banner">
<img width="40" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="/>
<div class="shell-nav">
        <ul id="shell-nav-links"></ul>
    </div>
<div class="spacer"></div>

</div>
`;

customElements.define(
  'shell-header',
  class extends HTMLElement {
    constructor() {
      super();

      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }

      this.shadowRoot.appendChild(header.cloneNode(true));

      this._configuration = [];
    }

    set configuration(value) {
      this._configuration = value;
    }

    get configuration() {
      return this._configuration;
    }

    renderLinks() {
      const navLinks = this.shadowRoot.getElementById('shell-nav-links');

      this._configuration.apps.forEach((microAppConfig) => {
        const { routes } = microAppConfig;

        routes.forEach((route) => {
          const listItem = document.createElement('li');
          listItem.className = 'link-parent';
          listItem.appendChild(document.createTextNode(route.name));

          navLinks.appendChild(listItem);

          route.children.forEach((child) => {
            const childItem = document.createElement('li');
            childItem.className = 'link-child';
            const { name, path } = child;
            const app = microAppConfig.componentName;

            childItem.appendChild(document.createTextNode(name));
            childItem.addEventListener('click', this.listenerFactory({ path, app }));
            navLinks.appendChild(childItem);
          });
        });
      });
    }

    listenerFactory(route) {
      const rootElement = document.getElementById(this.configuration.containerId);

      return () => {
        window.location.href = `${window.location.href}#`;
        const pathname = `${route.path}`;

        if (history && history.pushState) {
          history.pushState({}, pathname, pathname);

          renderer.render(rootElement, window.location.pathname, this.configuration);
        }

        this.dispatchRoute(route);
      };
    }

    dispatchRoute(route) {
      document.dispatchEvent(new CustomEvent('routeChanged', { detail: { route } }));
    }
  },
);
