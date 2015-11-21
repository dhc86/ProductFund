
if (Meteor.isClient) {
  Template.post_submit.events({
    'click #special-stripe-button': function(e) {
      e.preventDefault();

      StripeCheckout.open({
        key: 'pk_test_GpmbjLyT5iOAfAPK7zT7DkF1',
        amount: 1000, // this is equivalent to $10
        name: 'Project Name',
        description: 'On how to use Stripe ($10.00)',
        panelLabel: 'Pay Now',
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          Meteor.call('chargeCard', stripeToken);
        }
      });
    }
  });
}
