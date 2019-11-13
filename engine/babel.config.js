module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          home: './node_modules/@modules/home/bundle.js',
        },
      },
    ],
  ],
};
