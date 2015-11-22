if (Meteor.isServer) {
  Meteor.methods({
   'chargeTheCard': function(stripeToken, input_donation,productName) {
      check(stripeToken, String);
      var post_user_id = this.userId;
      var user_info = Users.find({'_id': post_user_id}).fetch();
      // var user_name = this.author
      // var productName = this.title
      // console.log("product name, author name, post owner ID:", productName, user_name, post_user_id);
      console.log('post owner ID', post_user_id, 'user info', user_info );
      // var access_tocken= Users.find
      // var stripe = require('stripe')(PLATFORM_SECRET_KEY);
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
