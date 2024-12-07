module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          "envName": "REACT_APP_GOOGLE_APPLICATION_CREDENTIALS",
          "moduleName": "@env",
          "path": ".env",
          "blocklist": null,
          "allowlist": null,
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true,
          "verbose": false,
        }
      ]
    ]
  }
};
