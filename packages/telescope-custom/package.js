Package.describe({
  summary: 'Telescope custom package',
  version: '1.0.0',
  name: 'telescope-custom'
});

Package.onUse(function (api) {  
  api.addFiles('custom.css', 'client');
});