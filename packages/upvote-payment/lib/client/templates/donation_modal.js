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
          Meteor.call('chargeTheCard', stripeToken, input_donation,
            productName, productAuthorID, productID, function(error, result){ 
             
              if (Meteor.user()) {
                var user_name = Meteor.user().username;   
                var donation_show_message ={"room": productName, "name": "Fundbot", "chat_message": "Thank you" + " " + user_name +" for donating $" + input_donation};
                Meteor.call("newChatMessage", donation_show_message) 
              }
              else {
                var donation_show_message ={"room": productName, "name": "Fundbot", "chat_message": "Thank you for the anonymous donation of $" + input_donation};
                Meteor.call("newChatMessage", donation_show_message) 
              }
            
              console.log('donation thank you msg', donation_show_message)
           });
        }
      });
      $dom.modal("hide");  
    }
  });
}

// $dom.trigger("donation:success", { amount: input_donation});
// when someone clicks the donation buttons in the chatroom, a donation message will be
//insert in the chat saying "thank you for donation us $" + input_donation
// var room_name = this.title (roomname is the same as product name)
// var donation_show_message = {"room": room_name, "chat_message": "thank you for donating us $" + input_donation}
// Meteor.call("newChatMessage", donation_show_message)

