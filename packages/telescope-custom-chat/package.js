Package.describe({
    summary: "Telescope chatroom package",
    version: "0.2.11",
    name: "telescope-custom-chat",
    git: "https://github.com/dhc86/Telescope"
});

Package.onUse(function(api) {

    api.use([
        'telescope:lib@0.25.5',
        'telescope:users@0.25.5'
    ])

    api.add_files([
        'lib/client/templates/chat_page.html',
        'lib/client/templates/chat_link.html',
        'lib/client/templates/chat_welcome.html',
        'lib/client/templates/chat_input.html',
        'lib/client/templates/chat_messages.html'
    ], ['client']);

    api.add_files([
        'lib/chat_messages.js',
        'lib/routes.js',
        'lib/chat.js'
    ], ["client", "server"]);

    api.export('chatMessages');

});
