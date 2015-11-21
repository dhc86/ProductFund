if (Meteor.isClient) 
{
  Template.donationModal.events(
  {
    'click [data-action=confirm]': function(e, t)
    {

      // debugger 
      var $dom = t.$('[data-modal=donationModal]');
      e.preventDefault();
       
      var input_donation = $dom.find('[data-content=donationAmount]').val();
      // console.log('donate amount', input_donation);
      // console.log('this title, this id', this.title, this._id);

      var productName = this.title
      console.log(productName);
     
      StripeCheckout.open(
      {
        key: 'pk_test_BqSZTj8QCwATWvhDqAGB6TqD',// should be owner's PK.
        amount: input_donation * 100, // this is equivalent to donationAmount
        name: 'Donation for' + ' ' + productName,
        description: 'Your total donation amount is $' + input_donation,
        panelLabel: 'Pay Now',
        token: function(res) 
        {
          stripeToken = res.id;
          // Meteor.call('chargeTheCard', stripeToken, input_donation, productName, function(err, charge) {

          //   // if charge then it worked
          //   // else there was an error

          // });
           Meteor.call('chargeTheCard', stripeToken, input_donation, productName);

          // success
          // lookup post by the post_id
          // increase post.amount by amount
          // save it
          // Posts.update(upvotePostId, {$set: {Donations: input_donation} });
        }
      });
      $dom.trigger("donation:success", { amount: input_donation, stripe_transcation_id: "" });

      $dom.modal("hide");
    }
  });
}

//below code is used for saving donation amount into posts collection in database.
//However, donation amount is not saved until stripe transaction suceeds
// var upvotePostId = this._id
// Posts.update(upvotePostId, {$set: {Donations: input_donation} });


