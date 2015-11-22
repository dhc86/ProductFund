if (Meteor.isClient) {
  Template.post_submit.events({
    'click #post_product_button': function(e) {
      e.preventDefault();
      console.log('this',this);

      // Users.update(current_user._id,{$set: {Post_name: stripe_user_id }});

 
    }
  });
}