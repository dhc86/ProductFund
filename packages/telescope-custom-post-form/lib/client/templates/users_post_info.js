if (Meteor.isClient) {


  Template.post_submit.events({
    'submit form': function(e) {
      e.preventDefault();
      
      console.log('e', e, 't', t);

  // Template.post_submit.events({
  //   'click #post_product_button': function(e) {
  //     e.preventDefault();
  //     var current_user = Meteor.user();
  //     var payment_status = current_user.Post_entry_fee;
  //     console.log(current_user.profile.name);
  //     console.log(payment_status);
  //     if(payment_status === "succeeded"){
  //       Users.update(current_user._id,{$set: {Post_name: stripe_user_id }});
  //     }
  //     // console.log(current_user.Post_name);
  //   }
 
    }
  })
  // ;
  // Meteor.methods({
  // });
}