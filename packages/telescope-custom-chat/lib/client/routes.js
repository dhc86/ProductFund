FlowRouter.route('/chat', {
    name: "chatPage",
    action: function(params, queryParams) {
        BlazeLayout.render("layout", {main: "chat_page"});
    }
});
