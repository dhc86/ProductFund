FlowRouter.route('/submit/:stripe-return', {
  name: "stripeConnect",
  action: function(params, queryParams) {
    
// FlowRouter.getQueryParam('code')
    var code = queryParams.code;
    console.log(code, Meteor.user());
  }
})