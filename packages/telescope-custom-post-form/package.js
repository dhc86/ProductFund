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
    'lib/client/templates/submit_button.html',
    'lib/client/templates/post_submit.js'],
    ['client']);

  api.addFiles([
    'lib/stripe-post-form.js'],
    ['client','server']);

  // api.addFiles([
  //   'lib/server/posts.js',
  //   'lib/config.js'],
  //   ['server']);

api.export('Posts');

});
