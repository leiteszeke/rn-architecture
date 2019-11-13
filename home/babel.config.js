module.exports = api => {
  const env = api.env();

  const isProduction = env.includes("production");
  const nativePresets = ["module:metro-react-native-babel-preset"];

  return {
		presets: nativePresets,
		plugins: [
			["module-resolver", {
				"alias": {


				}
			}]
		]
  };
};
