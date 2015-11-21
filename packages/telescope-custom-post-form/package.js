Package.describe({
  summary: 'Telescope custom package',
  version: '1.0.3',
  name: 'telescope-custom-post-form'
});

Package.onUse(function (api) {  
  api.use([
        'telescope:lib@0.25.5',
        'telescope:posts@0.25.5'
    ]);

    api.addFiles([
    'lib/add_to_schema.js'], 
    ['client', 'server']);

  api.addFiles([
    'lib/client/templates/submit_button.html',
    'lib/client/templates/post_submit.html',
    'lib/client/templates/submit_form.html'],
    ['client']);

  api.addFiles([
    'lib/stripe-post-form.js',
    'lib/submit_form.js'],
    ['client','server']);

  // api.addFiles([
  //   'lib/server/posts.js'],
  //   ['server']);

api.export('Posts');
// api.export('Users');

});
