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