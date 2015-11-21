FlowRouter.route('/', {
  name: "postsDefault",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "main_posts_list"});
  }
});

FlowRouter.route('/posts/:_id/edit', {
  name: "postEdit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_edit"});
  }
});

FlowRouter.route('/posts/:_id/:slug?', {
  name: "postPage",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_page"});
  }
});


FlowRouter.route('/submit/stripereturn', {
  name: "stripeConnect",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_submit"});
    var authentication_key = FlowRouter.getQueryParam('code');
    console.log(authentication_key);
    Meteor.call('fetchFromService',authentication_key);
  }
})




var trackRouteEntry = function (context) {
  var sessionId = Meteor.default_connection && Meteor.default_connection._lastSessionId ? Meteor.default_connection._lastSessionId : null;
  Meteor.call('increasePostViews', context.params._id, sessionId);
}

FlowRouter.route('/submit', {
  name: "postSubmit",
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "post_submit"});
  }
});