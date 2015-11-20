if (Meteor.isServer) {
  Meteor.methods({
   'chargeTheCard': function(stripeToken, input_donation) {
      check(stripeToken, String);
      var Stripe = StripeAPI('sk_test_zeEjXNMdvQ3wdADZ1PSCIcjd');
      Stripe.charges.create({
        source: stripeToken,
        amount: input_donation * 100, // this is equivalent to donationAmount
        currency: 'cad'
      }, function(err, charge) {
        console.log(err, charge);
      });
    }
  });
  
}

