Package.describe({
    name: 'telescope-custom-seed',
    version: '0.1.0',
    summary: 'Seeds users, posts, chatrooms, ',
    git: 'https://github.com/dhc86/Telescope'
});

Package.onUse(function(api) {
    api.use([
        'telescope:lib@0.25.5'
        //'telescope:users@0.25.5',
        //'telescope:posts@0.25.5',
        //'telescope:comments@0.25.5'
    ]);

    api.addAssets([
        'content/images/telescope.png',
        'content/images/toby1.jpg',
        'content/images/ZANO-Nano-Drone.jpg',
        'content/images/oculus_rift.jpg',
        'content/images/product_fund.png',
        'content/images/enterprise.jpg',
        'content/images/walt.png',
        'content/images/ring.jpg'
    ], ['client']);

    api.addAssets([
       'content/save_toby.md',
       'content/product_fund.md',
       'content/zano_drone.md',
       'content/oculus_rift.md',
       'content/build_the_enterprise.md',
       'content/help_walter_white.md',
       'content/ring_by_logbar.md'
    ], ['server']);

    api.addFiles([
        'lib/server/telescope-custom-seed.js'
    ], ['server']);

});
