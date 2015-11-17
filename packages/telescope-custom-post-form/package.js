Package.describe({
  summary: 'Telescope custom package',
  version: '1.0.3',
  name: 'telescope-custom-post-form'
});

Package.onUse(function (api) {  
  api.use([
        'telescope:lib@0.25.5'
    ]);

  api.addFiles([
    'lib/client/templates/post_submit.html',
    'lib/client/templates/submit_button.html'],
    ['client']);

  api.addFiles([
    'lib/stripe-post-form.js'],
    ['client','server']);

});
