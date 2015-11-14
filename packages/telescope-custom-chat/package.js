Package.describe({
    summary: "Telescope chatroom package",
    version: "0.2.1",
    name: "telescope-custom-chat",
    git: "https://github.com/dhc86/Telescope"
});

Package.onUse(function(api) {

    api.use([
        'telescope:lib@0.25.5'
    ])

    api.add_files([
        'lib/client/templates/chat_page.html',
        'lib/client/templates/chat_link.html',
        'lib/routes.js',
        'lib/client/chat.js'
    ], ['client']);

});
