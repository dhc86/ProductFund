
// secret key:    sk_test_G77gaaVCcCaEFTccvZx04IFC  --> keep in server side
// publishable key:   pk_test_GpmbjLyT5iOAfAPK7zT7DkF1  --> keep in client side

// if (Meteor.isClient){
//   // this code runs on the client
// }

// if (Meteor.isServer){
//   // this code runs on the server
// }

 
if (Meteor.isClient) {
  Template.post_submit.events({
    'click #special-stripe-button': function(e) {
      e.preventDefault();

      StripeCheckout.open({
        key: 'pk_test_GpmbjLyT5iOAfAPK7zT7DkF1',
        amount: 1000, // this is equivalent to $10
        name: 'Meteor Tutorial',
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

if (Meteor.isServer) {
  Meteor.methods({
    'chargeCard': function(stripeToken) {
      check(stripeToken, String);
      var Stripe = StripeAPI('sk_test_G77gaaVCcCaEFTccvZx04IFC');

      Stripe.charges.create({
        source: stripeToken,
        amount: 1000, // this is equivalent to $10
        currency: 'usd'
      }, function(err, charge) {
        console.log(err, charge);
      });
    }
  });
}