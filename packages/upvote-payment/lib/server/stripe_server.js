if (Meteor.isServer) {
  // make the owner's stripe_pk publishable to make a token request 
  // Meteor.publish('owner-pk',function publishFunction(){
  //   var productAuthorID= this.userId;
  //   var stripe_account_info = Users.find({'_id': productAuthorID}).fetch();
  //   var stripe_pk = stripe_account_info[0].Public_key;
  //   return stripe_pk;
  // })
  



  Meteor.methods({
   'chargeTheCard': function(stripeToken, input_donation,productName,productAuthorID) {
      check(stripeToken, String);
       // debugger
      // console.log('product owner ID', productAuthorID,
      //             'stripe token', stripeToken,
      //             'input donation',input_donation,
      //             'product name', productName);
        
      var stripe_account_info = Users._collection.findOne({'_id': productAuthorID});
      var stripe_user_id= stripe_account_info.Stripe_user_id;
      var stripe_access_token = stripe_account_info.Access_token;
      var owner_email = stripe_account_info.emails[0].address;
        console.log( //'owner stripe info', stripe_account_info,
                    'stripe user id', stripe_user_id,
                    'stripe access token', stripe_access_token,
                    'owner email', owner_email,
                    'stripe request token', stripeToken)
   
      // var stripe_user_id=stripe_account_info[0].Stripe_user_id;
      // console.log('stripe user id', stripe_user_id , 
      //             'stripe PK', stripe_pk,
      //             'stripe account info' ,stripe_account_info)
      // var post_user_id = this.userId;
      // var user_info = Users.find({'_id': post_user_id}).fetch();
      // var user_name = this.author
      // var productName = this.title
      // console.log("product name, author name, post owner ID:", productName, user_name, post_user_id);
      // console.log('post owner ID', post_user_id, 'user info', user_info );
      // var access_tocken= Users.find

      // var Stripe = StripeAPI('sk_test_G77gaaVCcCaEFTccvZx04IFC');//(PLATFORM_SECRET_KEY);

      // // //authentication with Connect
      //  Stripe.customers.create({
      //   description:owner_email ,
      //   stripe_account:stripe_user_id //CONNECTED_STRIPE_ACCOUNT_ID
      // }, function(err, customer){
      //   // console.log('customer', customer)
      // });

      // var stripe_account = Stripe.accounts.retrieve(stripe_user_id);

      // console.log('stripe account', stripe_account)
      
      var Stripe = StripeAPI('sk_test_G77gaaVCcCaEFTccvZx04IFC');
      Stripe.charges.create({
        amount: input_donation * 100, // this is equivalent to donationAmount
        currency: 'cad',
        source:stripeToken,
        destination: stripe_user_id,
        metadata: {"product name": productName}
      }, function(err, charge) {
        console.log('charge', charge)
        //console.log('charge_amount:',charge.amount/100, 'charge_id:',charge.id, 'charge_status:',charge.status, 'metadata:', charge.metadata);
      });
    }
    
  });
  
}

//this is charge request for Stripe connect 
// if (Meteor.isServer) {
//   Meteor.methods({
//    'chargeTheCard': function(stripeToken, input_donation,productName) {
//       check(stripeToken, String);
//       var post_user_id = this.userId;
//       var user_info = Users.find({'_id': post_user_id}).fetch();
//       // var user_name = this.author
//       // var productName = this.title
//       // console.log("product name, author name, post owner ID:", productName, user_name, post_user_id);
//       console.log('post owner ID', post_user_id, 'user info', user_info );
//       // var access_tocken= Users.find
//       var stripe = require('stripe')(PLATFORM_SECRET_KEY);
  
//       Stripe.charges.create({
//         
//         amount: input_donation * 100, // this is equivalent to donationAmount
//         currency: 'cad',
//         source: {TOKEN}
//         metadata: {"product name": productName}
//       }, function(err, charge) {
//         console.log('charge_amount:',charge.amount/100, 'charge_id:',charge.id, 'charge_status:',charge.status, 'metadata:', charge.metadata);
//       });
//     }
    
//   });
  
// }
