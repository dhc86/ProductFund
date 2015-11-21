if (Meteor.isServer) {
  Meteor.methods({
   'chargeTheCard': function(stripeToken, input_donation,productName) {
      check(stripeToken, String);
      var Stripe = StripeAPI('sk_test_zeEjXNMdvQ3wdADZ1PSCIcjd');
      Stripe.charges.create({
        source: stripeToken,
        amount: input_donation * 100, // this is equivalent to donationAmount
        currency: 'cad',
        metadata: {"product name": productName}
      }, function(err, charge) {
        console.log('charge_amount:',charge.amount/100, 'charge_id:',charge.id, 'charge_status:',charge.status, 'metadata:', charge.metadata);
      });
    }
    
  });
  
}

