if (Meteor.isClient) {
  Template.donationModal.events({
    'click [data-action=confirm]': function(e, t){
      var $dom = t.$('[data-modal=donationModal]');
      e.preventDefault(); 
      var input_donation = $dom.find('[data-content=donationAmount]').val();
      var productName = this.title;
      var productID= this._id;
      var productAuthorID= this.userId;
      StripeCheckout.open({
        key: 'pk_test_GpmbjLyT5iOAfAPK7zT7DkF1', // should be our platform's PK.
        amount: input_donation * 100, // this is equivalent to donationAmount
        name: 'Donation for' + ' ' + productName,
        description: 'Your total donation amount is $' + input_donation,
        panelLabel: 'Pay Now',
        token: function(res) { 
          stripeToken = res.id;
          Meteor.call('chargeTheCard', stripeToken, input_donation, productName, productAuthorID, productID );
        }
      });
      $dom.modal("hide");
    }
  });
}

 //$dom.trigger("donation:success", { amount: input_donation, stripe_transcation_id: "" });


