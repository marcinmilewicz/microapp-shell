import 'core-js';
import '@webcomponents/custom-elements/custom-elements.min';
import '@webcomponents/custom-elements/src/native-shim';

import './styles/main.scss';
import './js/shell-header/header';

import * as microAppRenderer from './js/renderer';

(function() {
	const renderContainer = configuration => {
		const rootElement = document.createElement('div');
		rootElement.setAttribute('id', configuration.containerId);
		document.body.appendChild(rootElement);
		microAppRenderer.render(rootElement, window.location.pathname, configuration);
	};

	const renderHeader = configuration => {
		const header = document.getElementById('shell-header');
		header.configuration = configuration;
		document.body.appendChild(header);
		return header;
	};

	fetch('assets/configuration.json')
		.then(resp => resp.json())
		.then(configuration => {
			const header = renderHeader(configuration);
			renderContainer(configuration);
			header.renderLinks();
		});
})();
