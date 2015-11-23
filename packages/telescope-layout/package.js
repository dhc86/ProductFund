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

  api.addFiles([
    'lib/custom_modules.js'
  ], ['client', 'server']);

  api.addFiles([

    // modules
    'lib/client/scss/modules/_layout.scss',
    'lib/client/scss/modules/_nav.scss',
    'lib/client/scss/modules/_search.scss',
    'lib/client/scss/modules/_footer.scss',
    'lib/client/scss/modules/_posts.scss',
    'lib/client/scss/modules/_chat.scss',

    // partials
    'lib/client/scss/partials/_grid.scss',
    'lib/client/scss/partials/_colors.scss',
    'lib/client/scss/partials/_typography.scss',

    // customizations
    'lib/client/scripts/custom_icons.js',

    // overrides
    'lib/client/templates/custom_post_content.html',
    'lib/client/templates/custom_post_content.js',
    'lib/client/templates/custom_header.html',
    'lib/client/templates/custom_post_thumbnail.html',
    'lib/client/templates/custom_logo.html',
    'lib/client/templates/custom_logo.js',
    'lib/client/templates/custom_post_info.html',

    // new templates
    'lib/client/templates/post_live.html',
    'lib/client/templates/post_description.html',
    'lib/client/templates/total_donation.html',

    // screen
    'lib/client/scss/screen.scss'
  ], ['client']);

    api.addAssets([
    'public/videos/test.mp4',
    'public/img/placeholderDon.png',
    'public/img/telescope.png'
  ], ['client']);
});