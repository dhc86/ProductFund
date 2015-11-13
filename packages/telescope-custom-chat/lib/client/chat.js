Meteor.startup(function() {
    Router.map(function() {
        this.route('chat', {
            path: '/chat',
            template: getTemplate('chatPage')
        });
    });
});
