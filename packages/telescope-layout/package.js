Package.describe({
  summary: 'Telescope layout package',
  version: '0.1.0',
  name: 'telescope-layout'
});

Package.onUse(function (api) {  

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'telescope:lib@0.25.5',
    'telescope:settings@0.25.5',
    'telescope:i18n@0.25.5'
  ]);

  api.addFiles('lib/client/custom.scss', 'client');
  api.addFiles('lib/client/scripts/custom_icons.js', 'client');
});