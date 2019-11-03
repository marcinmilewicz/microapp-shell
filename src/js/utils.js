export const getMicroAppConfig = (pathname, configuration) => {
	const paths = pathname.split('/');

	if (!paths || !paths[1]) return;


	return configuration.apps.find(app => app.componentName === paths[1]);
};

export const isElementEmpty = element => !element.hasChildNodes();

export const hasElementRenderedChild = (element, componentName) => element.firstChild.nodeName.toUpperCase() === componentName.toUpperCase();
