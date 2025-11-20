const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	const config = webpack.resolveConfig();
	
	Object.assign(config.resolve.alias, {
		"nativescript-yandex-mapkit": require("path").resolve(__dirname, "plugins/nativescript-yandex-mapkit/src/index"),
	});
	
	return config;
};
