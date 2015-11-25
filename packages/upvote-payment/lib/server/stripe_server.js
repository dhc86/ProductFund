if (Meteor.isServer) {
  Meteor.methods({
   'chargeTheCard': function(stripeToken, input_donation,productName,productAuthorID,productID ) {
      check(stripeToken, String);
      var stripe_account_info = Users._collection.findOne({'_id': productAuthorID});
      var stripe_user_id= stripe_account_info.Stripe_user_id;
      var stripe_access_token = stripe_account_info.Access_token;
      var owner_email = stripe_account_info.emails[0].address; 
      var Stripe = StripeAPI('sk_test_G77gaaVCcCaEFTccvZx04IFC');
      Stripe.charges.create({
        amount: input_donation * 100, // this is equivalent to donationAmount
        currency: 'cad',
        source:stripeToken,
        destination: stripe_user_id,
        metadata: {"product name": productName}
      }, Meteor.bindEnvironment(function(err, charge) {
        console.log('charge', charge);
        Posts.update(productID, {$inc: {Donations: charge.amount/100} });

        //$dom.trigger("donation:success")
        console.log('charge amount', charge.amount/100,
                     'product id', productID )    

      }));
    }    
  });  
}


