if (Meteor.isClient) {
  Template.donationModal.events({
    'click #confirm': function(e){
      e.preventDefault();
      var donation = $('#donationAmount').val();
      StripeCheckout.open({
        key: 'pk_test_BqSZTj8QCwATWvhDqAGB6TqD',
        amount: donation * 100, // this is equivalent to donationAmount
        name: 'Meteor Tutorial',
        description: 'Your total donation amount is $' + donation,
        panelLabel: 'Pay Now',
        token: function(res) {
          stripeToken = res.id;
          Meteor.call('chargeTheCard', stripeToken, donation);
        }
      });
      $("#donationModal").modal("hide");
    }
  });
}


