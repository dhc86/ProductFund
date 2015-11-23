if (Meteor.isClient) {
  // Meteor.subscribe('owner-pk', stripe_pk);

  Template.donationModal.events({
    'click [data-action=confirm]': function(e, t){
      // debugger 
      var $dom = t.$('[data-modal=donationModal]');
      e.preventDefault();
       
      var input_donation = $dom.find('[data-content=donationAmount]').val();
      
      var productName = this.title;
      var productAuthorID= this.userId;

      var stripe_account_info = Users.find({'_id': productAuthorID}).fetch();
      var stripe_pk = stripe_account_info[0].Public_key

      console.log ('stripe user id ' , stripe_account_info, "ower PK:", stripe_pk );
       
      StripeCheckout.open({
        key: stripe_pk, // should be owner's PK.
        amount: input_donation * 100, // this is equivalent to donationAmount
        name: 'Donation for' + ' ' + productName,
        description: 'Your total donation amount is $' + input_donation,
        panelLabel: 'Pay Now',
        token: function(res) 
        { stripeToken = res.id;
          // Meteor.call('chargeTheCard', stripeToken, input_donation, productName, function(err, charge) {

          //   // if charge then it worked
          //   // else there was an error

          // });
           Meteor.call('chargeTheCard', stripeToken, input_donation, productName, productAuthorID );

          // success
          // lookup post by the post_id
          // increase post.amount by amount
          // save it
          // Posts.update(upvotePostId, {$set: {Donations: input_donation} });
        }
      });

      //authentication for charging the donator on behalf of the owner
      //var stripe = require('stripe')('sk_test_zeEjXNMdvQ3wdADZ1PSCIcjd')(PLATFORM_SECRET_KEY);
        // stripe.customers.create(
        //   {description: "example@stripe.com"},
        //   {stripe_account: CONNECTED_STRIPE_ACCOUNT_ID}
        // );

      $dom.trigger("donation:success", { amount: input_donation, stripe_transcation_id: "" });

      $dom.modal("hide");
    }
  });
}

//below code is used for saving donation amount into posts collection in database.
//However, donation amount is not saved until stripe transaction suceeds
// var upvotePostId = this._id
// Posts.update(upvotePostId, {$set: {Donations: input_donation} });


